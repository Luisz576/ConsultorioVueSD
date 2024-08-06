import { createRouter, createWebHistory } from "vue-router"
import HomePage from "./pages/HomePage.vue"
import DoctorsPage from "./pages/DoctorsPage.vue"
import AppointmentsPage from "./pages/AppointmentsPage.vue"
import PatientsPage from "./pages/PatientsPage.vue"

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
      path: '/doctor/:did/appointments',
      name: "",
      component: AppointmentsPage
    },
    {
      path: '/patients',
      name: "",
      component: PatientsPage
    },
  ]
})

export default router
