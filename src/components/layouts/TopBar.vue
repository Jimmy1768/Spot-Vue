<template>
  <div class="top-bar">
    <div class="top-bar-inner">
      <div class="social-icons">
        <a href="https://www.facebook.com/spottaiwan/"><i class="fab fa-facebook-square"></i></a>
        <a href="https://www.instagram.com/spot_tw/?hl=zh-tw"><i class="fab fa-instagram-square"></i></a>
        <a href="https://www.youtube.com/channel/UCQc9oPHnr9ZxdiH1aZKU17g"><i class="fab fa-youtube-square"></i></a>
      </div>

      <div class="surfwall-message">
        <span class="surfwall-bubble">
          {{ t.surfwallMessage }}
          <router-link to="/surfwall">{{ t.joinChallenge }}</router-link>
        </span>
      </div>

      <div class="language-selector" @mouseenter="showLang = true" @mouseleave="showLang = false">
        <div class="selected-lang">
          <span :class="`fi ${languages[currentLang].flag}`"></span>
        </div>
        <ul class="lang-menu" v-show="showLang">
          <li v-for="(lang, key) in languages" :key="key" @click="setLanguage(key)">
            <span :class="`fi ${lang.flag}`"></span> {{ lang.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { currentLang, setLanguage, languages } from '@/stores/lang'
import { translations } from '@/i18n/translations'

const t = computed(() => translations[currentLang.value])
const showLang = ref(false)
</script>

<style scoped>
.top-bar {
  height: 240px;
  background-image: url('/assets/banner.png');
  background-size: cover;
  background-position: center;
  color: white;
  display: flex;
  justify-content: center;
  padding: 0 16px;
}

.top-bar-inner {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.social-icons {
  font-size: 24px;
  display: flex;
  gap: 12px;
}

.social-icons a {
  color: white;
}

.surfwall-message {
  text-align: center;
}

.surfwall-bubble {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  display: inline-block;
}

.surfwall-bubble a {
  color: #f97316;
  margin-left: 6px;
  text-decoration: underline;
}

.language-selector {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.selected-lang {
  font-size: 18px;
  padding: 4px;
}

.lang-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 4px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.lang-menu li {
  padding: 4px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: black;
}

.lang-menu li:hover {
  background: #f0f0f0;
}

</style>
