<script setup lang="ts">
  import AppointmentTable from '../components/AppointmentTable.vue';
  import NewAppointmentModal from '../components/modal/NewAppointmentModal.vue'
  import { defineProps, ref } from 'vue'

  function buttonHandler(){
    newAppointmentModalVisible.value = true
  }
  const newAppointmentModalVisible = ref(false)

  var loader: Function | null = null

  function buttonNewDoctorHandler(){
    newAppointmentModalVisible.value = true
  }

  function _onCloseHandler(){
    newAppointmentModalVisible.value = false
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
      <h3 class="text-lg font-bold underline">Consultas</h3>
    </div>
    <div class="mt-4">
      <AppointmentTable :doctor-id="Number($route.params.did)"></AppointmentTable>
    </div>
    <div class="mt-4">
      <button class="bg-zinc-700 hover:bg-zinc-950 px-3 py-2 text-white" @click="buttonHandler">Nova Consulta</button>
    </div>
    <NewAppointmentModal :doctor-id="Number($route.params.did)" :is-visible="newAppointmentModalVisible" :close-handler="_onCloseHandler" :reload-handler="_reloadHandler"></NewAppointmentModal>
  </div>
</template>

<style scoped>

</style>
