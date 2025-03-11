<template>
    <div class="container">
        <!-- Carrusel -->
        <div v-if="products.length > 0" id="productCarouselLarge" class="carousel slide" data-bs-ride="carousel"
            data-bs-interval="3000">
            <div class="carousel-inner">
                <!-- Carrusel dinámico basado en los productos -->
                <div v-for="(group, index) in productGroups" :key="'group-' + index" class="carousel-item"
                    :class="{ active: index === 0 }">
                    <div class="row ">
                        <ProductCard v-for="product in group" :key="product.id" :product="product"></ProductCard>
                    </div>
                </div>
            </div>

            <!-- Botones laterales nuevos -->
            <button class="btn btn-link carousel-control-prev mx-2 mb-2" type="button" data-bs-target="#productCarouselLarge"
                data-bs-slide="prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#fba2c8"
                    class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path
                        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
            </button>
            <button class="btn btn-link carousel-control-next mx-2 mb-2" type="button" data-bs-target="#productCarouselLarge"
                data-bs-slide="next">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#fba2c8"
                    class="bi bi-arrow-right-circle-fil" viewBox="0 0 16 16">
                    <path
                        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
            </button>
        </div>
        <p v-else class="text-center mt-4">Cargando productos...</p>
    </div>
</template>

<script setup>
import { computed, toRefs } from "vue";
import ProductCard from "../product/ProductCard.vue";

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});

// Convierte products en una referencia reactiva
const { products } = toRefs(props);

// Divide los productos en grupos de 4 para el carrusel
const productGroups = computed(() => {
    const groups = [];
    for (let i = 0; i < products.value.length; i += 4) {
        groups.push(products.value.slice(i, i + 4)); // Cada grupo tiene 4 productos
    }
    return groups;
});
</script>

<style scoped>
/* Asegura que las flechas sean visibles */
.carousel-control-prev-icon,
.carousel-control-next-icon {
    filter: invert(100%);
    width: 50px;
    height: 50px;
}

.carousel-control-prev {
    width: 3em;
}

.carousel-control-next {
    width: 3em;
}
</style>