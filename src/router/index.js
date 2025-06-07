import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

// Public pages
import HomePage from '../views/HomePage.vue'
import Rentals from '../views/Rentals.vue'
import Catering from '../views/events/Catering.vue'
import Venue from '../views/events/Venue.vue'
import Depth from '../views/events/Depth.vue'
import Education from '../views/about/Education.vue'
import Instructors from '../views/about/Instructors.vue'
import Faq from '../views/about/Faq.vue'

import HostelBooking from '../views/booking/Hostel.vue'
import LessonBooking from '../views/booking/Lessons.vue'

import LessonsPage from '../views/lessons/LessonsPage.vue'
import Surfing from '../views/lessons/Surfing.vue'
import Skimboard from '../views/lessons/Skimboard.vue'
import SUP from '../views/lessons/Sup.vue'
import SUPSKATE from '../views/lessons/Supskate.vue'

import SurfWall from '@/views/SurfWall.vue'

// Admin pages
import Login from '../views/admin/Login.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import EmailCampaigns from '../views/admin/EmailCampaigns.vue'
import Analytics from '../views/admin/Analytics.vue'
import BookingManager from '../views/admin/BookingManager.vue'
import ReviewManager from '../views/admin/ReviewManager.vue'
import GalleryManager from '../views/admin/GalleryManager.vue'
import EventManager from '../views/admin/EventManager.vue'
import BlogManager from '../views/admin/BlogManager.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'rentals', component: Rentals },
      { path: 'events/catering', component: Catering },
      { path: 'events/rentals', component: Venue },
      { path: 'events/depthrun', component: Depth },
      { path: 'about/education', component: Education },
      { path: 'about/instructors', component: Instructors },
      { path: 'about/faq', component: Faq },
      
      { path: 'booking/hostel', component: HostelBooking },
      { path: 'booking/lessons', component: LessonBooking },

      { path: 'lessons', component: LessonsPage },
      { path: 'lessons/surfing', component: Surfing },
      { path: 'lessons/skimboard', component: Skimboard },
      { path: 'lessons/sup', component: SUP },
      { path: 'lessons/supskate', component: SUPSKATE },

      { path: 'surfwall', component: SurfWall },
    ]
  },

  // Admin layout and admin-only tools
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'email-campaigns', component: EmailCampaigns, meta: { role: 'admin' } },
      { path: 'bookings', component: BookingManager, meta: { role: 'admin' } },
      { path: 'analytics', component: Analytics, meta: { role: 'admin' } },
      { path: 'reviews', component: ReviewManager, meta: { role: 'admin' } },
      { path: 'gallery', component: GalleryManager, meta: { role: 'admin' } },
      { path: 'events', component: EventManager, meta: { role: 'admin' } },
      // ✅ Staff-accessible route, outside AdminLayout layout
      { path: '/admin/blog', component: BlogManager, meta: { requiresAuth: true } }
    ]
  },
  
  // ✅ Login route
  { path: '/admin/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Global guard
router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  try {
    const res = await fetch('/current_user', {
      credentials: 'include'
    })

    if (!res.ok) throw new Error('Not logged in')
    const user = await res.json()

    // If route has role restriction
    if (to.meta.role && to.meta.role !== user.role) {
      return next('/admin/dashboard') // fallback to dashboard
    }

    next()
  } catch (err) {
    console.warn('Redirecting to login:', err)
    next('/admin/login')
  }
})

export default router
