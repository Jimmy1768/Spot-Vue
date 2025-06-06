<template>
  <div class="booking-form">
    <h2>Booking Form</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="form.email" required type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: ''
})

function submitForm() {
  console.log('Form submitted:', form.value)
}
</script>

<style scoped>
.booking-form {
  padding: 16px;
}
.booking-form input {
  display: block;
  margin-bottom: 8px;
  padding: 6px;
}
</style>
