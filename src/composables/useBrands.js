import { ref, onMounted } from 'vue';
import { getBrands } from '@/services/brandService';

export function useBrands() {
  const brands = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchBrands = async () => {
    try {
      brands.value = await getBrands();
    } catch (err) {
      error.value = 'Error cargando marcas';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchBrands);

  return { brands, loading, error };
}
