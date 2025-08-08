<template>
    <ul class="user-list">
        <li class="header">
            <span>#</span>
            <span>{{ t('name') }}</span>
            <span>{{ t('age') }}</span>
            <span>{{ t('actions') }}</span>
        </li>
        <li v-for="user in users" :key="user.id">
            <span>{{ user.id }}</span>
            <span>{{ user.name }}</span>
            <span>{{ user.age }}</span>
            <span class="actions">
                <EBtn color="success" text="修改" size="small" @click="handleEdit(user)" />
                <EBtn color="error" text="刪除" size="small" @click="handleDelete(user.id)" />
            </span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import EBtn from './EBtn.vue'

// 多語系設定
const { t } = useI18n()

interface User {
    id: number
    name: string
    age: number
}

const props = defineProps<{
    users: User[]
}>()

// 宣告事件edit 與 delete
const emit = defineEmits<{
    (e: 'edit', user: User): void
    (e: 'delete', id: number): void
}>()

// 刪除事件
const handleDelete = (id: number) => {
    emit('delete', id)
}

// 修改事件
const handleEdit = (user: User) => {
    emit('edit', user)
}
</script>

<style lang="scss" scoped>
.user-list {
    list-style: none;
    margin-top: 1.5rem;
    border: 1px solid #aaa;
    border-radius: 10px;
    color: white;
    width: 100%;

    li {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        padding: 1.5rem 0.5rem;
        border-bottom: 1px solid #444;

        &.header {
            font-weight: bold;
        }

        &:last-child {
            border-bottom: none;
        }

        span {
            text-align: center;
            width: calc(100% / 4);

            &.actions {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
            }
        }
    }
}
</style>