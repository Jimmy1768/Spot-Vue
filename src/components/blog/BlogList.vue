<template>
  <div class="blog-list">
    <h2>部落格文章管理</h2>

    <div v-if="loading">載入中...</div>
    <div v-else-if="posts.length === 0">目前沒有文章</div>

    <div v-else class="post-card" v-for="post in posts" :key="post.slug">
      <img
        v-if="post.cover_image_url"
        :src="post.cover_image_url"
        class="thumbnail"
        :alt="post.title"
      />
      <div class="post-details">
        <h3>{{ post.title }}</h3>
        <p class="meta">
          {{ post.published_at?.slice(0, 10) }} |
          {{ post.category_label }}
        </p>
        <p class="excerpt">
          {{ post.content.slice(0, 100) }}...
        </p>
        <div class="actions">
          <button @click="$emit('edit', post)">編輯</button>
          <button @click="deletePost(post.slug)">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])
const loading = ref(true)

const emit = defineEmits(['edit'])

async function fetchPosts() {
  try {
    const { data } = await axios.get('/admin/blog')
    posts.value = data
  } catch (err) {
    console.error('Failed to fetch blog posts:', err)
  } finally {
    loading.value = false
  }
}

async function deletePost(slug) {
  if (!confirm('確定要刪除這篇文章嗎？')) return
  try {
    await axios.delete(`/admin/blog/${slug}`)
    posts.value = posts.value.filter(p => p.slug !== slug)
  } catch (err) {
    console.error('刪除失敗:', err)
  }
}

onMounted(fetchPosts)
</script>

<style scoped>
.blog-list {
  max-width: 960px;
  margin: auto;
  padding: 24px;
}
.post-card {
  display: flex;
  gap: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.thumbnail {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}
.post-details {
  flex: 1;
}
.meta {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 4px;
}
.excerpt {
  font-size: 1rem;
  margin-bottom: 8px;
}
.actions button {
  margin-right: 8px;
  padding: 6px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  background-color: #f97316;
  color: white;
  cursor: pointer;
}
.actions button:hover {
  background-color: #ea580c;
}
</style>
