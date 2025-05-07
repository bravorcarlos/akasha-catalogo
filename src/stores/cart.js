import { defineStore } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // cada item: { id, name, price, quantity }
  }),
  actions: {
    addItem(product) {
      const index = this.items.findIndex(item => item.id === product.id)
      if (index !== -1) {
        this.items[index].quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    clearCart() {
      this.items = []
    },
    updateQuantity(productId, newQuantity) {
      const item = this.items.find(p => p.id === productId);
      if (item && newQuantity > 0) {
        item.quantity = newQuantity;
      }
    },
  },
  getters: {
    totalAmount() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    totalItems() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0)
    },
    whatsappMessage() {
      let message = '¡Hola! Me gustaría ordenar los siguientes productos:\n'
      this.items.forEach(item => {
        message += `- ${item.name} - ${item.brand.name} x${item.quantity}\n`
      })
      message += `\nTotal estimado: $${this.totalAmount.toFixed(2)}`
      return message
    }
  },
  persist: true,  // Activamos la persistencia para este store
})
