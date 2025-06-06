import { ref } from 'vue'

// Reactive current language
export const currentLang = ref('zh')

// Available languages and flags
export const languages = {
    zh: { label: '中文', flag: 'fi-tw' },
  en: { label: 'English', flag: 'fi-us' },  
  ja: { label: '日本語', flag: 'fi-jp' }
}

// Function to change the language
export function setLanguage(lang) {
  if (languages[lang]) {
    currentLang.value = lang
    localStorage.setItem('lang', lang) // optional: persist selection
  }
}
