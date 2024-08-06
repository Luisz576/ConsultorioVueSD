<script setup lang="ts">
  import PatientTile from '../components/tile/PatientTile.vue'
  import { ref, type Ref, defineProps } from 'vue';
  import http from '@/scripts/http';

  const props = defineProps({
    onMountLoader: Function
  })

  const loading = ref(false)
  const patients: Ref<any> = ref([])
  const error: Ref<string | undefined> = ref(undefined)

  function load(){
    if(!loading.value){
      loading.value = true
      http.get('http://127.0.0.1:5000/api/patients').then(async (res) => {
        patients.value = (await res.json()).patients
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
    <PatientTile v-for="patient in patients" :key="patient.id" :patient="patient"></PatientTile>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>
