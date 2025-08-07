<template>
    <dialog ref="dialog" class="confirm-dialog">
        <div class="dialog-content">
            <p class="message">{{ message }}</p>
            <div class="actions">
                <button class="btn cancel" @click="onCancel">取消</button>
                <button class="btn confirm" @click="onConfirm">確定</button>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)
const message = ref('')
let resolveFn: ((value: boolean) => void) | null = null

// open method for parent
function open(msg: string): Promise<boolean> {
    message.value = msg
    dialog.value?.showModal()
    return new Promise(resolve => {
        resolveFn = resolve
    })
}

function onConfirm() {
    resolveFn?.(true)
    dialog.value?.close()
}

function onCancel() {
    resolveFn?.(false)
    dialog.value?.close()
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.confirm-dialog {
    width: 300px;
    border: none;
    border-radius: 8px;
    padding: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    &::backdrop {
        background: rgba(0, 0, 0, 0.4);
    }

    .dialog-content {
        padding: 20px;

        .message {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;

            .btn {
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.2s;

                &.cancel {
                    background-color: #e0e0e0;

                    &:hover {
                        background-color: #d6d6d6;
                    }
                }

                &.confirm {
                    background-color: #1976d2;
                    color: #fff;

                    &:hover {
                        background-color: #1565c0;
                    }
                }
            }
        }
    }
}
</style>
