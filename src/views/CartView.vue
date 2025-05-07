<template>
    <div class="container mt-5">
      <h2 class="mb-4">Tu bolsa <i class="bi bi-bag-fill icon-custom"></i></h2>

      <!-- Mensaje cuando la bolsa está vacía -->
      <div v-if="cart.items.length === 0" class="alert alert-info">
        Tu bolsa está vacía.
      </div>

      <!-- Vista de la bolsa si hay productos -->
      <div v-else>
        <ul class="list-group mb-4">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <router-link :to="{ name: 'ProductDetail', params: { slug: item.slug } }" class="text-decoration-none">
                <strong>{{ item.name }} - {{ item.brand.name }}</strong> <br />
              </router-link>
              Precio: ${{ item.price }} <br />
              <div class="d-flex align-items-center mt-2">
                <label class="me-2 mb-0">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  class="form-control form-control-sm"
                  style="width: 80px;"
                  :value="item.quantity"
                  @input="updateItemQuantity(item.id, $event.target.value)"
                />
              </div>
            </div>
            <button class="btn btn-danger btn-sm" @click="cart.removeItem(item.id)">
              Eliminar
            </button>
          </li>
        </ul>

        <h4>Total: ${{ cart.totalAmount.toFixed(2) }}</h4>

        <!-- Botón para enviar el pedido por WhatsApp -->
        <a
          :href="whatsappLink"
          target="_blank"
          class="btn btn-success mt-3"
          @click="clear"
        >
          Enviar pedido por WhatsApp <i class="bi bi-whatsapp"></i>
        </a>
      </div>
    </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cart = useCartStore();

// Número de la tienda en formato internacional, por ejemplo:
const numeroWhatsapp = 584248464939; // sin "+" ni espacios

const whatsappLink = computed(() => {
  const mensaje = encodeURIComponent(cart.whatsappMessage);
  return `https://wa.me/${numeroWhatsapp}?text=${mensaje}`
})

// Función para actualizar la cantidad
const updateItemQuantity = (productId, newQuantity) => {
  // Asegúrate de que la cantidad no sea menor que 1
  if (newQuantity < 1) return;
  // Llama al método del store para actualizar la cantidad
  cart.updateQuantity(productId, parseInt(newQuantity, 10));
};

// Función para vaciar la bolsa al enviar el pedido
const clear = () => {
  cart.clearCart(); // Método que vacía la bolsa
};
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

.icon-custom {
  color: #fba2c8;
}
</style>
