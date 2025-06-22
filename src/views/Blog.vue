<template>
  <div class="blog-page">
    <section v-if="latest" class="featured-blog">
      <img
        v-if="latest.cover_image_url"
        :src="latest.cover_image_url"
        alt="cover"
        class="cover-image"
      />
      <div class="blog-meta">
        <p class="category">{{ latest.category_label }}</p>
        <h1 class="title">{{ latest.title }}</h1>
        <p class="excerpt">{{ stripHtml(latest.content).slice(0, 120) }}...</p>
        <router-link :to="`/blog/${latest.slug}`" class="read-more">
          {{ t.read_more }}
        </router-link>
      </div>
    </section>

    <BlogCarousel
      v-if="posts.length > 1"
      :posts="posts.slice(1)"
      :title="t.blog_more"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import BlogCarousel from '@/components/carousels/BlogCarousel.vue'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'

const posts = ref([])
const latest = ref(null)

const t = computed(() => translations[currentLang.value])

onMounted(async () => {
  try {
    const { data } = await axios.get('/blog')
    if (data.length > 0) {
      posts.value = data
      latest.value = data[0]
    }
  } catch (err) {
    console.error('Failed to load blog posts:', err)
  }
})

function stripHtml(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
</script>

<style scoped>
.blog-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
}

.featured-blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cover-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 24px;
}

.blog-meta {
  padding: 0 16px;
}

.category {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 12px;
}

.excerpt {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 20px;
}

.read-more {
  font-size: 1rem;
  color: #0077cc;
  text-decoration: underline;
}
</style>
