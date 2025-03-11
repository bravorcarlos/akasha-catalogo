import apiClient from '@/services/apiClient';

// Obtener productos por marca con paginación
export const getProductsByBrand = async (brandSlug, page = 1) => {
  try {
    const response = await apiClient.get(`/api/products/?brand=${brandSlug}&page=${page}`);
    return response.data;  // Aquí regresamos los datos paginados (count, next, previous, results)
  } catch (error) {
    console.error('Error obteniendo productos por marca:', error);
    throw error;
  }
};

// Obtener productos por término de búsqueda con paginación
export const getProductsBySearch = async (searchTerm, page = 1) => {
  try {
    const response = await apiClient.get(`/api/products/?search=${searchTerm}&page=${page}`);
    return response.data;  // Aquí regresamos los datos paginados (count, next, previous, results)
  } catch (error) {
    console.error('Error buscando productos:', error);
    throw error;
  }
};

// Obtener producto por slug
export const getProductBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/api/product/${slug}/`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo el producto por slug:', error);
    throw error;
  }
};

export const getLatestProducts = async () => {
  try {
      const response = await apiClient.get('/api/latest-products/');
      return response.data;
  } catch (error) {
      console.error('Error obteniendo los últimos productos:', error);
      throw error;
  }
};
