<template>
  <div class="col-md-3 col-6 mb-5">
    <router-link :to="{ name: 'ProductDetail', params: { slug: product.slug } }" class="text-decoration-none">
      <div class="card h-100">
        <div class="image-container" :class="{ 'image-unavailable': !product.availability }">
          <img :src="product.image" class="card-img-top" alt="Product Image"
            style="height: 200px; object-fit: cover;" loading="lazy">
        </div>
        <div class="card-body d-flex flex-column">
          <h6 class="product-name">{{ product.name.slice(0, 20) }}{{ product.name.length > 20 ? '...' : '' }}</h6>
          <h6 class="card-subtitle mb-2 text-muted">{{ product.price }}$</h6>
          <h6 v-if="convertedPrice">{{ convertedPrice }} {{ currencySymbol }}</h6>
          <h6 v-else>Cargando precio...</h6>

          <!-- Disponibilidad -->
          <div v-if="product.availability" class="text-success mt-2">
            Disponible
          </div>
          <div v-else class="text-danger mt-2">
            No disponible
          </div>

          <!-- Botón para agregar a la bolsa -->
          <button 
            class="btn btn-sm btn-custom mt-3 text-white" 
            @click.stop.prevent="handleAddToCart"
            :disabled="!product.availability"
          >
            Añadir a la bolsa
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { useDollarStore } from '@/stores/useExchangeRate'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const product = props.product
const dollarStore = useDollarStore()
const cartStore = useCartStore()

const convertedPrice = computed(() => {
  return dollarStore.exchangeRate ? dollarStore.convertToLocalCurrency(product.price) : null
})

const currencySymbol = 'Bs'

const handleAddToCart = () => {
  cartStore.addItem(product)
}
</script>
<style scoped>
.btn-custom {
  background-color: #fba2c8;
}
</style>
