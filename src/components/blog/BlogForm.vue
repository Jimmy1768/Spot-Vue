<template>
  <div class="blog-form">
    <h2>{{ isEditing ? '編輯文章' : '新增文章' }}</h2>

    <div class="form-field">
      <label>標題</label>
      <input v-model="form.title" type="text" />
    </div>

    <div class="form-field">
      <label>分類</label>
      <select v-model="form.category">
        <option disabled value="">請選擇</option>
        <option v-for="(label, key) in categories" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </div>

    <div class="form-field">
      <label>封面圖片</label>
      <input type="file" @change="handleCoverUpload" />
      <img v-if="coverPreview" :src="coverPreview" class="cover-preview" />
    </div>

    <div class="form-field">
      <label>文章內容</label>
      <EditorContent :editor="editor" class="editor-content" />
    </div>

    <button @click="submitForm" class="submit-button">儲存文章</button>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

// Props for editing mode
const props = defineProps({
  post: Object // optional for editing
})

const emit = defineEmits(['saved'])

const form = ref({
  title: props.post?.title || '',
  category: props.post?.category || '',
  content: props.post?.content || '',
  cover_image: null
})

const coverPreview = ref(null)

const categories = {
  marine_education: '海洋教育',
  lessons_qna: '課程 Q&A'
}

const isEditing = computed(() => !!props.post)

const editor = new Editor({
  extensions: [StarterKit, Image],
  content: form.value.content,
  onUpdate: ({ editor }) => {
    form.value.content = editor.getHTML()
  }
})

onBeforeUnmount(() => editor.destroy())

function handleCoverUpload(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.cover_image = file
    coverPreview.value = URL.createObjectURL(file)
  }
}

async function submitForm() {
  const payload = new FormData()
  payload.append('title', form.value.title)
  payload.append('category', form.value.category)
  payload.append('content', form.value.content)
  if (form.value.cover_image) {
    payload.append('cover_image', form.value.cover_image)
  }

  try {
    const url = isEditing.value
      ? `/admin/blog/${props.post.slug}`
      : '/admin/blog'
    const method = isEditing.value ? 'patch' : 'post'

    await fetch(url, {
      method: method.toUpperCase(),
      body: payload
    })

    emit('saved') // optional: parent can react to successful save
  } catch (err) {
    console.error('Failed to submit blog:', err)
  }
}
</script>

<style scoped>
.blog-form {
  max-width: 800px;
  margin: auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.form-field {
  margin-bottom: 16px;
}

input[type="text"],
select {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.cover-preview {
  margin-top: 8px;
  max-width: 100%;
  border-radius: 8px;
}

.editor-content {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  min-height: 200px;
  background: #f9f9f9;
}

.submit-button {
  background-color: #f97316;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
</style>
