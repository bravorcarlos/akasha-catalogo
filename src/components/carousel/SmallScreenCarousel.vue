<template>
    <div class="container">
        <div v-if="products.length > 0" id="productCarouselSmall" class="carousel slide" data-bs-ride="carousel"
            data-bs-interval="3000">
            <div class="carousel-inner">
                <div v-for="(product, index) in products" :key="'product-' + index" class="carousel-item"
                    :class="{ active: index === 0 }">
                    <div class="row justify-content-center">
                        <ProductCard :product="product"></ProductCard>
                    </div>
                </div>
            </div>
            <button class="btn btn-link carousel-control-prev mx-2 mb-2" type="button"
                data-bs-target="#productCarouselSmall" data-bs-slide="prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#fba2c8"
                    class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path
                        d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
            </button>
            <button class="btn btn-link carousel-control-next mx-2 mb-2" type="button"
                data-bs-target="#productCarouselSmall" data-bs-slide="next">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#fba2c8"
                    class="bi bi-arrow-right-circle-fil" viewBox="0 0 16 16">
                    <path
                        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
            </button>
        </div>
        <p v-else class="text-center mt-4">No hay productos disponibles</p>
    </div>
</template>

<script setup>
import ProductCard from "../product/ProductCard.vue";

defineProps({
    products: {
        type: Array,
        required: true
    }
});
</script>
