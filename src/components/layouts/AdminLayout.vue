<!-- src/components/layout/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header Section -->
    <div class="admin-header bg-white shadow p-6">
      <div class="header-top">
        <h1>The Spot Admin Dashboard</h1>
        <button @click="handleLogout" class="logout-button">Logout</button>
      </div>
      <AdminNavbar />
    </div>

    <!-- Render nested routes -->
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AdminNavbar from '@/components/AdminNavbar.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

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
.admin-header {
  background-color: #ffffff;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

h1 {
  font-size: 1.875rem; /* text-3xl */
  font-weight: bold;
  color: #1f2937; /* gray-800 */
}

.logout-button {
  font-size: 0.875rem;
  font-weight: 500;
  color: #dc2626; /* red-600 */
  cursor: pointer;
  border: none;
  background: none;
  padding: 4px 8px;
}

.logout-button:hover {
  text-decoration: underline;
}

main {
  padding: 24px;
}
</style>
