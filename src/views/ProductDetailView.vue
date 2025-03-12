<template>
    <div class="container pb-3" v-if="product">
        <div class="row">
            <div class="col-md-5 text-center mb-3">
                <div class="card">
                    <!-- Mostrar la imagen solo si el producto está cargado -->
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
                    <p class="fs-5"><b>Precio: </b>{{ product.price }}$ =
                        <span v-if="product.price && dollarStore.exchangeRate">
                            {{ (product.price * dollarStore.exchangeRate).toFixed(2) }} Bs
                        </span>
                        <span v-else>N/A</span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Mostrar un mensaje de carga mientras se obtiene el producto -->
    <div v-else class="text-center mt-5">
        <p>Cargando información del producto...</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useProducts } from '@/composables/useProducts';
import { useDollarStore } from '@/stores/useExchangeRate';

const route = useRoute();
const { product, fetchProduct } = useProducts(); // Usamos fetchProduct
const dollarStore = useDollarStore();

// Fetch el producto cuando el componente es montado
onMounted(async () => {
    await fetchProduct(route.params.slug);
});
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>
