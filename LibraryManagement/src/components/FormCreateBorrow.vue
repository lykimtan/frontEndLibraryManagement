<template>
  <div class="container py-5 d-flex justify-content-center">
    <form @submit.prevent="submitRequest" class="card shadow-lg p-4" style="width: 600px; border-radius: 20px;">
      <h3 class="text-center text-primary mb-4 fw-bold">Phiếu Mượn Sách</h3>

      <div class="mb-4">
        <label for="staticBook" class="form-label fw-semibold">📚 Tên sách</label>
        <input
          type="text"
          readonly
          class="form-control-plaintext bg-light px-3 py-2 rounded"
          id="staticBook"
          :value="book.tensach"
        />
        <input type="hidden" id="bookId" :value="bookId" />
        <input type="hidden" id="readerId" :value="readerId" />
      </div>


      <div class="mb-4">
        <label for="expectedReturnDate" class="form-label fw-semibold"><i class="fa-solid fa-calendar-week"></i> Ngày trả dự kiến</label>
        <input
          type="date"
          class="form-control px-3 py-2 rounded"
          id="expectedReturnDate"
          :min="today"
          :max="maxDay"
          v-model="expectedReturnDate"
        />
      </div>

      <div class="text-end">
        <button type="submit" class="btn btn-primary px-4 py-2 rounded-pill fw-semibold">
          Gửi yêu cầu
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormCreateRequestBorrow",
  props: {
      book: {
       type: Object,
       required: true
     },
     readerId: {
       type: String,
       required: true
     }
  },
  computed: {
  bookId() {
    return this.book._id;
  }
},
  data() {
    const today = new Date();
    const maxday = new Date(); 
    maxday.setDate(today.getDate() + 7);


    return { 
      expectedReturnDate: null,
      today: today.toISOString().split('T')[0], // Format YYYY-MM-DD
       maxDay: maxday.toISOString().split('T')[0], // Format YYYY-MM-DD
    };
  },

  methods : {
    submitRequest() {
        if(!this.expectedReturnDate) {
            alert("Vui lòng chọn ngày trả dự kiến.");
            return;
        }

        const today = new Date();
        const expected = new Date(this.expectedReturnDate);
        const diffTime = expected.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 7 || diffDays < 0) {
            alert("Ngày trả dự kiến phải trong khoảng từ hôm nay đến 7 ngày");
            return;
        }

        //tao payload de emit
        const payload = {
            bookId : this.bookId,
            readerId: this.readerId,
            expectedReturnDate: this.expectedReturnDate
        };
        this.$emit('submit:request', payload);
    }
    
  }
};
</script>