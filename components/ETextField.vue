<template>
  <div class="e-text-field">
    <label :for="inputId">{{ label }}</label>
    <input :id="inputId" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  id: { type: String, default: '' },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const inputId = computed(() => {
  return props.id || `input-${Math.random().toString(36).slice(2, 8)}`
})
</script>

<style scoped>
.e-text-field {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 992px) {
    width: 60%;
    flex-direction: column;
  }

  label {
    padding: 0.5rem;
    font-size: 1.5rem;
  }

  input {
    width: 70%;
    font-size: 1.5rem;
    background-color: #2a2a2a;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px;


    @media (max-width: 992px) {
      width: 100%;
    }

    &:focus {
      background-color: #2a2a2a;
      color: white;
      border: 1px solid white;
      outline: none;
    }

    &[type="number"] {

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>
