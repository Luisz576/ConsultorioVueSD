<script setup lang="ts">
  import Header from "./structure/Header.vue"
  import Footer from "./structure/Footer.vue"
  import { RouterView } from "vue-router";
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<style scoped>

</style>
