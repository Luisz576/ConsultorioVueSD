<script setup lang="ts">
  import { ref, type Ref, defineProps } from 'vue';
  import DoctorTile from './tile/DoctorTile.vue';
  import http from '@/scripts/http';

  const props = defineProps({
    onMountLoader: Function
  })

  const loading = ref(false)
  const doctors: Ref<any> = ref([])
  const error: Ref<string | undefined> = ref(undefined)

  function load(){
    if(!loading.value){
      loading.value = true
      http.get('http://127.0.0.1:5000/api/doctors').then(async (res) => {
        doctors.value = (await res.json()).doctors
        loading.value = false
      }).catch((e) => {
        console.error(e)
        error.value = e
        loading.value = false
      })
    }
  }

  load()

  if(props.onMountLoader){
    props.onMountLoader(load)
  }

</script>

<template>
  <div v-if="error != undefined">
    <p>{{ error }}</p>
  </div>
  <div v-else-if="!loading">
    <DoctorTile v-for="doctor in doctors" :key="doctor.id" :doctor="doctor"></DoctorTile>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>
