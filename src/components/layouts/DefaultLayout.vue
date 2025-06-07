<!-- src/components/layoutss/DefaultLayout.vue -->
<template>
  <div>
    <TopBar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import TopBar from '@/components/layouts/TopBar.vue'
import Footer from '@/components/layouts/Footer.vue'
</script>
