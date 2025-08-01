<script>
export default {
    name: 'RequestList',
    props: {
        requests: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        console.log('RequestList mounted with requests:', this.requests);
    },
    methods: {

        checkLateReturn(request) {
            if (!request.expectedReturnDate) return false;
            if(request.status === 'borrowed' || 1===1) {
              const today = new Date();
              const expectedReturn = new Date(request.expectedReturnDate);
              return expectedReturn < today;
            }
        },
        
        goToDelete(request) {
          console.log('Delete button clicked!', request._id);
          console.log('Request status:', request.status);
          this.$emit('delete-request', request._id);
        },
        
        formatDate(date) {
            if (!date) return 'Chưa có thông tin';
            return new Date(date).toLocaleDateString('vi-VN');
        },
        
        getStatusText(status) {
            const statusMap = {
                'pending': 'Đang chờ duyệt',
                'approved': 'Đã duyệt',
                'rejected': 'Bị từ chối',
                'borrowed': 'Đã mượn',
                'returned': 'Đã trả',
                'lost': 'Mất sách'
            };
            return statusMap[status] || status || 'Không xác định';
        },
        
        getStatusClass(status) {
            const classMap = {
                'pending': 'text-warning',
                'approved': 'text-success',
                'rejected': 'text-danger',
                'borrowed': 'text-info',
                'returned': 'text-secondary',
                'lost': 'text-danger'
            };
            return classMap[status] || 'text-muted';
        }
    }
}
</script>

<template>
  <div class="container">
    <!-- Debug info -->
    <div v-if="!requests || requests.length === 0" class="alert alert-info">
      <p>Không có yêu cầu nào để hiển thị</p>
      <small>Debug: requests = {{ requests }}</small>
    </div>
    
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      <div class="col" v-for="request in requests" :key="request._id || request.id">
        <div class="card h-100 shadow-sm book-card" :class="{ 'border-danger border-3': checkLateReturn(request) }">
          <div class="card-body d-flex">

        <!-- field chứa ảnh -->
        <div class="me-3">
          <img
            :src="request.book.image || 'https://via.placeholder.com/100x150?text=No+Image'"
            alt="Ảnh sách"
            class="img-fluid rounded"
            style="width: 100px; height: 150px; object-fit: cover;"
          />
        </div>

        <!-- field chứa thông tin sách -->
        <div class="d-flex flex-column">
          <h5 class="card-title fw-bold text-primary">
            {{ request.book.tensach || 'Tên sách không có' }}
            <br />
            <span class="text-muted fs-6">Tác giả: {{ request.book.tacgia || 'Chưa có thông tin' }}</span>
          </h5>

          <p class="card-text mb-1">
            <strong>Ngày yêu cầu:</strong> {{ formatDate(request.createdDate || request.createdAt) }}
          </p>
          <p class="card-text mb-1">
            <strong>Ngày mượn:</strong> {{ formatDate(request.borrowDate) }}
          </p>
          <p class="card-text mb-1">
            <strong>Ngày trả dự kiến:</strong> {{ formatDate(request.expectedReturnDate) }}
          </p>
          <p class="card-text mb-1">
            <strong>Trạng thái: </strong>
            <span :class="getStatusClass(request.status)">
              {{ getStatusText(request.status) }}
            </span>
          </p>
           <p v-if="request.status === 'rejected'" class="mb-1">
                <strong>Lý do: </strong> {{ request.reason }}
            </p>

          <button
            type="button"
            class="btn btn-outline-danger mt-auto"
            @click="goToDelete(request)"
            :disabled="request.status === 'borrowed'"
            style="margin-top: 10px;"
          >
            <span v-if="request.status === 'borrowed'">Không thể xóa</span>
            <span v-else>Xoá yêu cầu</span>
          </button>
        </div>
      </div>

        </div>
      </div>
    </div>
  </div>
</template>