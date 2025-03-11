import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useDollarStore = defineStore('dollar', () => {
    const exchangeRate = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchExchangeRate = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get('https://ve.dolarapi.com/v1/dolares/oficial');
            exchangeRate.value = response.data.promedio;
        } catch (err) {
            error.value = 'Error obteniendo el tipo de cambio';
        } finally {
            loading.value = false;
        }
    };

    const convertToLocalCurrency = (priceInUSD) => {
        return exchangeRate.value ? (priceInUSD * exchangeRate.value).toFixed(2) : 'N/A';
    };

    return {
        exchangeRate,
        loading,
        error,
        fetchExchangeRate,
        convertToLocalCurrency
    };
});
