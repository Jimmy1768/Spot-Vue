<template>
  <div class="events-post-page" v-if="event">
    <h1>{{ event.title }}</h1>
    <img
      :src="event.cover_image_url"
      :alt="event.title"
      class="cover-image"
      v-if="event.cover_image_url"
    />
    <p class="meta">
      {{ event.event_date.slice(0, 10) }} | {{ event.location }}
    </p>
    <div class="content">{{ event.content }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useHead } from '@vueuse/head'

const route = useRoute()
const event = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(`/events/${route.params.slug}`)
    event.value = data

    useHead({
      title: data.title,
      meta: [
        {
          name: 'description',
          content: data.content.slice(0, 120) + '…'
        }
      ]
    })
  } catch (err) {
    console.error('Failed to load event:', err)
  }
})
</script>

<style scoped>
.events-post-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
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
