<template>
  <div class="catering-page">
    <h1 class="title">{{ t.title }}</h1>
    <p class="description" v-html="t.intro" />

    <div class="cards">
      <div class="card" v-for="(item, i) in sections" :key="i">
        <img :src="item.image" class="card-image" :alt="item.title" />
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-text">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentLang } from '@/stores/lang'
import { translations } from '@/i18n/translations'

const isProd = import.meta.env.MODE === 'production'
const t = computed(() => translations[currentLang.value].cateringdetails)

const prefix = isProd ? '/frontend' : ''

const sections = computed(() => [
  {
    image: `${prefix}/assets/catering1.png`,
    title: t.value.section1Title,
    text: t.value.section1Text
  },
  {
    image: `${prefix}/assets/catering2.png`,
    title: t.value.section2Title,
    text: t.value.section2Text
  },
  {
    image: `${prefix}/assets/catering3.png`,
    title: t.value.section3Title,
    text: t.value.section3Text
  }
])
</script>

<style scoped>
.catering-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px;
  text-align: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.card {
  flex: 1 1 30%;
  max-width: 300px;
  min-width: 220px;
}

.card-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
  border: 4px solid #ddd;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
}

.card-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #444;
  text-align: left;
}
</style>
