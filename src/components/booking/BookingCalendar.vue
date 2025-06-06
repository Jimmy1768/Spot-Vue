<template>
  <div class="modal-overlay" v-if="visible" @click.self="emitClose">
    <div class="calendar-modal">
      <button class="close-button" @click="emitClose">✕</button>
      <h2 class="modal-title">{{ t.bookOnline }}</h2>

      <label class="label">{{ t.checkin }}</label>
      <Datepicker
        v-model="dateRange"
        range
        :enable-time-picker="false"
        format="yyyy-MM-dd"
        :start-date="new Date()"
        placeholder="Select your stay period"
      />

      <div class="guest-input">
        <label>{{ t.guests }}</label>
        <input type="number" min="1" v-model.number="guestCount" />
      </div>

      <button class="confirm-button" @click="checkAvailability">
        {{ t.checkAvailability }}
      </button>

      <div class="availability-result" v-if="availabilityChecked">
        <p v-if="available">
          ✅ {{ t.available }} - {{ t.total }}: NT${{ totalPrice }}
        </p>
        <p v-else class="unavailable">
          ❌ {{ t.unavailable }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { currentLang } from '@/stores/lang'
import { translations } from '@/i18n/translations'

defineProps({ visible: Boolean })
const emit = defineEmits(['close'])

const emitClose = () => emit('close')

const t = computed(() => translations[currentLang.value].booking)

const dateRange = ref([new Date(), new Date(Date.now() + 86400000)])
const guestCount = ref(1)
const available = ref(false)
const availabilityChecked = ref(false)
const totalPrice = ref(0)

function checkAvailability() {
  console.log('🔍 Checking availability...')
  console.log('Date range:', dateRange.value)
  console.log('Guests:', guestCount.value)

  availabilityChecked.value = true

  const [start, end] = dateRange.value
  if (!start || !end || guestCount.value < 1) {
    console.log('❌ Invalid input – missing dates or guests')
    available.value = false
    totalPrice.value = 0
    return
  }

  const msPerDay = 1000 * 60 * 60 * 24
  const nights = Math.ceil((end - start) / msPerDay)
  const pricePerNight = 600
  totalPrice.value = nights * guestCount.value * pricePerNight

  available.value = true
  console.log('✅ Available – total price:', totalPrice.value)
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.calendar-modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.modal-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
}
.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}
.label {
  font-weight: bold;
  margin-bottom: 8px;
  display: inline-block;
}
.guest-input {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
input[type='number'] {
  width: 80px;
  padding: 6px;
  font-size: 0.95rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: center;
}
.confirm-button {
  margin-top: 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.confirm-button:hover {
  background-color: #2563eb;
}
.availability-result {
  margin-top: 12px;
  font-size: 0.95rem;
}
.unavailable {
  color: red;
}
</style>
