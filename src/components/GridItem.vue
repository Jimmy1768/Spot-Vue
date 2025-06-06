<template>
  <div class="grid-item" @mouseenter="hover = true" @mouseleave="hover = false">
    <!-- Background image -->
    <img :src="image" alt="Section image" class="grid-image" />

    <!-- Title -->
    <div class="title" v-if="hover">{{ title }}</div>

    <!-- Clickable subitems -->
    <div class="subitems" v-if="hover">
      <router-link
        v-for="item in items"
        :key="item.label"
        :to="getLink(item)"
        class="subitem"
      >
        {{ item.label }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  image: String,
  items: Array // [{ label: 'Surfing', key: 'surfing' }]
})

const hover = ref(false)

function getLink(item) {
  // If link exists, use it directly. If key exists, assume it's a lessons link.
  return item.link ? item.link : { path: '/lessons', query: { type: item.key } }
}
</script>

<style scoped>
.grid-item {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 1rem;
  background: white;
  border-radius: 999px;
  border: 4px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
}
.grid-image {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.grid-item:hover .grid-image {
  transform: scale(1.05);
}
.title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  pointer-events: none;
}
.subitems {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  z-index: 2;
}
.subitem {
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 0.8rem;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
  max-width: 100%;
}
.subitem:hover {
  background-color: #dbeafe;
}

</style>
