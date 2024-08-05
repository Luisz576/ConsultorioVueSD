import { createRouter, createWebHistory } from "vue-router"
import HomePage from "./pages/HomePage.vue"
import DoctorsPage from "./pages/DoctorsPage.vue"
import AppointmentsPage from "./pages/AppointmentsPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "",
      component: HomePage
    },
    {
      path: '/doctors',
      name: "",
      component: DoctorsPage
    },
    {
      path: '/appointments',
      name: "",
      component: AppointmentsPage
    },
    {
      path: '/client',
      name: "",
      component: HomePage // TODO
    },
  ]
})

export default router
