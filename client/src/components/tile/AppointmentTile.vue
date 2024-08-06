<script setup lang="ts">
  import { defineProps } from 'vue'
import http from '../../scripts/http'

  const props = defineProps({
    appointment: Object
  })
  // { "id": 1, "duration": 1, "hour": 1, "patientId": 1, "doctorId": 1 }

  var removing = false
  async function _remove_handler(){
    if(removing){
      return
    }
    removing = true
    const res = await http.delete(`http://127.0.0.1:5000/api/doctor/${props.appointment.doctorId}/appointment/${props.appointment.id}`)
    if(res.status != 200){
      alert("Error to delete!")
    }else{
      window.open(`http://localhost:5173/doctor/${props.appointment.doctorId}/appointments`, '_self')
    }
    removing = false
  }
</script>

<template>
  <div class="my-2 w-full">
    <div class="bg-zinc-600 px-4 py-2 flex justify-stretch">
      <div class="flex-1">
        <p>{{ props.appointment.hour }}</p>
      </div>
      <div class="flex-1">
        <div class="flex justify-end mr-4 hover:cursor-pointer" @click="_remove_handler">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
