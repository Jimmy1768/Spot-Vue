<template>
  <div class="surfing-lesson" v-if="t.title">
    <h1 class="title">{{ t.title }}</h1>
    <img src="/assets/surfingdetails.png" alt="Surfing Details" class="lesson-image" />

    <p class="intro" v-for="(p, i) in t.intro" :key="i">{{ p }}</p>

    <h2 class="section-title">{{ t.contentTitle }}</h2>
    <ul class="lesson-content">
      <li><strong>{{ t.indoor }}</strong>: {{ t.indoorContent }}</li>
      <li><strong>{{ t.outdoor }}</strong>: {{ t.outdoorContent }}</li>
    </ul>

    <h2 class="section-title">{{ t.detailsTitle }}</h2>
    <ul class="lesson-details">
      <li>{{ t.safety }}</li>
      <li>{{ t.duration }}</li>
      <li>{{ t.age }}</li>
    </ul>

    <h2 class="section-title">{{ t.priceTitle }}</h2>
    <ul class="pricing">
      <li>{{ t.price1 }}</li>
      <li>{{ t.price2 }}</li>
      <li>{{ t.price3 }}</li>
    </ul>

    <p class="note">{{ t.includes }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentLang } from '@/stores/lang'
import { translations } from '@/i18n/translations'

const t = computed(() => translations[currentLang.value]?.surfingLesson || {})

console.log('Current language:', currentLang.value)
console.log('Surfing lesson content:', t.value)
</script>

<style scoped>
.surfing-lesson {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  line-height: 1.7;
  color: #333;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}
.lesson-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.section-title {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.lesson-content,
.lesson-details,
.pricing {
  padding-left: 1.25rem;
  list-style-type: disc;
  margin-bottom: 1rem;
}
.note {
  margin-top: 1rem;
  font-style: italic;
  color: #555;
}
</style>
