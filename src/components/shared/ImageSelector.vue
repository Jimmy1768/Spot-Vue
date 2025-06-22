<template>
  <label class="selection-button">
    <slot>選擇圖片</slot>
    <input
      class="hidden-file-input"
      type="file"
      :multiple="multiple"
      accept="image/*"
      @change="handleSelect"
    />
  </label>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['selected'])

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false
  }
})

function handleSelect(event) {
  const files = Array.from(event.target.files || [])
  if (!files.length) return

  emit('selected', props.multiple ? files : files[0])

  // Allow selecting the same file again
  event.target.value = ''
}
</script>

<style scoped>
.selection-button {
  display: inline-block;
  background-color: #f97316;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 8px;
}

.selection-button:hover {
  background-color: #ea580c;
}

.hidden-file-input {
  display: none;
}
</style>
