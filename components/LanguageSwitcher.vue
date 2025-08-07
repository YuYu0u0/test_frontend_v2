<template>
    <div class="change-language">
        <button type="button" class="language-button" @click="switchLocale('zh-TW')">中文</button>
        <button type="button" class="language-button" @click="switchLocale('en-US')">Eng</button>
    </div>

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const switchLocale = (code: 'zh-TW' | 'en-US') => {
    locale.value = code
}
</script>
<style scoped lang="scss">
.change-language {
    width: fit-content;
    height: 2rem;
    display: flex;
    gap: 0.5rem;
    margin: 0.5rem;

    .language-button {
        background-color: gray;
        color: black;
        font-size: 1rem;
        border-radius: 5px;

        &:hover,
        &:active {
            background-color: dimgray;
            color: white;
        }
    }
}
</style>