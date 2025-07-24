<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ["search", "update:modelValue"],
    data() {
        return {
            searchValue: ''
        };
    },
    methods: {
        updateSearchValue(e) {
            this.searchValue = e.target.value;
            this.$emit('search', this.searchValue);
        },
        handleSubmit() {
            this.$emit('search', this.searchValue);
        }
    }
}
</script>
<template>
     <div class="input-group mb-4">
        <input type="text"
        class="form-control"
        placeholder="Nhập thông tin bạn cần tìm kiếm"
        v-model="searchValue"
        @input="updateSearchValue"
        @keyup.enter="handleSubmit"
        />
        <div class="input-group-append">
            <button
            class="btn btn-outline-secondary"
            type="button"
            @click="handleSubmit">
            <img src="@/assets/search.svg" alt="" class="icon">
            </button>
        </div>
     </div>
</template>

<style scoped>
.input-group {
    max-width: 500px;
    margin: 0 auto;
}
.input-group input {
    border-radius: 0.25rem 0 0 0.25rem;
}
.input-group button {
    border-radius: 0 0.25rem 0.25rem 0;
}

.icon {
    height: 20px;
    width: 20px;
}
</style>