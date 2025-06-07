<template>
  <div class="rentals-page">
    <h1 class="title">{{ t.title }}</h1>
    <img src="/assets/equipmentdetails.png" alt="Equipment Overview" class="header-image" />
    <p class="intro">{{ t.intro }}</p>

    <div class="frames">
      <!-- Left frame -->
      <div class="frame">
        <h2 class="frame-title">{{ t.rentalsTitle }}</h2>
        <img src="/assets/equipmentrentals.png" alt="Rentals" class="frame-image" />
        <p class="frame-text">{{ t.rentalsContent }}</p>
      </div>

      <!-- Right frame -->
      <div class="frame">
        <h2 class="frame-title">{{ t.salesTitle }}</h2>
        <a href="https://www.facebook.com/truefuturesurfco" target="_blank">
          <img src="/assets/equipmentsales.png" alt="Sales" class="frame-image link-image" />
        </a>
        <p class="frame-text">{{ t.salesContent }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentLang } from '@/stores/lang'
import { translations } from '@/i18n/translations'

const t = computed(() => translations[currentLang.value].rentaldetails)
</script>

<style scoped>
.rentals-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  color: #333;
  line-height: 1.6;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}
.header-image {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.intro {
  margin-bottom: 2rem;
}
.frames {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}
.frame {
  flex: 1 1 320px;
  max-width: 460px;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: center;
}
.frame-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 12px;
}
.frame-image {
  max-height: 96px;
  width: auto;
  margin-bottom: 12px;
  border-radius: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.link-image {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.link-image:hover {
  transform: scale(1.02);
}
.frame-text {
  font-size: 0.95rem;
  color: #444;
}
</style>
