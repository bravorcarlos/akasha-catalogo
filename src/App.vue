<script setup>
import NavBar from './components/common/NavBar.vue';
import Footer from './components/common/Footer.vue';
import { RouterView } from 'vue-router';
import { onMounted, watch } from 'vue'
import { useDollarStore } from '@/stores/useExchangeRate'
import { useRoute } from 'vue-router';

const route = useRoute();

// Usar el store de Dollar
const dollarStore = useDollarStore()

// Cargar el tipo de cambio cuando la app se monte
onMounted(async () => {
  if (!dollarStore.exchangeRate) {
    await dollarStore.fetchExchangeRate() // Cargar el tipo de cambio globalmente
  }
});

watch(route, () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
});


</script>

<template>
  <NavBar></NavBar>
  <div class="app-container">
    <router-view></router-view>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la pantalla */
}

footer {
  margin-top: auto;
}
</style>
