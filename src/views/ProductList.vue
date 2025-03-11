<template>
    <div class="container">
        <h1 v-if="brandSlug">Productos de {{ brandName }}</h1>
        <h1 v-else-if="searchTerm">Resultados para "{{ searchTerm }}"</h1>

        <p v-if="loading">Cargando productos...</p>
        <p v-if="error">{{ error }}</p>

        <div v-if="!loading && !error" class="row">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>

        <Pagination :page="page" :totalPages="totalPages" :loading="loading" :error="error" @changePage="changePage"></Pagination>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '@/composables/useProducts';
import ProductCard from '@/components/product/ProductCard.vue';
import Pagination from '@/components/common/Pagination.vue';
import { useBrands } from '@/composables/useBrands';

const { brands } = useBrands();
const route = useRoute();
const router = useRouter();
const brandSlug = computed(() => route.params.brandSlug);
const searchTerm = computed(() => route.query.search);
const page = computed(() => parseInt(route.query.page) || 1);  // Lee la página desde la query, si no existe usa 1
const { products, loading, error, fetchProducts, totalPages } = useProducts();

const brandName = computed(() => {
    const brand = brands.value.find((b) => b.slug === brandSlug.value);
    return brand ? brand.name : 'Marca no encontrada';
});

watch([brandSlug, searchTerm, page], () => {
    fetchProducts(brandSlug.value, searchTerm.value, page.value);
}, { immediate: true });

const changePage = (newPage) => {
    router.push({ 
        path: route.path, 
        query: { 
            ...route.query, 
            page: newPage 
        } 
    });  // Actualiza la URL con la nueva página
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
</style>
