<script setup lang="ts">
  import http from '@/scripts/http'
  import { defineProps, defineEmits, ref } from 'vue';

  const person = ref({
    'name': "",
    "cpf": "",
    "email": "",
    "cellPhone": ""
  })
  const universityDegree = ref("")

  var creating = false

  const props = defineProps({
    isVisible: Boolean,
    closeHandler: Function,
    reloadHandler: Function
  })

  const emits = defineEmits(['CloseView'])

  async function _new(){
    if(!creating){
      creating = true
      try{
        if(person.value.name.length > 2 && person.value.cpf.length == 11 && universityDegree.value.length > 5){
          const res = await http.post('http://127.0.0.1:5000/api/doctor', {
            universityDegree: universityDegree.value,
            personData: person.value
          })
          if(res.status == 200){
            if(props.reloadHandler){
              props.reloadHandler()
            }
            _hanlder()
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

  function _hanlder(){
    if(props.closeHandler){
      props.closeHandler()
    }
  }
</script>

<template>
  <div v-show="props.isVisible" class="top-0 left-0 fixed w-full h-full">
    <div class="top-0 left-0 z-10 bg-zinc-950 opacity-50 w-full h-full" @click="_hanlder"></div>
    <div class="px-10 pt-8 pb-6 fixed bg-zinc-300 z-20 w-96" style="left: calc(50% - 12rem); top: calc(20%);">
      <h3 class="text-950 font-bold text-lg underline">Novo Médico</h3>
      <div class="mt-2">
        <div class="mb-2">
          <span class="text-sm underline text-zinc-950">Nome*:</span>
          <input class="bg-zinc-300 px-2 py-1 border-2 border-zinc-600 w-full" v-model="person.name" placeholder="Nome">
        </div>
        <div class="mb-2">
          <span class="text-sm underline text-zinc-950">CPF*:</span>
          <input class="bg-zinc-300 px-2 py-1 border-2 border-zinc-600 w-full" v-model="person.cpf" placeholder="CPF">
        </div>
        <div class="mb-2">
          <span class="text-sm underline text-zinc-950">Diploma*:</span>
          <input class="bg-zinc-300 px-2 py-1 border-2 border-zinc-600 w-full" v-model="universityDegree" placeholder="Diploma">
        </div>
        <div class="mb-2">
          <span class="text-sm underline text-zinc-950">Email:</span>
          <input class="bg-zinc-300 px-2 py-1 border-2 border-zinc-600 w-full" v-model="person.email" placeholder="Email">
        </div>
        <div class="mb-2">
          <span class="text-sm underline text-zinc-950">Celular:</span>
          <input class="bg-zinc-300 px-2 py-1 border-2 border-zinc-600 w-full" v-model="person.cellPhone" placeholder="Celular">
        </div>
      </div>
      <div class="mt-4 w-full flex justify-stretch">
        <button class="mr-4 flex-1 bg-green-800 py-2 text-white" @click="_new">Adicionar</button>
        <button class="ml-4 flex-1 bg-zinc-800 py-2 text-white" @click="_hanlder">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
