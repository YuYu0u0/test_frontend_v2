<template>
  <button :class="`e-btn e-btn-${color} e-btn-${size}`">
    {{ text || $slots.default?.() }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn'
  size?: 'normal' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',// 預設為 success
  size: 'normal', //預設為 normal
})
</script>

<style scoped lang="scss">
.e-btn {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  font-weight: bold;

  // success 綠
  &-success {
    background-color: green;
  }

  // error 紅
  &-error {
    background-color: red;
  }

  // warn 黃
  &-warn {
    background-color: yellow;
    color: black;
  }

  &-normal {
    font-size: 1rem;
    padding: 0.5em 1em;
  }

  &-small {
    font-size: 1rem;
    padding: 0.3em 0.7em;
  }
}
</style>