<template>
    <div class="form">
        <h2 class="form-title">
            {{ t('actions') }}
        </h2>
        <ETextField id="user-name" v-model="form.name" :label="$t('name')" />

        <ETextField id="user-age" v-model.number="form.age" :label="$t('age')" type="number" />

        <div class="buttons">
            <EBtn type="button" text="新增" color="warn" :disabled="!form.name || form.age <= 0 || isEditing"
                @click="handleSubmit('create')" />
            <EBtn type="button" text="修改" color="success" :disabled="!form.name || form.age <= 0 || !isEditing"
                @click="handleSubmit('update')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import ETextField from './ETextField.vue'
import EBtn from './EBtn.vue'
const { t } = useI18n()

interface User {
    id?: number
    name: string
    age: number
}

const props = defineProps<{
    user: User | null
    onSubmit: (user: User, action: 'create' | 'update') => void | Promise<void>
}>()

const emit = defineEmits(['cancel'])

const form = reactive<User>({
    name: '',
    age: 0,
})

const isEditing = computed(() => !!props.user?.id)

watch(
    () => props.user,
    (newUser) => {
        if (newUser) {
            form.name = newUser.name
            form.age = newUser.age
        } else {
            form.name = ''
            form.age = 0
        }
    },
    { immediate: true }
)

const handleSubmit = (action: 'create' | 'update') => {
    if (!form.name || form.age <= 0) return
    if (action === 'create' && isEditing.value) return
    if (action === 'update' && !isEditing.value) return

    props.onSubmit(
        {
            id: props.user?.id,
            name: form.name,
            age: form.age,
        },
        action
    )
}
</script>

<style scoped lang="scss">
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid white;
    border-radius: 10px;
    gap: 0.75rem;
    padding: 2rem;

    .form-title {
        align-items: center;
        font-size: 1.75rem;
    }

    .buttons {
        padding-top: 0.5rem;
        width: 60%;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }
}
</style>
