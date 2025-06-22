<template>
  <div class="event-page">
    <section v-if="latest" class="featured-event">
      <img
        v-if="latest.cover_image_url"
        :src="latest.cover_image_url"
        alt="cover"
        class="cover-image"
      />
      <div class="event-meta">
        <p class="category">{{ latest.category_label }}</p>
        <h1 class="title">{{ latest.title }}</h1>
        <p class="excerpt">{{ stripHtml(latest.content).slice(0, 120) }}...</p>
        <router-link :to="`/events/${latest.slug}`" class="read-more">
          {{ t.read_more }}
        </router-link>
      </div>
    </section>

    <EventCarousel
      v-if="events.length > 1"
      :events="events.slice(1)"
      :title="t.events"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import EventCarousel from '@/components/carousels/EventsCarousel.vue'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'

const events = ref([])
const latest = ref(null)

const t = computed(() => translations[currentLang.value])

onMounted(async () => {
  try {
    const { data } = await axios.get('/events')
    if (data.length > 0) {
      events.value = data
      latest.value = data[0]
    }
  } catch (err) {
    console.error('Failed to load events:', err)
  }
})

function stripHtml(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
</script>

<style scoped>
.event-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 16px;
}

.featured-event {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
}

.cover-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 24px;
}

.event-meta {
  text-align: center;
}

.category {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 4px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 12px;
}

.excerpt {
  font-size: 1rem;
  color: #444;
  margin-bottom: 16px;
}

.read-more {
  font-size: 1rem;
  color: #0077cc;
  text-decoration: underline;
}

</style>
