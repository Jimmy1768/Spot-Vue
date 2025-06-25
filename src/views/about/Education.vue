<template>
  <div class="education-page">
    <h1 class="title">{{ t.title }}</h1>
    <p class="description" v-html="t.intro"></p>

    <div class="content-wrapper">
      <!-- Left Frame -->
      <div class="left-frame">
        <div class="section-block">
          <h2 class="subtitle">{{ t.directionsTitle }}</h2>
          <div class="directions">
            <div class="direction" v-for="(item, index) in directions" :key="index">
              <img :src="item.image" class="direction-image" :alt="item.title" />
              <div class="direction-text">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Frame -->
      <div class="right-frame">
        <div class="section-block">
          <h2 class="subtitle">{{ t.pricingTitle }}</h2>
          <div class="pricing">
            <div class="pricing-item" v-for="(p, index) in t.pricing" :key="index">
              <h3 class="pricing-name">{{ p.name }}</h3>
              <p class="pricing-duration">{{ p.duration }}</p>
              <div class="pricing-details">
                <p class="pricing-text">{{ p.details }}</p>
                <p class="pricing-price">{{ p.price }}</p>
              </div>
            </div>
            <p class="note">{{ t.note }}</p>
            <p class="booking-link">
              {{ t.lineBooking }}
              <a href="https://line.me/R/ti/p/@197hifeq" target="_blank">LINE</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <EducationCarousel
      v-if="marineEducationPosts.length > 0"
      :posts="marineEducationPosts"
      :title="t.blog_more"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import axios from 'axios'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'
import EducationCarousel from '@/components/carousels/EducationCarousel.vue'

const isProd = import.meta.env.MODE === 'production'
const prefix = isProd ? '/frontend' : ''

const t = computed(() => translations[currentLang.value].educationdetails)

const directions = computed(() => [
  {
    image: `${prefix}/assets/education1.png`,
    title: t.value.directions[0].title,
    text: t.value.directions[0].text
  },
  {
    image: `${prefix}/assets/education2.png`,
    title: t.value.directions[1].title,
    text: t.value.directions[1].text
  },
  {
    image: `${prefix}/assets/education3.png`,
    title: t.value.directions[2].title,
    text: t.value.directions[2].text
  }
])

const posts = ref([])
const marineEducationPosts = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/blog')
    console.log('Fetched blog posts:', data) // 🔍 Log all blog posts

    posts.value = data

    // Log category values to verify what's being filtered
    data.forEach(post => {
      console.log(`Post: ${post.title}, Category: ${post.category}`)
    })

    marineEducationPosts.value = data.filter(
      post => post.category === 'marine_education'
    )

    console.log('Filtered marineEducationPosts:', marineEducationPosts.value)
  } catch (err) {
    console.error('Failed to fetch blog posts:', err)
  }
})

function stripHtml(html) {
  const div = document.createElement('div')
  div.innerHTML = html

  // Remove image-related tags
  const unwantedTags = div.querySelectorAll('figure, img, figcaption')
  unwantedTags.forEach(tag => tag.remove())

  return div.textContent || div.innerText || ''
}

</script>

<style scoped>
.education-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  color: #333;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.content-wrapper {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left-frame,
.right-frame {
  flex: 1;
  min-width: 200px;
}

/* Shared spacing for each block (title + content) */
.section-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subtitle {
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 0;
  background-color: #fef3c7; /* light amber (same as Rentals.vue) */
  padding: 6px 12px;
  border-radius: 9999px; /* fully rounded */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

/* Directions Section */
.directions {
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}
.direction {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.direction-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.direction-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}
.direction-text h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
}
.direction-text p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Pricing Section */
.pricing {
  height: 500px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}
.pricing-item {
  margin-bottom: 32px;
}
.pricing-name {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 4px;
}
.pricing-duration {
  font-size: 0.95rem;
  margin-bottom: 6px;
}
.pricing-details {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}
.pricing-text {
  flex: 1;
  font-size: 0.95rem;
}
.pricing-price {
  font-weight: bold;
  color: #f97316;
  white-space: nowrap;
}
.note {
  font-size: 1rem;
  margin-top: 1rem;
  color: #666;
}
.booking-link {
  margin-top: 8px;
  font-size: 0.95rem;
  color: #333;
  text-align: center;
}

.booking-link a {
  color: #3b82f6;
  text-decoration: underline;
}
</style>
