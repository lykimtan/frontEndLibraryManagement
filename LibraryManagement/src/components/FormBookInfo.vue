<template>
<div class="card shadow-sm border-0">
    <div class="card-body px-4 py-4">
      <h4 class="mb-4 text-primary fw-bold text-center">
        Cập nhật thông tin sách
      </h4>

      <Form @submit="handleSubmit" :validation-schema="BookFormSchema">
        <div class="row g-3">
          <!-- Tên sách -->
          <div class="col-md-6">
            <label class="form-label">Tên sách</label>
            <Field name="tensach" type="text" class="form-control" v-model="bookLocal.tensach" />
            <ErrorMessage name="tensach" class="text-danger small" />
          </div>

          <!-- Tác giả -->
          <div class="col-md-6">
            <label class="form-label">Tác giả</label>
            <Field name="tacgia" type="text" class="form-control" v-model="bookLocal.tacgia" />
            <ErrorMessage name="tacgia" class="text-danger small" />
          </div>

          <!-- Đơn giá -->
          <div class="col-md-6">
            <label class="form-label">Đơn giá</label>
            <Field name="dongia" type="number" class="form-control" v-model="bookLocal.dongia" />
            <ErrorMessage name="dongia" class="text-danger small" />
          </div>

          <!-- Số lượng -->
          <div class="col-md-6">
            <label class="form-label">Số quyển</label>
            <Field name="soquyen" type="number" class="form-control" v-model="bookLocal.soquyen" />
            <ErrorMessage name="soquyen" class="text-danger small" />
          </div>

          <!-- Nhà xuất bản -->
          <div class="col-md-6">
            <label class="form-label">Nhà xuất bản</label>
            <select v-model="bookLocal.nxb" class="form-select">
              <option disabled value="">{{ getNameNxb(bookLocal.nxb) }}</option>
              <option v-for="nxb in nxb" :key="nxb._id" :value="nxb._id">{{ nxb.tennxb }}</option>
            </select>
          </div>

          <!-- Ảnh bìa -->
          <div class="col-md-6">
  <label class="form-label">Ảnh bìa (URL)</label>
    <Field
        name="image"
        type="url"
        class="form-control"
        v-model="bookLocal.image"
    />
    <ErrorMessage name="image" class="text-danger small" />

  <!-- Ảnh preview -->
    <div v-if="bookLocal.image" class="mt-2 text-center">
        <img
        :src="bookLocal.image"
        alt="Ảnh bìa"
        class="img-thumbnail"
        style="max-height: 200px; object-fit: contain;"
        />
        </div>
    </div>
          
        </div>

        <!-- Nút hành động -->
        <div  class="mt-4 d-flex justify-content-end gap-2">
          <button v-if="!isAddBook()" type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i>
            Lưu
          </button>
          <button v-else type="submit" class="btn btn-success">
            <i class="fa-solid fa-plus"></i>
            Thêm sách
          </button>
          <button type="button" class="btn btn-secondary" @click="Cancel">Hủy</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import nxbService from '@/services/nxb.service';

export default {
  name: 'FormBookInfo',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  $emits: ['submit'],
  props: {
    book: {
      type: Object,
      required:true,
    },
  },
  data() {
    const BookFormSchema = yup.object().shape({
      tensach: yup.string().required('Tên sách là bắt buộc'),
      tacgia: yup.string().required('Tác giả là bắt buộc'),
      dongia: yup.number().required('Đơn giá là bắt buộc').positive('Đơn giá phải là số dương'),
      soquyen: yup.number().required('Số quyển là bắt buộc').integer('Số quyển phải là số nguyên').min(0, 'Số quyển không thể âm'),
      image: yup.string().url('Ảnh bìa phải là một URL hợp lệ')
    });
    return {
        bookLocal: this.book,
        BookFormSchema,
        nxb: []
      }
    },
    methods: {
        handleSubmit() {
            console.log('Submitting book data:', this.bookLocal);
            this.$emit('submit', this.bookLocal);
        },

        Cancel() {
            const reply = confirm("Bạn có chắc muốn huỷ thao tác này không, mọi thay đổi sẽ không được lưu lại");
            if (!reply) {
                return false;
            }
            else {
                this.$router.push({ name: 'Books' });
            }
        },

        getNameNxb(nxbId) {
            const nxb = this.nxb.find(n => n._id === nxbId);
            return nxb ? nxb.tennxb : 'Chưa có thông tin';
        },

        isAddBook() {
            return this.book._id === undefined;
        },

        async getNxbList() {
            try {
                const response = await nxbService.getAllNXB();
                this.nxb = response;
                console.log('NXB list loaded successfully:', this.nxb);
            } catch (error) {
                console.error('Error fetching NXB list:', error);
                this.error = 'Failed to fetch NXB list';
            }
        },
    },
    created() {
        this.getNxbList();

    }

};
</script>
