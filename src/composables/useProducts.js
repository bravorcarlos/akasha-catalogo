import { ref } from 'vue';
import { getProductsByBrand, getProductsBySearch, getProductBySlug, getLatestProducts } from '@/services/productService';

export function useProducts() {
  const products = ref([]);
  const product = ref(null);
  const latestProducts = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const page = ref(1); // Página actual
  const totalPages = ref(1); // Total de páginas

  // Obtener productos por marca
  const fetchProducts = async (brandSlug = null, searchTerm = null, pageNum = 1) => {
    try {
      loading.value = true;
      page.value = pageNum; // Actualizamos la página actual

      let response;
      if (brandSlug) {
        response = await getProductsByBrand(brandSlug, page.value);
      } else if (searchTerm) {
        response = await getProductsBySearch(searchTerm, page.value);
      }

      products.value = response.results;
      totalPages.value = Math.ceil(response.count / 8); // Total de páginas calculado con base en la cantidad de productos y 8 por página
    } catch (err) {
      error.value = 'Error cargando productos';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Obtener un solo producto por su slug
  const fetchProduct = async (slug) => {
    try {
      loading.value = true;
      product.value = await getProductBySlug(slug);
    } catch (err) {
      error.value = 'Error cargando el producto';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Obtener productos más recientes
  const fetchLatestProducts = async () => {
    try {
      loading.value = true;
      latestProducts.value = await getLatestProducts();
    } catch (err) {
      error.value = 'Error cargando productos más recientes';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Regresar los valores y las funciones fetch
  return { products, product, latestProducts, loading, error, fetchProducts, fetchProduct, fetchLatestProducts, page, totalPages };
}
