<template>
    <div class="col-md-3 col-6 mb-5">
      <router-link :to="{ name: 'product-list', params: { brandSlug: brand.slug } }" class="text-decoration-none">
        <div class="card h-100 shadow-sm">
          <!-- Imagen de la marca -->
          <img :src="brand.image" class="card-img-top img-fluid mx-auto" alt="Marca" style="height: 200px; width: 100%; object-fit: contain;" loading="lazy">
          <div class="card-body d-flex flex-column">
            <!-- Nombre de la marca -->
            <h6 class="card-text text-center m-0" style="font-size: 1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ brand.name }}</h6>
          </div>
        </div>
      </router-link>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    brand: {
      type: Object,
      required: true
    }
  });
  const brand = props.brand;
  </script>
  
  <style scoped>
  /* Se asegura de que las tarjetas tengan el mismo tamaño, bordes redondeados y sombras */
  .card {
    border-radius: 0.5rem;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  /* Agregar sombra para darle un efecto de profundidad */
  .card:hover {
    transform: translateY(-5px);
  }
  
  /* Controlar el tamaño de la imagen para que quede equilibrada */
  .card-img-top {
    object-fit: contain;
    height: 200px;
    width: 100%;
    margin: 0 auto;
  }
  
  /* Ajustar el texto dentro de la tarjeta de forma estética */
  .card-body {
    padding: 1rem;
  }
  
  .card-text {
    font-size: 1rem;
    color: #333;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  </style>
  