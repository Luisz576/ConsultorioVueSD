<script setup lang="ts">
  import NewDoctorModal from '@/components/modal/NewDoctorModal.vue';
  import DoctorsList from '../components/DoctorsList.vue'
  import { ref } from 'vue'

  const newDoctorModalVisible = ref(false)
  var loader: Function | null = null

  function buttonNewDoctorHandler(){
    newDoctorModalVisible.value = true
  }

  function _onCloseHandler(){
    newDoctorModalVisible.value = false
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
      <h3 class="text-lg font-bold underline">Médicos</h3>
    </div>
    <div class="mt-4">
      <!-- _onShowDoctorAppointments -->
       <DoctorsList :on-mount-loader="_onMountLoader"></DoctorsList>
    </div>
    <div class="mt-4">
      <button class="bg-zinc-700 hover:bg-zinc-950 px-3 py-2 text-white" @click="buttonNewDoctorHandler">Novo Médico</button>
    </div>
    <NewDoctorModal :is-visible="newDoctorModalVisible" :close-handler="_onCloseHandler" :reload-handler="_reloadHandler"></NewDoctorModal>
  </div>
</template>

<style scoped>

</style>
