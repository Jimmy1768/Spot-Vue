<template>
  <div class="login-container">
    <h2 class="text-xl font-bold mb-4">Admin Login</h2>

    <form @submit.prevent="handleLogin" class="space-y-4 max-w-sm">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" class="input" required />
      </div>

      <div>
        <label>Password</label>
        <input v-model="password" type="password" class="input" required />
      </div>

      <button type="submit" class="btn">Login</button>

      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (!response.ok) {
      const err = await response.json()
      error.value = err.error || 'Login failed'
      return
    }

    // ✅ Extract and store role from response
    const data = await response.json()
    localStorage.setItem('userRole', data.role)

    // ✅ Redirect to dashboard
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = 'Network error'
  }
}
</script>

<style scoped>
.input {
  @apply border px-3 py-2 w-full rounded;
}
.btn {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700;
}
</style>
