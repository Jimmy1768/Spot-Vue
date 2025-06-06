<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

const router = useRouter()
const userRole = ref('')

onMounted(() => {
  userRole.value = localStorage.getItem('userRole') || ''
})

const handleLogout = async () => {
  await fetch('/logout', {
    method: 'DELETE',
    credentials: 'include'
  })
  localStorage.removeItem('userRole')
  router.push('/admin/login')
}
</script>

<template>
  <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
    <div class="flex space-x-6">
      <RouterLink to="/admin/dashboard" class="font-semibold hover:text-blue-600">Dashboard</RouterLink>

      <!-- Admin-only links -->
      <template v-if="userRole === 'admin'">
        <RouterLink to="/admin/bookings" class="font-semibold hover:text-blue-600">Bookings</RouterLink>
        <RouterLink to="/admin/email-campaigns" class="font-semibold hover:text-blue-600">Emails</RouterLink>
        <RouterLink to="/admin/reviews" class="font-semibold hover:text-blue-600">Reviews</RouterLink>
        <RouterLink to="/admin/gallery" class="font-semibold hover:text-blue-600">Gallery</RouterLink>
        <RouterLink to="/admin/events" class="font-semibold hover:text-blue-600">Events</RouterLink>
        <RouterLink to="/admin/analytics" class="font-semibold hover:text-blue-600">Analytics</RouterLink>
      </template>

      <!-- Shared with staff -->
      <RouterLink to="/admin/blog" class="font-semibold hover:text-blue-600">Blog</RouterLink>
    </div>

    <button @click="handleLogout" class="text-sm font-medium text-red-600 hover:underline">Logout</button>
  </nav>
</template>
