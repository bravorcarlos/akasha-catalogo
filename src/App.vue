<script setup>
import NavBar from './components/common/NavBar.vue';
import Footer from './components/common/Footer.vue';
import { RouterView } from 'vue-router';
import { onMounted } from 'vue'
import { useDollarStore } from '@/stores/useExchangeRate'

// Usar el store de Dollar
const dollarStore = useDollarStore()

// Cargar el tipo de cambio cuando la app se monte
onMounted(async () => {
  if (!dollarStore.exchangeRate) {
    await dollarStore.fetchExchangeRate() // Cargar el tipo de cambio globalmente
  }
})

</script>

<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped>
</style>
