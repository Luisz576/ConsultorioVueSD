<script setup lang="ts">
  const options: {
    name: string,
    text: string,
    path: string
  }[] = [
    {
      name: "doctors",
      text: "Médicos",
      path: "/doctors",
    },
    {
      name: "clients",
      text: "Clientes",
      path: "/clients",
    }
  ]

  function _go_to(path: string){
    window.open(path, '_self')
  }
</script>

<template>
  <div class="mx-24 my-8">
    <div>
      <h3 class="text-xl underline font-bold text-zinc-950">Home</h3>
    </div>
    <div class="mx-4 mt-2">
      <ul>
        <li class="mb-2" v-for="option in options" :key="option.name">
          <span @click="() => _go_to(option.path)" class="text-sm text-blue-700 hover:cursor-pointer hover:text-blue-800 hover:font-bold">{{ option.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
