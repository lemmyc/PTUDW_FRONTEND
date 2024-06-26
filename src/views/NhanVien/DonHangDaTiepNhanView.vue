<script setup>
import { ref, onMounted } from "vue";
import donDatHangService from "@/services/dondathang.service";
import hangHoaService from "@/services/hanghoa.service";
import khachHangService from "@/services/khachhang.service";
import { useUserStore } from "@/stores/userStore";
import currencyFormater from "@/utils/currencyFormatter";
import {
	ElNotification
} from "element-plus";


const userStore = useUserStore();
const dsDonDatHang = ref([]);
const dsHangHoa = ref([]);
const dsKhachHang = ref([]);
const xacNhanGiaoHangVisible = ref(false);
const currentDonDatHang = ref({});


function formatDate(dateTimeStr) {
	const date = new Date(dateTimeStr);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

async function fetchDonDatHang(query = '') {
	donDatHangService.getByQuery(query)
		.then(res => {
			let _data = res.data.filter(item => item.manhanvien === userStore.currentUser.info._id);
			dsDonDatHang.value = [..._data]
		})
		.catch((error) => {
			console.log(error)
		});
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
async function fetchKhachHang(query = '') {
	khachHangService.getByQuery(query)
		.then(res => {
			dsKhachHang.value = res.data;
		})
		.catch((error) => {
			console.log(error)
		});
}

async function xacNhanGiaoHang() {
	try {
		let payload = {
			trangthaigh: "true"
		}
		await donDatHangService.update(currentDonDatHang._rawValue.value._id, payload)
		ElNotification.success("Trạng thái giao hàng cập nhật thành công !");
		xacNhanGiaoHangVisible.value = false;
		fetchDonDatHang();
	} catch (error) {
		ElNotification.error(error);
	}
}

onMounted(() => {
	if (userStore.currentUser)
		fetchDonDatHang();
	fetchHangHoa();
	fetchKhachHang();
});
</script>

<template>
	<div>
		<div class="container" v-if="!userStore.currentUser">
			<h2 style="padding: 20px 0">Bạn cần đăng nhập để sử dụng chức năng này</h2>
		</div>
		<div class="container" v-else>
			<h5 style="padding: 10px 0">Danh sách đơn đặt hàng đã tiếp nhận</h5>
			<h5 style="padding: 10px 0">Nhân viên: <strong>{{ userStore.currentUser.info.hoten }}</strong></h5>

			<h5 class="text-center" v-if="dsDonDatHang.length === 0">(bạn chưa tiếp nhận đơn đặt hàng nào)</h5>

			<div v-else>
				<el-table :data="dsDonDatHang" border>

					<el-table-column prop="" label="STT" align="center" width="64">
						<template v-slot="scope">
							{{ scope.$index + 1 }}
						</template>
					</el-table-column>
					<el-table-column prop="danhsachhanghoa" label="Sản phẩm của đơn hàng" align="center">
						<template v-slot="scope">
							<ul>
								<li v-for="(item, index) in scope.row.danhsachhanghoa" v-bind:key="index">
									{{ dsHangHoa.find((element) => element._id === item.mahanghoa)?.tenhanghoa }} -
									x{{ item.soluong }}
								</li>
							</ul>
						</template>
					</el-table-column>
					<el-table-column prop="ngaydh" label="Ngày lập đơn đặt hàng" align="center" width="128">
						<template v-slot="scope">
							{{ formatDate(scope.row.ngaydh) }}
						</template>
					</el-table-column>
					<el-table-column prop="ngaygh" label="Ngày giao hàng chỉ định" align="center" width="150">
						<template v-slot="scope">
							{{ scope.row.ngaygh ? formatDate(scope.row.ngaygh) : "(sớm nhất có thể)" }}
						</template>
					</el-table-column>
					<el-table-column prop="tongtien" label="Tổng giá trị hóa đơn" header-align="center" align="right">
						<template v-slot="scope">
							{{ currencyFormater.format(scope.row.tongtien) }}
						</template>
					</el-table-column>
					<el-table-column prop="makhachhang" label="Khách hàng" align="center">
						<template v-slot="scope">
							{{ scope.row.makhachhang ? dsKhachHang.find((element) => element._id ===
								scope.row.makhachhang)?.hoten : "(đơn hàng chưa được tiếp nhận)" }}
						</template>
					</el-table-column>
					<el-table-column prop="trangthaigh" label="Trạng thái giao hàng" align="center" width="128">
						<template v-slot="scope">
							{{ scope.row.trangthaigh === false ? "Chưa giao hàng" : "Đã giao hàng" }}
						</template>
					</el-table-column>

					<el-table-column prop="capnhatgh" label="Cập nhật trạng thái giao hàng" align="center">
						<template v-slot="scope">
							<el-button v-if="scope.row.trangthaigh === false" type="success"
								@click="xacNhanGiaoHangVisible = true; currentDonDatHang.value = scope.row">
								Đã giao hàng
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<el-dialog v-model="xacNhanGiaoHangVisible">
					<template #header="{ titleId, titleClass }">
						<div class="my-header">
							<h4 :id="titleId" :class="titleClass">
								Xác nhận đã giao hàng
							</h4>
						</div>
					</template>
					<h5 class="mt-1 mb-1">Khách hàng: <b>{{ dsKhachHang.find((element) => element._id ===
						currentDonDatHang.value.makhachhang)?.hoten }}</b>, có danh sách hàng hóa: </h5>
					<ul>
						<h5 v-for="(item, index) in currentDonDatHang.value.danhsachhanghoa" v-bind:key="index">
							{{ dsHangHoa.find((element) => element._id === item.mahanghoa)?.tenhanghoa }} -
							x{{ item.soluong }}
						</h5>
					</ul>
					<h5>Bạn chắc chứ ?</h5>

					<template #footer>
						<el-button @click="xacNhanGiaoHangVisible = false">Hủy</el-button>
						<el-button @click="xacNhanGiaoHang" type="success">
							Đúng, đơn hàng đã được giao
						</el-button>
					</template>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin-top: 5rem;
}
</style>
