<template>
  <div class="blog-manager">
    <h1>部落格管理後台</h1>

    <div v-if="editing">
      <BlogForm :initialData="currentPost" @cancel="editing = false" @saved="onSaved" />
    </div>

    <div v-else>
      <button class="new-post" @click="startNew">新增文章</button>
      <BlogList @edit="editPost" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlogForm from '@/components/blog/BlogForm.vue'
import BlogList from '@/components/blog/BlogList.vue'

const editing = ref(false)
const currentPost = ref(null)

function startNew() {
  currentPost.value = null
  editing.value = true
}

function editPost(post) {
  currentPost.value = post
  editing.value = true
}

function onSaved() {
  editing.value = false
}
</script>

<style scoped>
.blog-manager {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 24px;
}

.new-post {
  margin-bottom: 24px;
  padding: 8px 16px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.new-post:hover {
  background-color: #059669;
}
</style>
