import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

// Public pages
import HomePage from '@/views/HomePage.vue'
import Rentals from '@/views/Rentals.vue'
import Catering from '@/views/events/Catering.vue'
import Venue from '@/views/events/Venue.vue'
import Depth from '@/views/events/Depth.vue'
import Education from '@/views/about/Education.vue'
import Instructors from '@/views/about/Instructors.vue'
import Faq from '@/views/about/Faq.vue'

import HostelBooking from '@/views/booking/Hostel.vue'
import LessonBooking from '@/views/booking/Lessons.vue'

import LessonsPage from '@/views/lessons/LessonsPage.vue'
import Surfing from '@/views/lessons/Surfing.vue'
import Skimboard from '@/views/lessons/Skimboard.vue'
import SUP from '@/views/lessons/Sup.vue'
import SUPSKATE from '@/views/lessons/Supskate.vue'

import SurfWall from '@/views/SurfWall.vue'
import Blog from '@/views/Blog.vue'
import BlogPost from '@/views/BlogPost.vue'
import Events from '@/views/Events.vue'
import EventsPost from '@/views/EventsPost.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage, meta: { title: 'Home - The SPOT' } },
      { path: 'rentals', component: Rentals, meta: { title: 'Rentals - The SPOT' } },
      { path: 'events/catering', component: Catering, meta: { title: 'Catering Events - The SPOT' } },
      { path: 'events/rentals', component: Venue, meta: { title: 'Venue Rentals - The SPOT' } },
      { path: 'events/depthrun', component: Depth, meta: { title: 'Depth Run - The SPOT' } },
      { path: 'about/education', component: Education, meta: { title: 'Education - The SPOT' } },
      { path: 'about/instructors', component: Instructors, meta: { title: 'Instructors - The SPOT' } },
      { path: 'about/faq', component: Faq, meta: { title: 'FAQ - The SPOT' } },
      { path: 'booking/hostel', component: HostelBooking, meta: { title: 'Hostel Booking - The SPOT' } },
      { path: 'booking/lessons', component: LessonBooking, meta: { title: 'Lesson Booking - The SPOT' } },
      { path: 'lessons', component: LessonsPage, meta: { title: 'Lessons - The SPOT' } },
      { path: 'lessons/surfing', component: Surfing, meta: { title: 'Surfing Lessons - The SPOT' } },
      { path: 'lessons/skimboard', component: Skimboard, meta: { title: 'Skimboard Lessons - The SPOT' } },
      { path: 'lessons/sup', component: SUP, meta: { title: 'SUP Lessons - The SPOT' } },
      { path: 'lessons/supskate', component: SUPSKATE, meta: { title: 'Land SUP Lessons - The SPOT' } },
      { path: 'surfwall', component: SurfWall, meta: { title: 'SurfWall Challenge - The SPOT' } },
      { path: 'blog', component: Blog, meta: { title: 'Blog - The SPOT' } },
      { path: 'blog/:slug', component: BlogPost, meta: { title: 'Blog Post - The SPOT' } },
      { path: 'events', component: Events, meta: { title: 'Events - The SPOT' } },
      { path: 'events/:slug', component: EventsPost, meta: { title: 'Events Post - The SPOT' } }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Global guard
router.beforeEach(async (to, from, next) => {
  // ✅ Set page title
  document.title = to.meta.title || 'The SPOT'

  // ✅ If no auth required, allow immediately
  if (!to.meta.requiresAuth) return next()

  try {
    const res = await fetch('/current_user', {
      credentials: 'include'
    })

    if (!res.ok) throw new Error('Not logged in')
    const user = await res.json()

    // ✅ Check role access
    if (to.meta.role && to.meta.role !== user.role) {
      return next('/admin/dashboard') // redirect to fallback
    }

    return next() // ✅ All good
  } catch (err) {
    console.warn('Redirecting to login:', err)
    return next('/admin/login')
  }
})

export default router
