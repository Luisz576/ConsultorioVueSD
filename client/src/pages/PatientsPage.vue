<script setup lang="ts">
  import PatientsList from '../components/PatientList.vue'
  import NewPatientModal from '../components/modal/NewPatientModal.vue'
  import { ref } from 'vue'

  const newPatientModalVisible = ref(false)
  var loader: Function | null = null

  function buttonNewPatientHandler(){
    newPatientModalVisible.value = true
  }

  function _onCloseHandler(){
    newPatientModalVisible.value = false
  }

  function _onMountLoader(l: Function){
    loader = l
  }

  function _reloadHandler(){
    if(loader != null){
      loader()
    }
  }
</script>

<template>
  <div class="mx-24 my-8">
    <div>
      <h3 class="text-lg font-bold underline">Pacientes</h3>
    </div>
    <div class="mt-4">
       <PatientsList :on-mount-loader="_onMountLoader"></PatientsList>
    </div>
    <div class="mt-4">
      <button class="bg-zinc-700 hover:bg-zinc-950 px-3 py-2 text-white" @click="buttonNewPatientHandler">Novo Paciente</button>
    </div>
    <NewPatientModal :is-visible="newPatientModalVisible" :close-handler="_onCloseHandler" :reload-handler="_reloadHandler"></NewPatientModal>
  </div>
</template>

<style scoped>

</style>
