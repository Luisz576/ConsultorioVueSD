<script setup lang="ts">
  import http from '../scripts/http'
  import { defineProps } from 'vue'

  const props = defineProps({
    'doctorId': Number
  })

  async function loadAppointments(){
    await http.get(`${http.API_URL}/doctor/${props.doctorId}/appointments`, {
      "teste": "jfgwue"
    })
  }

  loadAppointments()
</script>

<template>
  <div>
    <!-- TODO: fazer coo tabela mas com components -->
  </div>
</template>

<style scoped>

</style>
