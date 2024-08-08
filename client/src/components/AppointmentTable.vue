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
      const aps = (await res.json()).appointments
      aps.sort((a: any, b: any) => a.hour - b.hour)
      appointments.value = aps
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
    <div v-else-if="appointments.length > 0">
      <div class="my-2 w-full">
        <div class="bg-zinc-400 px-4 py-2 flex justify-stretch">
          <div class="mt-1 grid appointment-header-content">
            <div>
              <p class="font-bold text-lg">Hora</p>
            </div>
            <div>
              <p class="font-bold text-lg">Paciente</p>
            </div>
            <div>
              <p class="font-bold text-lg">Duração</p>
            </div>
          </div>
          <div class="flex-1"></div>
        </div>
      </div>
        <AppointmentTile v-for="appointment in appointments" :key="appointment.id" :appointment="appointment"></AppointmentTile>
      </div>
    <div v-else>
      <p>Nenhuma consulta marcada!</p>
    </div>
  </div>
</template>

<style scoped>
  .appointment-header-content{
    flex: 5;
    grid-template-columns: 1fr 2fr 1fr;
  }
</style>
