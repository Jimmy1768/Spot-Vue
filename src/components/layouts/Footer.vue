<template>
  <footer class="footer">
    <div class="footer-bar">
      <span>© 2025 SPOT Taiwan All Rights Reserved</span>
      <div class="footer-menu">
        <div class="dropdown">
          <span>{{ t.lessons }}</span>
          <ul class="dropdown-content">
            <li><a href="/booking/lessons/surfing">{{ t.surfing }}</a></li>
            <li><a href="/booking/lessons/sup">{{ t.sup }}</a></li>
            <li><a href="/booking/lessons/skimboard">{{ t.skimboard }}</a></li>
            <li><a href="/booking/lessons/supskate">{{ t.supskate }}</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <span>{{ t.rentals }}</span>
          <ul class="dropdown-content">
            <li><a href="/booking/rentals">{{ t.equipment }}</a></li>
            <li><a href="/booking/hostel">{{ t.hostel }}</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <span>{{ t.events }}</span>
          <ul class="dropdown-content">
            <li><a href="/events/catering">{{ t.catering }}</a></li>
            <li><a href="/events/rentals">{{ t.venue }}</a></li>
            <li><a href="/events/depthrun">{{ t.depthrun }}</a></li>
          </ul>
        </div>
        <div class="dropdown">
          <span>{{ t.about }}</span>
          <ul class="dropdown-content">
            <li><a href="/about/education">{{ t.education }}</a></li>
            <li><a href="/about/instructors">{{ t.instructors }}</a></li>
            <li><a href="/about/faq">{{ t.faq }}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { currentLang, languages } from '@/stores/lang'
import { translations } from '@/i18n/translations'

const t = computed(() => translations[currentLang.value])
</script>

<style scoped>
.footer {
  flex-shrink: 0;
  background: #f3f3f3;
  font-size: 14px;
  color: #666;
  padding: 12px;
  padding-bottom: 24px;
  margin-top: 16px;
}
.footer-bar {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.footer-bar > span {
  margin-right: 200px;
}

@media (max-width: 768px) {
  .footer-bar > span {
    margin-right: 0;
  }
}
.footer-menu {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.dropdown {
  position: relative;
  cursor: pointer;
}
.dropdown-content {
  position: absolute;
  bottom: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  padding: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: none;
  flex-direction: column;
  min-width: 160px;
  z-index: 5;
  list-style: none;
  margin: 0;
}
.dropdown:hover .dropdown-content {
  display: flex;
}
.dropdown-content li {
  margin: 4px 0;
}
.dropdown-content a {
  text-decoration: none;
  color: #333;
}
.dropdown-content a:hover {
  text-decoration: underline;
}

</style>
