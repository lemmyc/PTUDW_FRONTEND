<script setup>
import { ref, onMounted, reactive } from "vue";
import hangHoaService from "@/services/hanghoa.service";
import chiTietHangHoaNhanVien from "@/components/hanghoa/ChiTietHangHoaNhanVien.vue";
import { useUserStore } from "@/stores/userStore";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const dsHangHoa = ref([]);
const _tenhanghoa = ref("");
const visible = ref(false);
const formRef = ref(null);

const form = reactive({
	tenhanghoa: "",
	loaihanghoa: "",
	urlhinh: "",
	motahanghoa: "",
	soluong: 1,
	gia: 1,
	giamgia: 0,
	ghichu: ""
});

const formRules = reactive({
	tenhanghoa: [
		{
			required: true,
			message: "Tên hàng hóa là bắt buộc",
		},
	],
	loaihanghoa: [
		{
			required: true,
			message: "Loại hàng hóa là bắt buộc",
		},
	],
	urlhinh: [
		{
			required: true,
			message: "URL của hình là bắt buộc",
		},
	],
	motahanghoa: [
		{
			required: true,
			message: "Mô tả là bắt buộc",
		},
	],
	soluong: [
		{
			required: true,
			message: "Số lượng trong kho là bắt buộc",
		},
	],
	gia: [
		{
			required: true,
			message: "Giá là bắt buộc",
		},
	],
	giamgia: [
		{
			required: true,
			message: "Giảm giá là bắt buộc",
		},
	],

});

function resetAddItemForm() {
	form.value = {
		tenhanghoa: "",
		loaihanghoa: "",
		urlhinh: "",
		motahanghoa: "",
		soluong: 1,
		gia: 1,
		giamgia: 0,
		ghichu: ""
	}
}

async function fetchHangHoa(query = '') {
	hangHoaService.getByQuery(query)
		.then(res => {
			dsHangHoa.value = res.data;
		})
		.catch((error) => {
			console.log(error)
		});
}

async function timHangHoa() {
	let query = `?term=${_tenhanghoa.value}&searchBy=tenhanghoa`;
	await fetchHangHoa(query);
}
async function resetTimKiem() {
	let query = `?term=&searchBy=tenhanghoa`;
	_tenhanghoa.value = ""
	await fetchHangHoa(query);
}

async function addItem() {
	formRef.value.validate(async (valid) => {
		if (!valid) return;

		try {
			await hangHoaService.create(form);
			ElNotification.success("Thêm hàng hóa thành công !");
			fetchHangHoa();
			resetAddItemForm();
			visible.value = false;
		} catch (error) {
			ElNotification.error(error.response.data.msg);
		}
	});
};

onMounted(() => {
	if (userStore.currentUser)
		fetchHangHoa();
});
</script>

<template>
	<div>
		<div class="container" v-if="!userStore.currentUser">
			<h2 style="padding: 20px 0">Bạn cần đăng nhập để sử dụng chức năng này</h2>
		</div>
		<div class="container" v-else>
			<h2 style="padding: 20px 0">Danh mục sản phẩm dành cho Nhân Viên</h2>
			<div class="row justify-content-center  mt-3 mb-3">
				<el-input class="col-6" placeholder="Tên sản phẩm cần tìm kiếm" v-model="_tenhanghoa"></el-input>
				<el-button class="col-1" type="primary" @click="timHangHoa">
					Tìm kiếm
				</el-button>
				<el-button class="col-1" @click="resetTimKiem">
					Đặt lại
				</el-button>
				<el-button type="success" @click="visible = true">
					Thêm một sản phẩm
				</el-button>
			</div>
			<div class="row">
				<div class="col col-12 col-md-6 col-lg-3 justify-content-around" v-for="hh in dsHangHoa" :key="hh._id">
					<chi-tiet-hang-hoa-nhan-vien :hanghoa="hh" :fetch-hang-hoa="fetchHangHoa"></chi-tiet-hang-hoa-nhan-vien>
				</div>
			</div>
			<el-dialog v-model="visible">
				<template #header="{ titleId, titleClass }">
					<div class="my-header">
						<h4 :id="titleId" :class="titleClass">
							Thêm sản phẩm vào danh mục
						</h4>
					</div>
				</template>

				<el-form :model="form" :rules="formRules" class="row justify-content-between" ref="formRef"
					label-width="120px" label-position="top" status-icon>
					<el-form-item class="w-25 m-2" label="Tên hàng hóa" prop="tenhanghoa">
						<el-input placeholder="Tên hàng hóa" v-model="form.tenhanghoa"></el-input>
					</el-form-item>
					<el-form-item class="w-25 m-2" label="Loại hàng hóa" prop="loaihanghoa">
						<el-input placeholder="Loại hàng hóa" v-model="form.loaihanghoa"></el-input>
					</el-form-item>


					<el-form-item class="w-25 m-2" label="Số lượng hàng hóa" prop="soluong">
						<el-input placeholder="Số lượng hàng hóa" v-model="form.soluong"></el-input>
					</el-form-item>
					<el-form-item class="w-25 m-2" label="Giá hàng hóa" prop="gia">
						<el-input placeholder="Giá hàng hóa" v-model="form.gia"></el-input>
					</el-form-item>
					<el-form-item class="w-25 m-2" label="Phần trăm giảm giá" prop="giamgia">
						<el-input placeholder="Phần trăm giảm giá" v-model="form.giamgia"></el-input>
					</el-form-item>
					<el-form-item class="w-25 m-2" label="Ghi chú cho hàng hóa" prop="ghichu">
						<el-input placeholder="Ghi chú cho hàng hóa" v-model="form.ghichu"></el-input>
					</el-form-item>
					<el-form-item class="w-100 m-2" label="Mô tả hàng hóa" prop="motahanghoa">
						<el-input placeholder="Mô tả hàng hóa" v-model="form.motahanghoa"></el-input>
					</el-form-item>
					<el-form-item class="w-100 m-2" label="URL ảnh hàng hóa" prop="urlhinh">
						<el-input placeholder="URL ảnh hàng hóa" v-model="form.urlhinh"></el-input>
					</el-form-item>
				</el-form>

				<template #footer>
					<el-button @click="visible = false">Hủy</el-button>
					<el-button @click="addItem" type="success">
						Thêm hàng hóa
					</el-button>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin-top: 5rem;
}
</style>
