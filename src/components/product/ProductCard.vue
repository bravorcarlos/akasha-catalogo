<template>
    <!-- <div class="col-md-3 col-6 mb-5">
        <router-link :to="{ name: 'ProductDetail', params: { slug: product.slug } }" class="text-decoration-none">
            <div class="card h-100">
                <img :src="product.image" class="img-fluid mt-1 mx-auto"
                    style="width: 250px; height: 250px; object-fit: cover;" loading="lazy">
                <div class="card-body">
                    <h6 class="card-title">{{ product.name }}</h6>
                    <h5>{{ product.price }} $</h5>
                    <h6 v-if="convertedPrice">{{ convertedPrice }} {{ currencySymbol }}</h6>
                    <h6 v-else>Cargando precio...</h6>
                </div>
            </div>
        </router-link>
    </div> -->

    <div class="col-md-3 col-6 mb-5">
        <router-link :to="{ name: 'ProductDetail', params: { slug: product.slug } }" class="text-decoration-none">
            <div class="card h-100">
                <img :src="product.image" class="card-img-top" alt="Product Image"
                    style="height: 200px; object-fit: cover;" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <h6 class="">{{ product.name.slice(0, 20) }}{{ product.name.length > 20 ? '...' : '' }}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">{{ product.price }}$</h6>
                    <h6 v-if="convertedPrice">{{ convertedPrice }} {{ currencySymbol }}</h6>
                    <h6 v-else>Cargando precio...</h6>
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

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-subtitle {
  font-size: 1rem;
}

.card-text {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
