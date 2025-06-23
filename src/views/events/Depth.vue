<template>
  <div class="depth-page">
    <h1 class="title">{{ t.title }}</h1>
    <p class="intro" v-html="t.intro" />

    <div class="grid">
      <div class="depth-card" v-for="(item, i) in sections" :key="i">
        <div class="top-row">
          <img :src="item.image" class="depth-image" />
          <div class="depth-text">
            <h3 class="section-title">{{ item.title }}</h3>
            <ul>
              <li v-for="(point, j) in item.text" :key="j">{{ point }}</li>
            </ul>
            <button class="read-more">Read More</button>
          </div>
        </div>
        <div class="caption">{{ item.caption }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { currentLang } from '@/stores/lang'
import { translations } from '@/i18n/translations'

const isProd = import.meta.env.MODE === 'production'
const prefix = isProd ? '/frontend' : ''

const t = computed(() => translations[currentLang.value].depthdetails)

const sections = computed(() => [
  {
    image: `${prefix}/assets/depth1.png`,
    title: t.value.sections[0].title,
    text: t.value.sections[0].text,
    caption: t.value.sections[0].caption
  },
  {
    image: `${prefix}/assets/depth2.png`,
    title: t.value.sections[1].title,
    text: t.value.sections[1].text,
    caption: t.value.sections[1].caption
  },
  {
    image: `${prefix}/assets/depth3.png`,
    title: t.value.sections[2].title,
    text: t.value.sections[2].text,
    caption: t.value.sections[2].caption
  },
  {
    image: `${prefix}/assets/depth4.png`,
    title: t.value.sections[3].title,
    text: t.value.sections[3].text,
    caption: t.value.sections[3].caption
  }
])
</script>

<style scoped>
.depth-page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 16px;
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.intro {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.depth-card {
  background-color: #f3f4f6;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.top-row {
  display: flex;
  gap: 16px;
}

.depth-image {
  width: 50%;
  border-radius: 8px;
  object-fit: cover;
}

.depth-text {
  flex: 1;
}

.section-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.depth-text ul {
  padding-left: 16px;
  margin-bottom: 12px;
}

.depth-text li {
  text-align: left;
  font-size: 0.95rem;
  line-height: 1.4;
  color: #444;
}

.read-more {
  background-color: #f59e0b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.caption {
  text-align: center;
  font-size: 0.9rem;
  margin-top: 12px;
  color: #666;
}

</style>