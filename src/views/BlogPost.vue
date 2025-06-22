<template>
  <div class="blog-post-page" v-if="post">
    <h1>{{ post.title }}</h1>
    <img :src="post.cover_image_url" :alt="post.title" class="cover-image" v-if="post.cover_image_url" />
    <p class="meta" v-if="post.published_at">
      {{ post.published_at.slice(0, 10) }} | {{ post.author }}
    </p>
    <div class="content" v-html="post.content"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useHead } from '@vueuse/head'

const route = useRoute()
const post = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(`/blog/${route.params.slug}`)
    post.value = data

    useHead({
      title: data.title,
      meta: [
        {
          name: 'description',
          content: data.content.slice(0, 120) + '...'
        },
        {
          property: 'og:title',
          content: data.title
        },
        {
          property: 'og:description',
          content: data.content.slice(0, 120) + '...'
        },
        {
          property: 'og:image',
          content: window.location.origin + data.cover_image_url
        }
      ]
    })
  } catch (err) {
    console.error('Error loading blog post:', err)
  }
})
</script>

<style scoped>
.blog-post-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
}
.blog-post-page h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 16px;
}
.cover-image {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}
.meta {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 12px;
}
.content {
  font-size: 1.1rem;
  line-height: 1.8;
}
</style>

<style>
/* GLOBAL OVERRIDE: affect embedded Trix/ActionText captions */
.attachment__caption {
  display: none !important;
}
</style>
