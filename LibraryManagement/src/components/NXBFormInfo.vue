<template>
    <div class="card shadow-sm border-0">
    <div class="card-body px-4 py-4">
      <h4 class="mb-4 text-primary fw-bold text-center">
        Quản lý Nhà xuất bản
      </h4>

      <Form @submit="handleSubmit" :validation-schema="NXBFormSchema" class="p-4 border rounded shadow-sm bg-white">
  <div class="row g-4">
    <!-- Tên NXB -->
    <div class="col-md-6">
      <label for="tennxb" class="form-label fw-semibold">Tên NXB</label>
      <Field
        id="tennxb"
        name="tennxb"
        type="text"
        class="form-control"
        v-model="nxbLocal.tennxb"
        placeholder="Nhập tên nhà xuất bản"
      />
      <ErrorMessage name="tennxb" class="text-danger small" />
    </div>

    <!-- Địa chỉ -->
    <div class="col-md-6">
      <label for="diaChi" class="form-label fw-semibold">Địa chỉ</label>
      <Field
        id="diaChi"
        name="diaChi"
        type="text"
        class="form-control"
        v-model="nxbLocal.diaChi"
        placeholder="Nhập địa chỉ nhà xuất bản"
      />
      <ErrorMessage name="diaChi" class="text-danger small" />
    </div>

    <!-- Nút hành động -->
    <div class="col-12 mt-4 d-flex justify-content-end gap-2">
      <button
        v-if="!isAddNXB()"
        type="submit"
        class="btn btn-primary d-flex align-items-center gap-2"
      >
        <i class="fa-solid fa-floppy-disk"></i>
        Lưu
      </button>
      <button
        v-else
        type="submit"
        class="btn btn-success d-flex align-items-center gap-2"
      >
        <i class="fa-solid fa-plus"></i>
        Thêm NXB
      </button>
      <button type="button" class="btn btn-secondary" @click="Cancel">
        Hủy
      </button>
    </div>
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
      name: 'NXBFormInfo',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  $emits: ['submit'],
  props: {
    nxb: {
      type: Object,
      required:true,
    },
  },
  data() {
    const NXBFormSchema = yup.object().shape({
      tennxb: yup
                .string()
                .required('Tên NXB là bắt buộc')
                .min(2, 'Tên NXB phải có ít nhất 2 ký tự'),
      diaChi: yup
                .string()
                .required('Địa chỉ là bắt buộc')
                .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    });
    return {
      nxbLocal: this.nxb,
       NXBFormSchema,
    };
  },

  methods: {
    handleSubmit() {
        this.$emit('submit', this.nxbLocal);
    },
    Cancel() {
            const reply = confirm("Bạn có chắc muốn huỷ thao tác này không, mọi thay đổi sẽ không được lưu lại");
            if (!reply) {
                return false;
            }
            else {
                this.$router.push({ name: 'NXB' });
            }
    },
      isAddNXB() {
            return this.nxbLocal._id === undefined;
        },
  }
}

</script>
