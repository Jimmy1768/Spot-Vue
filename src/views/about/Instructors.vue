<template>
  <div class="instructors-page">
    <h1 class="title">{{ t.title }}</h1>

    <div
      class="instructor-card"
      v-for="(instructor, index) in instructors"
      :key="index"
    >
      <div class="card-top">
        <!-- Left: Photo and Name -->
        <div class="photo-section">
          <img :src="instructor.photo" :alt="instructor.name" class="instructor-photo" />
          <p class="instructor-name">{{ instructor.name }}</p>
        </div>

        <!-- Right: Info -->
        <ul class="info-section">
          <li><strong>{{ t.experience }}</strong> {{ instructor.experience }} {{ t.years }}</li>
          <li><strong>{{ t.specialty }}</strong> {{ instructor.specialty }}</li>
          <li><strong>{{ t.certifications }}</strong> {{ instructor.certifications }}</li>
        </ul>
      </div>

      <!-- Bottom: Reviews -->
      <div class="reviews-section">
        <h3>{{ t.reviews }}</h3>
        <ul>
          <li v-for="(review, rIndex) in instructor.reviews" :key="rIndex">"{{ review }}"</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { translations } from '@/i18n/translations'
import { currentLang } from '@/stores/lang'

const t = computed(() => translations[currentLang.value].instructordetails)

const instructors = [
  {
    name: 'Henry Wang',
    photo: '/assets/instructor.png',
    experience: 8,
    specialty: 'Surfing, SUP, Skimboard',
    certifications: 'ISA Level 2, Lifeguard Certified',
    reviews: [
      'Henry is super patient and clear with instructions.',
      'I learned to stand up in one class!',
    ]
  },
  {
    name: 'Amy Chen',
    photo: '/assets/instructor.png',
    experience: 5,
    specialty: 'Land SUP, Yoga SUP',
    certifications: 'ISA Level 1, SUP Yoga Certified',
    reviews: [
      'Amy made the class really fun and supportive.',
      'Very good with beginners!'
    ]
  },
  {
    name: 'Leo Lin',
    photo: '/assets/instructor.png',
    experience: 10,
    specialty: 'Skimboarding, Surf Rescue',
    certifications: 'ISA Level 3, Rescue Certified',
    reviews: [
      'Leo is extremely knowledgeable and passionate.',
      'Highly recommend for advanced lessons!'
    ]
  }
]
</script>

<style scoped>
.instructors-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
  color: #333;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.instructor-card {
  width: 70%;
  margin: 0 auto 32px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.card-top {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;
}

.photo-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; /* ✅ center text like name under image */
}

.instructor-photo {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 8px;
}

.instructor-name {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 8px;
}

.info-section {
  flex: 2;
  list-style: disc;
  padding-left: 20px;
  font-size: 0.95rem;
}

.reviews-section {
  border-top: 1px solid #ccc;
  padding-top: 16px;
}

.reviews-section h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.reviews-section ul {
  padding-left: 20px;
  list-style: disc;
  font-size: 0.95rem;
  color: #555;
}
</style>
