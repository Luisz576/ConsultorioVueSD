<script setup lang="ts">
  import http from '@/scripts/http'
  import { defineProps, defineEmits, ref, Ref } from 'vue';

  const newAppointment = ref({
    patientId: -1,
    hour: 1,
    duration: 1,
  })

  var creating = false

  const props = defineProps({
    doctorId: Number,
    isVisible: Boolean,
    closeHandler: Function,
    reloadHandler: Function
  })

  const emits = defineEmits(['CloseView'])
  const loading = ref(false)
  const patients: Ref<any> = ref([])
  const appointments: Ref<any> = ref([])
  const avaliableHours: Ref<{
    id: number
    text: string
  }[]> = ref([])

  function buildAvaliableHours(){
    const ahs: {
      id: number
      text: string
    }[] = []
    for(let i = 0; i < 48; i++){
      let h = Math.floor(i / 2)
      let m = i % 2
      ahs.push({
        id: i+1,
        text: `${h > 9 ? h.toString() : "0" + h}:${m == 0 ? "00" : "30"}`
      })
    }
    avaliableHours.value = ahs
  }

  async function load(){
    if(!loading.value){
      loading.value = true
      const resA = await http.get('http://127.0.0.1:5000/api/patients')
      if(resA.status == 200){
        const ps = [{
          id: -1,
          person: {
            id: -1,
            name: "-----"
          }
        }]
        const toAdd = (await resA.json()).patients
        for(let a in toAdd){
          ps.push(toAdd[a])
        }
        patients.value = ps

        const resB = await http.get(`http://127.0.0.1:5000/api/doctor/${props.doctorId}/appointments`)
        if(resB.status == 200){
          appointments.value = (await resB.json()).appointments
          buildAvaliableHours()
        }else{
          console.error("Error loading Appointments: ", resB)
        }
      }else{
        console.error("Error loading Patients: ", resA)
      }
      loading.value = false
    }
  }

  load()

  async function _new(){
    if(!creating){
      creating = true
      console.log(newAppointment.value)
      try{
        if(Number(newAppointment.value.patientId) > 0 && Number(newAppointment.value.duration) > 0 && Number(newAppointment.value.hour) > 0){ // ! TODO
          const res = await http.post(`http://127.0.0.1:5000/api/doctor/${props.doctorId}/appointment`, {
            patientId: Number(newAppointment.value.patientId),
            hour: Number(newAppointment.value.hour),
            duration: Number(newAppointment.value.duration)
          })
          if(res.status == 200){
            if(props.reloadHandler){
              window.open(`http://localhost:5173/doctor/${props.doctorId}/appointments`, '_self')
              props.reloadHandler()
            }
            _handler()
          }else{
            alert('Erro ao criar!')
          }
        }else{
          alert("Preencha os campos obrigatórios!")
        }
      }catch(e){
        console.error(e)
        alert(e)
      }finally{
        creating = false
      }
    }
  }

  function _handler(){
    if(props.closeHandler){
      props.closeHandler()
    }
  }
</script>

<template>
  <div v-show="props.isVisible" class="top-0 left-0 fixed w-full h-full">
    <div class="top-0 left-0 z-10 bg-zinc-950 opacity-50 w-full h-full" @click="_handler"></div>
    <div class="px-10 pt-8 pb-6 fixed bg-zinc-300 z-20 w-96" style="left: calc(50% - 12rem); top: calc(20%);">
      <div v-if="!loading">
        <h3 class="text-950 font-bold text-lg underline">Nova Consulta</h3>
        <div class="mt-2">
          <div class="mb-2">
            <p class="text-sm underline text-zinc-950">Paciente*:</p>
            <select class="mt-2 bg-zinc-300" v-model="newAppointment.patientId">
              <option v-for="patient in patients" :key="patient.id" :value="patient.id" :selected="patient.id == newAppointment.patientId">{{ patient.person.name }}</option>
            </select>
          </div>
          <div class="mb-2">
            <p class="text-sm underline text-zinc-950">Hora*:</p>
            <select class="mt-2 bg-zinc-300" v-model="newAppointment.hour">
              <option v-for="ah in avaliableHours" :key="ah.id" :value="ah.id" :selected="ah.id == newAppointment.hour">{{ ah.text }}</option>
            </select>
          </div>
          <div class="mb-2">
            <p class="text-sm underline text-zinc-950">Duração*:</p>
            <select class="mt-2 bg-zinc-300" v-model="newAppointment.duration">
              <option selected value="1">30m</option>
              <option value="2">1h</option>
              <option value="3">1h30m</option>
              <option value="4">2h</option>
            </select>
          </div>
        </div>
        <div class="mt-4 w-full flex justify-stretch">
          <button class="mr-4 flex-1 bg-green-800 py-2 text-white" @click="_new">Adicionar</button>
          <button class="ml-4 flex-1 bg-zinc-800 py-2 text-white" @click="_handler">Cancelar</button>
        </div>
      </div>
      <div v-else>
        <p>Carregando...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
