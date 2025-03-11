<template>
    <div v-if="!loading && !error && totalPages > 1" class="pagination d-flex align-items-center">
        <button v-if="page > 1" @click="emitChangePage(page - 1)" class="btn btn-link mx-2 mb-2" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#fba2c8"
                class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
        </button>

        <span>Página {{ page }} de {{ totalPages }}</span>

        <button v-if="page < totalPages" @click="emitChangePage(page + 1)" class="btn btn-link mx-2 mb-2" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#fba2c8"
                class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
        </button>
    </div>
</template>
<script setup>
defineProps({
    page: Number,
    totalPages: Number,
    loading: Boolean,
    error: Boolean
});

const emit = defineEmits(["changePage"]);

const emitChangePage = (newPage) => {
    emit("changePage", newPage);
};
</script>

<style scoped>
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>