<template>
  <div class="faq-page">
    <!-- Section 1: Image and Intro -->
    <img src="/assets/faq1.png" alt="FAQ Intro" class="faq-image" />
    <p class="faq-intro" v-html="t.intro"></p>
    <p class="slogan">{{ t.slogan }}</p>

    <!-- Section 2: Map + Form -->
    <div class="contact-info-wrapper">
      <!-- Map Block -->
      <div class="contact-info half">
        <div class="map-section">
          <iframe
            src="https://maps.google.com/maps?q=350%E8%8B%97%E6%A0%97%E7%B8%A3%E7%AB%B9%E5%8D%97%E9%8E%AE%E7%AB%B9%E8%88%88%E9%87%8C%E7%AB%B9%E5%9C%8D%E4%BB%9491%E8%99%9F&t=&z=15&ie=UTF8&iwloc=&output=embed"
            class="map-embed"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <!-- Form Block -->
      <div class="contact-info half">
        <div class="form-section">
          <h2>{{ t.contactUs }}</h2>
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <input type="text" v-model="form.name" :placeholder="t.name" required />
              <input type="email" v-model="form.email" :placeholder="t.email" required />
              <input type="text" v-model="form.subject" :placeholder="t.subject" required />
            </div>
            <textarea v-model="form.message" :placeholder="t.message" required></textarea>
            <button type="submit">{{ t.submit }}</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Section 3: Contact Info -->
    <div class="contact-info-wrapper">
      <div class="contact-info half">
        <h3>{{ t.contact }}</h3>
        <p>037-552874</p>
        <p>tonyfish0711@gmail.com</p>
      </div>
      <div class="contact-info half">
        <h3>{{ t.address }}</h3>
        <p>{{ t.zhAddress }}</p>
        <p>{{ t.enAddress }}</p>
        <p>{{ t.jaAddress }}</p>
      </div>
    </div>

    <FaqCarousel
      v-if="lessonsQnaPosts.length > 0"
      :posts="lessonsQnaPosts"
      :title="t.blog_more"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'
import FaqCarousel from '@/components/carousels/FaqCarousel.vue'

const t = computed(() => translations[currentLang.value].faqdetails)

const lessonsQnaPosts = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('/blog')
    console.log('Fetched blog posts for FAQ:', data)

    // Debug each post's category
    data.forEach(post => {
      console.log(`Post: ${post.title}, Category: ${post.category}`)
    })

    lessonsQnaPosts.value = data.filter(
      post => post.category === 'lessons_qna'
    )

    console.log('Filtered lessonsQnaPosts:', lessonsQnaPosts.value)
  } catch (err) {
    console.error('Failed to fetch FAQ blog posts:', err)
  }
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  console.log('Form submitted:', form.value)
  // TODO: Add backend logic
}
</script>

<style scoped>
.faq-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  color: #333;
}

.faq-image {
  display: block;
  margin: 0 auto 24px;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.faq-intro {
  font-size: 1rem;
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto 2rem;
  text-align: center;
}

.slogan {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
  letter-spacing: 2px;
}

/* Section 2: Map */
.map-section {
  text-align: center;
  margin: 2rem 0;
}

.map-section iframe {
  width: 100%;
  max-width: 600px;
  height: 350px;
  border: none;
  border-radius: 8px;
}

.map-section a {
  display: inline-block;
  margin-top: 8px;
  color: #f97316;
  font-weight: bold;
  text-decoration: none;
}

/* Section 3: Form */
.form-section {
  background-color: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-section h2 {
  text-align: center;
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.form-row input {
  flex: 1;
  min-width: 0;
}

textarea {
  width: 100%;
  min-height: 120px;
  margin-bottom: 12px;
  padding: 8px;
  font-size: 0.95rem;
}

input,
textarea {
  padding: 8px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type='submit'] {
  background-color: #f97316;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}

/* Section 4: Contact Info */
.contact-info-wrapper {
  display: flex;
  gap: 32px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.contact-info.half {
  flex: 1;
  min-width: 250px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}

.contact-info h3 {
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.contact-info p {
  margin: 4px 0;
  font-size: 0.95rem;
}
</style>
