<script>
export default {
    name: 'BorrowHistory',
    props: {
        requests: {
            type: Array,
            default: () => []
        },
        reader: {
            type: Object,
            default: () => ({})
        }
    },
    mounted() {
        console.log('RequestList mounted with requests:', this.requests);
    },
    methods: {

        checkLateReturn(request) {
            if (!request.expectedReturnDate) return false;
            if(request.status === 'borrowed') {
              const today = new Date();
              const expectedReturn = new Date(request.expectedReturnDate);
              return expectedReturn < today;
            }
        },

        counterLateReturn(request) {
          if(request.status ==='returned') {
            const returnDate = new Date(request.returnDate);
            const expectedReturnDate = new Date(request.expectedReturnDate);
            const diffTime = Math.abs(returnDate - expectedReturnDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
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
                'lost' : 'text-danger fw-bold'
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
    
<div class="card-body">
  <div
    class="card mb-3"
    v-for="request in requests"
    :key="request._id || request.id"
    :class="{ 'border-danger border-3': checkLateReturn(request) }"
  >
    <div class="row align-items-center g-3 p-3">
      <!-- Ảnh bên trái -->
      <div class="col-12 col-md-2">
        <img
          :src="request.book.image || 'https://via.placeholder.com/100x150?text=No+Image'"
          alt="Ảnh sách"
          class="img-fluid rounded"
          style="height: 150px; object-fit: cover;"
        />
      </div>

      <!-- Phần thông tin -->
      <div class="col-12 col-md-8">
        <div class="row">
          <!-- Cột 1 -->
          <div class="col-12 col-sm-6">
            <h5 class="card-title fw-bold text-primary">
              {{ request.book.tensach || 'Tên sách không có' }}<br />
              <span class="text-muted fs-6">
                Tác giả: {{ request.book.tacgia || 'Chưa có thông tin' }}
              </span>
            </h5>

            <p class="card-text mb-1">
              <strong>Ngày yêu cầu:</strong> {{ formatDate(request.createdDate || request.createdAt) }}
            </p>
            <p class="card-text mb-1">
              <strong>Ngày mượn:</strong> {{ formatDate(request.borrowDate) }}
            </p>
          </div>

          <!-- Cột 2 -->
          <div class="col-12 col-sm-6">
            <p class="card-text mb-1 mt-4 mt-sm-0">
              <strong>Ngày trả dự kiến:</strong> {{ formatDate(request.expectedReturnDate) }}
            </p>

            <p class="card-text mb-1 mt-4 mt-sm-0" v-if="request.status === 'returned'">
              <strong>Ngày trả thực tế:</strong> {{ formatDate(request.returnDate) }}
            </p>


            <p class="card-text mb-1 mt-4 mt-sm-0" v-if="request.status ==='returned'">
              <strong>Số ngày trả muộn: </strong> {{ counterLateReturn(request) }}
            </p>

            <p class="card-text mb-1">
              <strong>Trạng thái: </strong>
              <span :class="getStatusClass(request.status)">
                {{ getStatusText(request.status) }}
              </span>
            </p>

             <p class="card-text mb-1 mt-4 mt-sm-0" v-if="request.status ==='lost' && reader.fine !== 0">
              <strong>Thông tin phạt </strong> <span class="text-danger">Chưa thanh toán {{ reader.fine }} VNĐ</span>
            </p>
            <p class="card-text mb-1 mt-4 mt-sm-0" v-else-if="request.status ==='lost' && reader.fine === 0">
              <strong>Thông tin phạt:  </strong> <span class="text-success">Đã Thanh toán</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Nút xóa -->
      <div class="col-12 col-md-2 d-flex align-items-end justify-content-md-center mt-2 mt-md-0">
        <button
          type="button"
          class="btn btn-outline-danger w-100"
          @click="goToDelete(request)"
          :disabled="request.status === 'borrowed'"
        >
          Xoá khỏi lịch sử mượn
        </button>
      </div>
    </div>
  </div>
</div>



  </div>
</template>