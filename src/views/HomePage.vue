<template>
  <!-- Main section with centered grid and logo -->
  <div class="main">
    <div class="grid-with-logo">
      <img src="/assets/logo.png" alt="SPOT Logo" class="logo" />

      <!-- Center: Surfwall -->
      <div class="surfwall-message">
        <span class="surfwall-bubble">
          {{ t.surfwallMessage }}
          <router-link to="/surfwall">{{ t.joinChallenge }}</router-link>
        </span>
      </div>
      
      <div class="grid">
        <GridItem
          :title="t.lessons"
          :items="[ 
            { label: t.surfing, key: 'surfing' },
            { label: t.sup, key: 'sup' },
            { label: t.skimboard, key: 'skimboard' },              
            { label: t.supskate, key: 'supskate' }
          ]"
          image="/assets/lessons.png"
        />
        <GridItem
          :title="t.rentals"
          :items="[
            { label: t.equipment, link: '/rentals' },
            { label: t.hostel, link: '/booking/hostel' }
          ]"
          image="/assets/rentals.png"
        />
        <GridItem
          :title="t.events"
          :items="[
            { label: t.catering, link: '/events/catering' },
            { label: t.venue, link: '/events/rentals' },
            { label: t.depthrun, link: '/events/depthrun' }
          ]"
          image="/assets/events.png"
        />
        <GridItem
          :title="t.about"
          :items="[
            { label: t.education, link: '/about/education' },
            { label: t.instructors, link: '/about/instructors' },
            { label: t.faq, link: '/about/faq' }
          ]"
          image="/assets/about.png"
        />
      </div>
    </div>
  </div>

  <!-- Events Carousel -->
  <EventsCarousel :posts="eventPosts" />
</template>

<script setup>
import { ref, onMounted , computed } from 'vue'
import GridItem from '@/components/GridItem.vue'
import { translations } from '@/i18n/translations.js'
import { currentLang } from '@/stores/lang'
import { imagePaths } from '@/utils/imageResources'
import EventsCarousel from '@/components/carousels/EventsCarousel.vue'

const eventPosts = ref([])
const showLang = ref(false)

const languages = {
  en: { label: 'English', flag: 'fi-us' },
  zh: { label: '中文', flag: 'fi-tw' },
  ja: { label: '日本語', flag: 'fi-jp' }
}

const t = computed(() => translations[currentLang.value])

const setLanguage = (lang) => {
  currentLang.value = lang
}

function preloadImages(paths) {
  const promises = paths.map(src => {
    return new Promise(resolve => {
      const img = new Image()
      img.src = src
      img.onload = resolve
      img.onerror = resolve
    })
  })
  return Promise.all(promises)
}

onMounted(async () => {
  await preloadImages(imagePaths)
})
</script>

<style scoped>
.main {
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.surfwall-message {
  text-align: center;
  margin-bottom: 12px;
}
.surfwall-bubble {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  display: inline-block;
  color: white;
}
.surfwall-bubble a {
  color: #f97316;
  margin-left: 6px;
  text-decoration: underline;
}
.grid-with-logo {
  position: relative;
  display: inline-block;
  margin-top: 16px;  
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 960px;
  width: 100%;
  position: relative;
  z-index: 1;
}
.logo {
  position: absolute;
  top: 52%;
  left: 50%;
  width: 240px;
  transform: translate(-50%, -50%);
  object-fit: contain;
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .logo {
    display: none;
  }
}

.carousel {
  height: 200px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;  
}
</style>
