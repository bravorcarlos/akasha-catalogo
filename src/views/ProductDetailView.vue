<template>
    <div class="container pb-3" v-if="product">
        <div class="row">
            <div class="col-md-5 text-center mb-3">
                <div class="card">
                    <img v-if="product.image" :src="product.image" class="img-fluid mt-2 mb-2 mx-auto"
                        style="width: 400px; height: 400px; object-fit: cover;">
                </div>
            </div>
            <div class="col-md-7 mb-5">
                <div class="card p-3">
                    <div class="d-flex justify-content-between">
                        <h3 class="mt-2">{{ product.name }}</h3>
                    </div>
                    <p style="text-align: justify;">{{ product.description }}</p>
                    <p><b>Marca: </b>
                        <router-link :to="{ name: 'product-list', params: { brandSlug: product.brand.slug } }"
                            class="text-decoration-none">
                            <span>{{ product.brand.name }}</span>
                        </router-link>
                    </p>

                    <!-- Disponibilidad del producto -->
                    <p>
                        <b>Disponibilidad: </b>
                        <span :class="product.availability ? 'text-success fw-bold' : 'text-danger fw-bold'">
                            {{ product.availability ? 'Disponible' : 'Agotado' }}
                        </span>
                    </p>

                    <!-- Precio resaltado -->
                    <p class="fs-4 price-box">
                        <b>Precio: </b> 
                        <span class="price-text">{{ product.price }}$</span> = 
                        <span v-if="product.price && dollarStore.exchangeRate">
                            {{ (product.price * dollarStore.exchangeRate).toFixed(2) }} Bs
                        </span>
                        <span v-else>N/A</span>
                    </p>

                    <button 
                        class="btn btn-custom mt-3 text-white"
                        :disabled="!product.availability"
                        @click="addToCart"
                        >
                        Añadir a la bolsa
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="text-center mt-5">
        <p>Cargando información del producto...</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useProducts } from '@/composables/useProducts';
import { useDollarStore } from '@/stores/useExchangeRate';
import { useCartStore } from '@/stores/cart'

const route = useRoute();
const { product, fetchProduct } = useProducts();
const dollarStore = useDollarStore();
const cart = useCartStore();

const addToCart = () => {
  cart.addItem(product.value)
};

onMounted(async () => {
    await fetchProduct(route.params.slug);
});
</script>

<style scoped>
/* Resaltar el precio */
.price-box {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    display: inline-block;
}

.price-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #28a745; /* Verde para resaltar el precio */
}

.btn-custom {
  background-color: #fba2c8;
}
</style>
