<script>
export default {
    name: 'AllRequest',
    props: {
        requests: {
            type: Array,
            default: () => []
        },
        staffId: {
            type: String,
            required: true
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

        checkLateApprove(request) {
            if(request.status === 'pending') {
              const today = new Date();
              const expectedReturn = new Date(request.expectedReturnDate);
              return expectedReturn <= today;
            }
        },
        
        goToDelete(request) {
          console.log('Delete button clicked!', request._id);
          console.log('Request status:', request.status);
          this.$emit('delete-request', request._id);
        },

        goToApprove(request) {
            console.log('Approve button clicked!', request._id);
            this.$emit('approve-request', request._id, this.staffId);
        },

        gotoBorrowed(request) {
            console.log('Borrowed button clicked!', request._id);
            this.$emit('borrowed-request', request._id, this.staffId);
        },

        gotoReturned(request) {
            console.log('Returned button clicked!', request._id);
            this.$emit('returned-request', request._id, this.staffId);
        },

        goToReject(request) {
            console.log('Reject button clicked!', request._id);
            this.$emit('reject-request', request._id, this.staffId, 'Sách đang được kiểm duyệt');
        },

        gotoLost(request) {
            console.log('Lost button clicked!', request._id);
            this.$emit('lost-request', request._id, this.staffId);
        },

        gotoPayFine(request) {
            console.log('Pay Fine button clicked!', request.readerId);
            this.$emit('pay-fine', request.readerId);
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
    
<div v-else class="d-flex flex-column gap-3">
  <div
    class="card shadow-sm"
    v-for="request in requests"
    :key="request._id || request.id"
    :class="{ 'border-danger border-3': checkLateReturn(request) }"
  >
    <div class="card-body">
      <div class="row g-3 align-items-start">
        
        <!-- Cột ảnh sách -->
        <div class="col-md-3 text-center">
          <img
            :src="request.book.image || 'https://via.placeholder.com/100x150?text=No+Image'"
            alt="Ảnh sách"
            class="img-fluid rounded shadow-sm"
            style="height: 150px; object-fit: cover;"
          />
        </div>

        <!-- Cột thông tin chia 3 phần -->
        <div class="col-md-6">
          <div class="row g-3">
            <!-- Cột 1 -->
            <div class="col-md-4">
              <p class="mb-1 fw-bold text-primary">
                {{ request.book.tensach || 'Tên sách không có' }}
              </p>
              <p class="mb-1">
                <strong>Tác giả:</strong> {{ request.book.tacgia || 'Chưa có' }}
              </p>
              <p class="mb-1">
                <strong>Trạng thái: </strong>
                <span :class="getStatusClass(request.status)">
                  {{ getStatusText(request.status) }}
                </span>
              </p>

              <p v-if="request.status === 'approved'" class="mb-1">
                <strong>Người duyệt </strong>
                <span :class="getStatusClass(request.status)">
                  {{ request.staff.name || "Chưa cập nhật" }}
                </span>
              </p>
            </div>

            <!-- Cột 2 -->
            <div class="col-md-4">
              <p class="mb-1">
                <strong>Độc giả:</strong>
                {{ request.reader.firstname || 'Chưa cập nhật' }} {{ request.reader.lastname || '' }}
              </p>
              <p class="mb-1">
                <strong>Ngày yêu cầu:</strong> {{ formatDate(request.createdDate || request.createdAt) }}
              </p>
              <p v-if="request.status !== 'pending'" class="mb-1">
                <strong>Ngày duyệt:</strong> {{ formatDate(request.approvedDate) }}
              </p>
                <p v-if="request.status === 'borrowed'" class="mb-1">
                <strong>Ngày mượn:</strong> {{ formatDate(request.borrowDate) }}
              </p>
            </div>

            <!-- Cột 3 -->
            <div class="col-md-4">
              <p class="mb-1">
                <strong>Ngày trả dự kiến:</strong> {{ formatDate(request.expectedReturnDate) }}
              </p>
            <p v-if="request.status === 'returned'" class="mb-1">
                <strong>Ngày trả thực tế:</strong> {{ formatDate(request.returnDate) }}
            </p>

             <p v-if="request.status === 'rejected'" class="mb-1">
                <strong>Lý do: </strong> {{ request.reason }}
            </p>

            <p v-if="checkLateReturn(request)" class="mb-1">
                <strong>Số ngày trả trễ: </strong> {{ counterLateReturn(request) }}
            </p>
            </div>
          </div>
        </div>

        <!-- Cột actions -->
        <div class="col-md-3 d-flex flex-column gap-2 align-items-stretch">
            <button
           v-if="checkLateApprove(request)"
            type="button"
            class="btn btn-outline-danger"
            @click="goToDelete(request)"
          >
            Xoá yêu cầu
          </button> 
          <button
           v-if="request.status === 'pending'"
            type="button"
            class="btn btn-outline-success"
            @click="goToApprove(request)"
          >
            Duyệt
          </button> 

          <button
           v-if="request.status === 'approved'"
            type="button"
            class="btn btn-outline-success"
            @click="gotoBorrowed(request)"
          >
            Đã mượn
          </button> 

          <button
           v-if="request.status === 'borrowed'"
            type="button"
            class="btn btn-outline-success"
            @click="gotoReturned(request)"
          >
            Đã trả
          </button> 

          <button
           v-if="request.status === 'borrowed'"
            type="button"
            class="btn btn-outline-danger"
            @click="gotoLost(request)"
          >
            Mất sách
          </button> 

          <button
           v-if="request.status === 'lost' && request.reader.fine > 0"
            type="button"
            class="btn btn-outline-success"
            @click="gotoPayFine(request)"
          >
            Thanh toán tiền phạt
          </button> 
          

          <button
           v-if="request.status === 'pending'"
            type="button"
            class="btn btn-outline-danger"
            @click="goToReject(request)"
          >
            Từ chối
          </button> 

          

          <!-- Bạn có thể thêm nút khác nếu cần -->
          <!-- <button class="btn btn-outline-primary">Xem chi tiết</button> -->
        </div>

      </div>
    </div>
  </div>
</div>



  </div>
</template>