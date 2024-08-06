<script setup lang="ts">
  import http from '../scripts/http'
  import { defineProps, ref } from 'vue'
  import AppointmentTile from './tile/AppointmentTile.vue'

  const props = defineProps({
    'doctorId': Number
  })

  const appointments = ref([])

  var loadingAppointments = ref(false)
  async function loadAppointments(){
    if(loadingAppointments.value){
      return
    }
    loadingAppointments.value = true
    const res = await http.get(`${http.API_URL}/doctor/${props.doctorId}/appointments`)
    if(res.status == 200){
      appointments.value = (await res.json()).appointments
    }
    loadingAppointments.value = false
  }

  loadAppointments()
</script>

<template>
  <div>
    <div v-if="loadingAppointments">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <AppointmentTile v-for="appointment in appointments" :key="appointment.id" :appointment="appointment"></AppointmentTile>
    </div>
  </div>
</template>

<style scoped>

</style>
