<!-- src/layouts/DefaultLayout.vue -->
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
import TopBar from '@/components/layout/TopBar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
