<template>
  <div class="lessons-page">
    <div class="lesson-tab-wrapper">
      <!-- Tab buttons -->
      <div class="lesson-tabs">
        <button
          v-for="lesson in lessonTypes"
          :key="lesson.key"
          class="lesson-tab"
          @mouseenter="showModal(lesson)"
          @mouseleave="hideModal"
          @click="setType(lesson.key)"
        >
          {{ lesson.label }}
        </button>
      </div>

      <!-- Modal with lesson info -->
      <div
        v-if="hoveredLesson"
        class="lesson-modal"
        @mouseenter="modalSticky = true"
        @mouseleave="modalSticky = false"
      >
        <img :src="hoveredLesson.image" class="lesson-image" alt="lesson image" />
        <h2 class="lesson-title">{{ hoveredLesson.label }}</h2>
        <p class="lesson-description">{{ hoveredLesson.description }}</p>
        <ul class="pricing-list">
          <li v-for="(price, i) in hoveredLesson.pricing" :key="i">{{ price }}</li>
        </ul>
      </div>
    </div>

    <!-- Detail component shown below -->
    <div class="lesson-pricing">
      <component :is="activeLessonComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'

import Surfing from './Surfing.vue'
import Skimboard from './Skimboard.vue'
import SUP from './SUP.vue'
import SUPSKATE from './SUPSKATE.vue'

const route = useRoute()
const router = useRouter()

const t = computed(() => translations[currentLang.value])

const baseLessons = [
  { key: 'surfing', component: Surfing, image: '/assets/surfing.png' },
  { key: 'sup', component: SUP, image: '/assets/sup.png' },
  { key: 'skimboard', component: Skimboard, image: '/assets/skimboard.png' },
  { key: 'supskate', component: SUPSKATE, image: '/assets/supskate.png' }
]

const lessonTypes = computed(() =>
  baseLessons.map(lesson => ({
    ...lesson,
    label: t.value.lessonsOverview[lesson.key].label,
    description: t.value.lessonsOverview[lesson.key].description,
    pricing: t.value.lessonsOverview[lesson.key].pricing
  }))
)

const activeType = ref('surfing')
const hoveredLesson = ref(null)

onMounted(() => {
  const queryType = route.query.type
  if (queryType && lessonTypes.value.some(t => t.key === queryType)) {
    activeType.value = queryType
  }
})

const activeLessonComponent = computed(() => {
  return lessonTypes.value.find(t => t.key === activeType.value)?.component || Surfing
})

function setType(type) {
  activeType.value = type
  router.replace({ query: { type } })
}

function showModal(lesson) {
  hoveredLesson.value = lesson
}

function hideModal() {
  hoveredLesson.value = null
}
</script>

<style scoped>
.lessons-page {
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;
}
.lesson-tab-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lesson-tabs {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  z-index: 2;
}
.lesson-tab {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s;
}
.lesson-tab.active {
  background: #e0f2fe;
  border-color: #60a5fa;
  color: #1e40af;
}
.lesson-modal {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  padding: 16px;
  z-index: 1;
  text-align: center;
}
.lesson-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 12px;
}
.lesson-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
}
.lesson-description {
  color: #444;
  font-size: 0.95rem;
  margin-bottom: 12px;
}
.pricing-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  color: #333;
}
.pricing-list li {
  margin-bottom: 6px;
}
.lesson-pricing {
  margin-top: 32px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
