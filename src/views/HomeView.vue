<template>
    <div class="banner-container mb-5">
        <picture>
            <source srcset="/images/banner-mobile.png" media="(max-width: 768px)">
            <img src="/images/banner-desktop.png" alt="Banner principal" class="img-fluid">
        </picture>
    </div>
    <div class="container">
        <div class="row">
            <div class="text-center mb-5">
                <h1 class="first fw-bold">Las mejores marcas en Akasha</h1>
            </div>
            <template v-if="loadingBrands">
                <p class="text-center">Cargando marcas...</p>
            </template>
            <template v-else-if="errorBrands">
                <p class="text-center text-danger">{{ errorBrands }}</p>
            </template>
            <template v-else>
                <BrandCard v-for="brand in brands" :key="brand.id" :brand="brand" />
            </template>
        </div>
        <div class="row">
            <div class="text-center mb-5">
                <h1 class="first fw-bold">Lo más nuevo en Akasha</h1>
                <p class="second fw-bold">Últimos productos agregados</p>
            </div>
            <template v-if="loadingProducts">
                <p class="text-center">Cargando productos...</p>
            </template>
            <template v-else-if="errorProducts">
                <p class="text-center text-danger">{{ errorProducts }}</p>
            </template>
            <template v-else>
                <SmallScreenCarousel v-if="isSmallScreen" :products="latestProducts" />
                <BigScreenCarousel v-else :products="latestProducts" />
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BrandCard from '@/components/brand/BrandCard.vue';
import BigScreenCarousel from '@/components/carousel/LargeScreenCarousel.vue';
import SmallScreenCarousel from '@/components/carousel/SmallScreenCarousel.vue';
import { useBrands } from '@/composables/useBrands';
import { useProducts } from '@/composables/useProducts';

const { brands, loading: loadingBrands, error: errorBrands } = useBrands();
const { latestProducts, fetchLatestProducts, loading: loadingProducts, error: errorProducts } = useProducts();

const isSmallScreen = ref(window.innerWidth < 768);

const updateScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 768;
};

onMounted(() => {
    fetchLatestProducts(); // 🔹 Hacer la solicitud una sola vez al montar HomeView
    window.addEventListener("resize", updateScreenSize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
.first {
    color: #fba2c8;
}

.second {
    color: #9a9999;
}
</style>
