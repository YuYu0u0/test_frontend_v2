<template>
  <div class="container">
    <LanguageSwitcher />
    <!-- 編輯/新增使用者表單 -->
    <UserForm :user="editingUser" :onSubmit="handleSubmit" />
    <!-- 使用者列表，包含刪除和編輯事件 -->
    <UserList :users="users" @delete="onDeleteUser" @edit="onEditUser" />
    <!-- 加入確認對話框 -->
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import { useUserStore } from '@/store/userStore'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import UserForm from '@/components/UserForm.vue'
import UserList from '@/components/UserList.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
// API 基本網址
const baseUrl = 'https://53343.wu.elitepro.ltd'

// 使用 Pinia Store 管理使用者資料
const userStore = useUserStore()

// 定義 User 型別
interface User {
  id?: number
  name: string
  age: number
}

// 建立用戶進行確認的畫面模板
const confirmDialogRef = ref<InstanceType<typeof ConfirmDialog>>()

// 取得 Pinia store 裡的使用者列表，使用 computed 保持響應式
const users = computed(() => userStore.users)

// 當前正在編輯的使用者 (用於 UserForm)
const editingUser = ref<User | null>(null)

// ------------------------------------
// 從 API 取得使用者列表並更新 Pinia Store
const getUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/user`)
    const userList = res.data.data || res.data
    userStore.setUsers(userList)
  } catch (err) {
    console.error('取得使用者失敗', err)
  }
}

// ------------------------------------
// 刪除使用者，先呼叫 API，成功後更新 Pinia Store 並清除編輯狀態
const onDeleteUser = async (id: number) => {
  const confirmed = await confirmDialogRef.value?.open('確定要刪除這位使用者嗎？')
  if (!confirmed) return
  try {
    await axios.delete(`${baseUrl}/api/user`, { data: { id } })
    userStore.removeUser(id)
    if (editingUser.value?.id === id) editingUser.value = null
  } catch (err) {
    alert('刪除失敗，請稍後再試')
    console.error(err)
  }
}

// ------------------------------------
// 新增或修改使用者
// 先檢查必填資料，確認操作，再呼叫對應 API，成功後更新 Pinia Store 並清除編輯狀態
const handleSubmit = async (user: User, action: 'create' | 'update') => {
  console.log('handleSubmit 呼叫，user:', user)
  // 必填驗證(UserForm有用disable去擋了這邊再做一層保險確認)
  if (!user.name || user.name.trim() === '' || user.age === undefined || user.age <= 0) {
    alert('請輸入有效的名字與年齡')
    return
  }

  const confirmed = await confirmDialogRef.value?.open(`確定要${action === 'create' ? '新增' : '修改'}使用者嗎？`)
  if (!confirmed) return

  if (action === 'update') {
    try {
      const res = await axios.put(`${baseUrl}/api/user`, user)
      if (res.data.code === 200) {
        userStore.updateUser(user) // 直接用你本來送出的 user 更新 pinia
      }
      editingUser.value = null
    } catch (err) {
      alert('修改失敗，請稍後再試')
      console.error(err)
    }
  } else {
    try {
      const res = await axios.post(`${baseUrl}/api/user`, user)
      if (res.data.code === 200) {
        const newId = res.data.data.id
        const newUser = { ...user, id: newId }

        userStore.addUser(newUser)
      }
    } catch (err) {
      alert('新增失敗，請稍後再試')
      console.error(err)
    }
  }
}

// ------------------------------------
// 編輯使用者，將資料複製到編輯狀態中，讓 UserForm 填入該資料
const onEditUser = (user: User) => {
  editingUser.value = { ...user }
}

// 頁面載入時，自動從 API 取得使用者列表
onMounted(() => {
  getUsers()
})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>