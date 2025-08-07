<template>
  <div class="container py-4">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      <div v-for="nxb in nxbList" :key="nxb._id" class="col">
        <div class="card h-100 d-flex flex-column shadow-sm">
          <div class="card-body flex-grow-1">
            <h5 class="card-title fw-semibold">{{ nxb.tennxb }}</h5>
            <p class="card-text text-muted mb-0"><i class="fa-solid fa-location-dot"></i> {{ nxb.diaChi }}</p>
          </div>
          <div class="card-footer bg-white border-0 d-flex flex-column gap-2 mt-auto">
            <button
              type="button"
              class="btn btn-outline-success w-100"
              @click="goToUpdate(nxb)"
            >
              <i class="fa-solid fa-pencil me-1"></i>
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NXBList',
  props: {
    nxbList: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    console.log('NXBList mounted with nxbList:', this.nxbList);
  },
  methods: {
    goToDelete(nxb) {
      console.log('Delete button clicked!', nxb._id);
      this.$emit('delete-nxb', nxb._id);
    },
    goToUpdate(nxb) {
      this.$router.push({
        name: 'UpdateNXB',
        params: {
          nxbId: nxb._id,
        }
      });
      this.$emit('update-nxb', nxb);
    },
  },
}
</script>
