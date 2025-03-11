import apiClient from '@/services/apiClient';

export const getBrands = async () => {
  try {
    const response = await apiClient.get('/api/brands/');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo las marcas:', error);
    throw error;
  }
};
