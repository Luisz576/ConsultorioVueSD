<script setup lang="ts">
  function _titleHandler(){
    window.open('http://localhost:5173/', '_self')
  }
</script>

<template>
  <header class="min-w-full bg-zinc-50 border-b-2 border-zinc-950">
    <div class="mx-16 my-4">
      <h1 @click="_titleHandler" class="text-2xl text-zinc-950 font-bold hover:cursor-pointer hover:text-zinc-600">Consultório</h1>
    </div>
  </header>
</template>

<style scoped>

</style>
