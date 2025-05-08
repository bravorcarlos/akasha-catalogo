// composables/useAddToCart.js
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'

export function useAddToCart() {
  const cart = useCartStore()
  const toast = useToast()

  const addToCart = (product) => {
    cart.addItem(product)
    toast.success('¡Producto añadido a la bolsa!', {
      toastClassName: 'custom-toast',
      bodyClassName: 'custom-toast-body',
    })
  }

  return { addToCart }
}