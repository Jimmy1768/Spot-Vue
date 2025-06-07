<template>
  <nav class="admin-navbar">
    <!-- Navigation Links -->
    <div class="navbar-links">
      <RouterLink to="/admin/dashboard" class="nav-link">Dashboard</RouterLink>

      <!-- Admin-only links -->
      <template v-if="userRole === 'admin'">
        <RouterLink to="/admin/bookings" class="nav-link">Bookings</RouterLink>
        <RouterLink to="/admin/email-campaigns" class="nav-link">Emails</RouterLink>
        <RouterLink to="/admin/reviews" class="nav-link">Reviews</RouterLink>
        <RouterLink to="/admin/gallery" class="nav-link">Gallery</RouterLink>
        <RouterLink to="/admin/events" class="nav-link">Events</RouterLink>
        <RouterLink to="/admin/analytics" class="nav-link">Analytics</RouterLink>
      </template>

      <!-- Shared with staff -->
      <RouterLink to="/admin/blog" class="nav-link">Blog</RouterLink>
    </div>
  </nav>
</template>

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

<style scoped>
.admin-navbar {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.navbar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.dashboard-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #222;
}

.logout-button {
  background-color: #ef4444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}
.logout-button:hover {
  background-color: #dc2626;
}

.navbar-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.nav-link {
  background-color: #f3f4f6;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  color: #111827;
  font-weight: 500;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #e5e7eb;
}
</style>

