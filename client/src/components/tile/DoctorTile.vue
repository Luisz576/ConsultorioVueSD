<script setup lang="ts">
  import http from '@/scripts/http';
  import { defineProps } from 'vue'
  const props = defineProps({
    doctor: Object
  })

  var removing = false
  var removed = false

  function formatCPF(cpf: string){
    if(cpf.trim().length < 11){
      return cpf
    }
    return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11)
  }

  function delete_handler(){
    if(!removing){
      removing = true
      http.delete(`http://127.0.0.1:5000/api/doctor/${props.doctor!.id}`).then((res) => {
        if(res.status == 200){
          removed = true
          window.open('http://localhost:5173/doctors', '_self')
        }
      }).catch((e) => {
        console.error(e)
      }).finally(() => {
        removing = false
      })
    }
  }
</script>

<template>
  <div class="bg-zinc-300 mb-4 px-4 py-2 flex justify-stretch" v-if="props.doctor != undefined">
    <div class="flex-1 flex items-center">
      <p class="text-lg font-bold">{{ props.doctor.person.name }} - {{ formatCPF(props.doctor.person.cpf) }}</p>
    </div>
    <div class="flex flex-1 justify-end">
      <button class="mr-4 bg-red-800 hover:bg-red-900 flex justify-center items-center px-4 py-2" @click="delete_handler">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-5 ">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        <span class="ml-2 text-white">Deletar</span>
      </button>
    </div>
  </div>
</template>
