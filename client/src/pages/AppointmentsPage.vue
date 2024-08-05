<script setup lang="ts">
  import AppointmentTable from '../components/AppointmentTable.vue';
  import { defineProps } from 'vue'

  const props = defineProps({
    doctorId: Number
  })

  function buttonHandler(){
    alert("New")
  }
</script>

<template>
  <div class="mx-24 my-8">
    <div>
      <h3 class="text-lg font-bold underline">Consultas</h3>
    </div>
    <div class="mt-4">
      <AppointmentTable :doctor-id="props.doctorId"></AppointmentTable>
    </div>
    <div class="mt-4">
      <button class="bg-zinc-700 hover:bg-zinc-950 px-3 py-2 text-white" @click="buttonHandler">Nova Consulta</button>
    </div>
    <!-- TODO: CONSULTA MODAL -->
  </div>
</template>

<style scoped>

</style>
