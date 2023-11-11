<script  setup>
import nhanVienService from "@/services/nhanvien.service";
import authService from "@/services/auth.service";
import { useUserStore } from "@/stores/userStore";
import {
	ElNotification
} from "element-plus";
import { reactive, ref } from "vue";

const userStore = useUserStore();

const isLoading = ref(false);

const formRef = ref(null);

const form = reactive({
	hoten: userStore.currentUser.info.hoten || "",
	diachi: userStore.currentUser.info.diachi || "",
	sodienthoai: userStore.currentUser.info.sodienthoai || "",
});

const formRules = reactive({
	hoten: [
		{
			required: true,
			message: "Họ tên là bắt buộc",
		},
	],
	diachi: [
		{
			required: true,
			message: "Địa chỉ là bắt buộc",
		},
	],
	sodienthoai: [
		{
			required: true,
			message: "Số điện thoại là bắt buộc",
		},
	]
});

function editInfo() {
	formRef.value.validate(async (valid) => {
		if (!valid) return;

		try {
			isLoading.value = true;
			await nhanVienService.update(userStore.currentUser.info._id, form);
			ElNotification.success("Thông tin nhân viên cập nhật thành công !");
			const currentUser = await authService.getIdentity();
			userStore.setUser(currentUser);
		} catch (error) {
			ElNotification.error(error);
		} finally {
			isLoading.value = false;
		}
	});
}
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="col col-12">
				<h2 class="mt-4 mb-4">Thông tin Nhân Viên</h2>
			</div>
			<el-form :model="form" :rules="formRules" class="col col-12 row" ref="formRef" label-width="120px"
				label-position="top" status-icon>
				<div class="col col-12">
					<el-form-item label="Họ tên" prop="hoten">
						<el-input placeholder="Họ tên" v-model="form.hoten"></el-input>
					</el-form-item>

					<el-form-item label="Địa chỉ" prop="diachi">
						<el-input placeholder="Địa chỉ" v-model="form.diachi"></el-input>
					</el-form-item>

					<el-form-item label="Số điện thoại" prop="sodienthoai">
						<el-input placeholder="Số điện thoại" v-model="form.sodienthoai"></el-input>
					</el-form-item>
				</div>
				<div class="col col-12">
					<el-button type="primary" :isLoading="isLoading" @click="editInfo">
						Chỉnh sửa thông tin
					</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin-top: 5rem;
}
</style>
