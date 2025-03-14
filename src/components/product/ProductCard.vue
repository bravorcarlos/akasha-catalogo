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
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { useDollarStore } from '@/stores/useExchangeRate'
import { computed } from 'vue'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const product = props.product
const dollarStore = useDollarStore()

// Computed property para convertir el precio
const convertedPrice = computed(() => {
    return dollarStore.exchangeRate ? dollarStore.convertToLocalCurrency(product.price) : null
})

const currencySymbol = 'Bs'
</script>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}

.product-name {
  font-size: 1rem; /* Texto más pequeño para el nombre del producto */
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-subtitle {
  font-size: 1rem;
}

.card-text {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-container {
  position: relative;
}

.image-unavailable {
  opacity: 0.5;
}
</style>
