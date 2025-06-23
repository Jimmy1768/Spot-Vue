<template>
  <div class="venue-page">
    <h1 class="title">{{ t.title }}</h1>
    <p class="intro" v-html="t.intro" />

    <div class="venue-grid">
      <div class="venue-card" v-for="(item, i) in sections" :key="i">
        <img :src="item.image" class="venue-image" :alt="item.title" />
        <div class="content-box">
          <h3 class="venue-title">{{ item.title }}</h3>
          <p class="venue-text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'

const isProd = import.meta.env.MODE === 'production'
const prefix = isProd ? '/frontend' : ''

const t = computed(() => translations[currentLang.value].venuedetails)

const sections = computed(() => [
  {
    image: `${prefix}/assets/venue1.png`,
    title: t.value.sections[0].title,
    text: t.value.sections[0].text
  },
  {
    image: `${prefix}/assets/venue2.png`,
    title: t.value.sections[1].title,
    text: t.value.sections[1].text
  },
  {
    image: `${prefix}/assets/venue3.png`,
    title: t.value.sections[2].title,
    text: t.value.sections[2].text
  },
  {
    image: `${prefix}/assets/venue4.png`,
    title: t.value.sections[3].title,
    text: t.value.sections[3].text
  },
  {
    image: `${prefix}/assets/venue5.png`,
    title: t.value.sections[4].title,
    text: t.value.sections[4].text
  },
  {
    image: `${prefix}/assets/venue6.png`,
    title: t.value.sections[5].title,
    text: t.value.sections[5].text
  }
])
</script>

<style scoped>
.venue-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px;
  text-align: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.intro {
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.venue-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-content: center;
}

.venue-card {
  text-align: left;
}

.venue-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 12px;
  border: 4px solid #ccc;
}

.venue-title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 6px;
}

.venue-text {
  text-align: center;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.4;
}
.content-box {
  background-color: #f3f4f6; /* Light gray like footer */
  border-radius: 12px;
  padding: 16px;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

</style>
