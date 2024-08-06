<script setup lang="ts">
  import { defineProps, ref, type Ref } from 'vue'
  import http from '../../scripts/http'

  const props = defineProps({
    appointment: Object
  })

  var patient: Ref<any> = ref({})
  var loadingPatient = ref(false)
  async function loadPatient(){
    if(loadingPatient.value){
      return
    }
    loadingPatient.value = true
    const res = await http.get(`http://127.0.0.1:5000/api/patient/${props.appointment.patientId}`)
    if(res.status != 200){
      alert("Erro ao carregar paciente!")
    }
    patient.value = (await res.json()).patient
    loadingPatient.value = false
  }

  loadPatient()

  var removing = false
  async function _remove_handler(){
    if(removing){
      return
    }
    removing = true
    const res = await http.delete(`http://127.0.0.1:5000/api/doctor/${props.appointment.doctorId}/appointment/${props.appointment.patientId}/${props.appointment.hour}`)
    if(res.status != 200){
      alert("Error to delete!")
    }else{
      window.open(`http://localhost:5173/doctor/${props.appointment.doctorId}/appointments`, '_self')
    }
    removing = false
  }

  function formatHour(hour: any){
    let h = Math.floor(Number(hour) / 2)
    let m = Number(hour) % 2
    return `${h > 9 ? h.toString() : "0" + h}:${m == 0 ? "00" : "30"}`
  }

  function formatDuration(duration: any){
    switch(Number(duration)){
      case 2:
        return "1h"
      case 3:
        return "1h30m"
      case 4:
        return "2h"
      case 1:
      default:
        return "30m"
    }
  }
</script>

<template>
  <div class="my-2 w-full">
    <div class="bg-zinc-200 px-4 py-2 flex justify-stretch">
      <div class="mt-1 grid appointment-tile-content">
       <!-- { "id": 1, "duration": 1, "hour": 1, "patientId": 1, "doctorId": 1 } -->
        <div>
          <p>{{ formatHour(props.appointment.hour) }}</p>
        </div>
        <div v-if="loadingPatient">
          <p>Loading...</p>
        </div>
        <div v-else-if="patient.person != undefined">
          <p>{{ patient.person.name }}</p>
        </div>
        <div v-else>
          <p class="italic">Erro to load patient</p>
        </div>
        <div>
          <p>{{ formatDuration(props.appointment.duration) }}</p>
        </div>
      </div>
      <div class="flex-1">
        <div class="flex justify-end mr-4">
          <div class="size-8 flex justify-center items-center bg-red-700 hover:bg-red-900 hover:cursor-pointer" @click="_remove_handler">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .appointment-tile-content{
    flex: 5;
    grid-template-columns: 1fr 2fr 1fr;
  }
</style>
