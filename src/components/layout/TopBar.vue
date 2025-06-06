<template>
  <div class="top-bar">
    <div class="social-icons">
      <a href="https://www.facebook.com/spottaiwan/"><i class="fab fa-facebook-square"></i></a>
      <a href="https://www.instagram.com/spot_tw/?hl=zh-tw"><i class="fab fa-instagram-square"></i></a>
      <a href="https://www.youtube.com/channel/UCQc9oPHnr9ZxdiH1aZKU17g"><i class="fab fa-youtube-square"></i></a>
    </div>

    <div class="surfwall-message">
      {{ t.surfwallMessage }} <router-link to="/surfwall">{{ t.joinChallenge }}</router-link>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  background: #fafafa;
}
.social-icons {
  font-size: 24px; 
  display: flex;
  gap: 12px;
}
.surfwall-message {
  flex: 1;
  text-align: center;
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
  top: 100%; /* align directly below */
  margin: 0; /* remove any gap */
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
}
.lang-menu li:hover {
  background: #f0f0f0;
}
.lang-toggle:hover .lang-options {
  display: block;
}

</style>
