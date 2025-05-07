<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary mb-5">
        <div class="container-fluid">
            <!-- Logo -->
            <router-link :to="{name: 'home'}" class="nav-link active">
                <img src="/images/logo.png" alt="Logo" width="100" height="86">
            </router-link>

            <!-- Barra de búsqueda SIEMPRE visible -->
            <form class="d-flex search-bar" role="search" @submit.prevent="searchProducts">
                <input v-model="searchTerm" class="form-control me-2 search-custom" type="search"
                    placeholder="Buscar en Akasha" aria-label="Search">
                <button class="btn btn-custom" type="submit">Buscar</button>
            </form>

            <!-- Botón de menú -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menú colapsable -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{name: 'home'}" class="nav-link active">
                            Inicio
                        </router-link>
                    </li>

                    <li class="nav-item dropdown" v-if="brands.length > 0 && !loading && !error">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Marcas
                        </a>
                        <ul class="dropdown-menu">
                            <li v-for="brand in brands" :key="brand.slug">
                                <router-link :to="`/products/${brand.slug}`" class="dropdown-item">
                                    {{ brand.name }}
                                </router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item" v-if="loading">
                        <span class="nav-link disabled">Cargando marcas...</span>
                    </li>

                    <li class="nav-item" v-if="error">
                        <span class="nav-link text-danger">Error al cargar marcas</span>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Contacto
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="https://wa.me/584121820114">Whatsapp 1</a></li>
                            <li><a class="dropdown-item" href="https://wa.me/584248464939">Whatsapp 2</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <router-link :to="{name: 'cart'}" class="nav-link">
                            Bolsa
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-fill icon-custom mb-1" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
                            </svg>

                            ({{ cartStore.totalItems }})
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBrands } from '@/composables/useBrands';
import { useCartStore } from '@/stores/cart'

const searchTerm = ref('');
const router = useRouter();
const { brands, loading, error } = useBrands();
const cartStore = useCartStore()

const searchProducts = () => {
    if (searchTerm.value) {
        router.push({ path: '/products', query: { search: searchTerm.value } });
        searchTerm.value = '';
    }
};
</script>
<style scoped>
.btn-custom {
    outline: 1px solid #ced4da;
}

.btn-custom:hover {
    background-color: #fba2c8;
    outline: #fba2c8;
}

.icon-custom {
    color: #fba2c8;
}

.search-custom:focus {
    border-color: #fba2c8;
    /* Cambia el color del borde */
    box-shadow: 0 0 2px #fba2c8;
    /* Agrega un resplandor rosado */
    outline: none;
    /* Elimina el outline por defecto */
}

.search-custom:focus::placeholder {
    color: transparent;
}

.search-bar {
    order: 2; /* Mueve la barra de búsqueda a la derecha en pantallas grandes */
}

@media (max-width: 992px) {
    .search-bar {
        width: 100%;
        order: 1; /* Mueve la barra de búsqueda arriba en pantallas pequeñas */
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .search-custom {
        width: 100%;
    }
}
</style>