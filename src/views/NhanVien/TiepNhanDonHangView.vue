<script setup>
import { ref, onMounted } from "vue";
import donDatHangService from "@/services/dondathang.service";
import hangHoaService from "@/services/hanghoa.service";
import khachHangService from "@/services/khachhang.service";
import { useUserStore } from "@/stores/userStore";
import currencyFormater from "@/utils/currencyFormatter";
import {
	Edit
} from '@element-plus/icons-vue';

import { ElNotification } from "element-plus";
const userStore = useUserStore();
const dsDonDatHang = ref([]);
const dsHangHoa = ref([]);
const dsKhachHang = ref([]);
const xacNhanTiepNhanVisible = ref(false);
const currentIDDonDatHang = ref("");
const currentDSHangHoa = ref([]);

function formatDate(dateTimeStr) {
	const date = new Date(dateTimeStr);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}
//userStore.currentUser.info._id
async function fetchDonDatHang(query = '') {
	donDatHangService.getByQuery(query)
		.then(res => {
			let _data = res.data.filter(item => item.manhanvien === null);
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
async function tiepNhanDonHang() {
	let payload = {
		"madondathang":currentIDDonDatHang.value,
    	"manhanvien": userStore.currentUser.info._id
	};
	await donDatHangService.confirm(payload);
	fetchDonDatHang();
	xacNhanTiepNhanVisible.value = false;
	ElNotification.success("Tiếp nhận đơn hàng thành công.");

}
onMounted(() => {
	if (userStore.currentUser){
		fetchDonDatHang();
		fetchHangHoa();
		fetchKhachHang();
	}
		
});
</script>

<template>
	<div>
		<div class="container" v-if="!userStore.currentUser">
			<h2 style="padding: 20px 0">Bạn cần đăng nhập để sử dụng chức năng này</h2>
		</div>
		<div class="container" v-else>
			<h5 style="padding: 10px 0">Danh sách đơn đặt hàng</h5>
			<h5 style="padding: 10px 0">Nhân viên: <strong>{{ userStore.currentUser.info.hoten }}</strong></h5>

			<h5 class="text-center" v-if="dsDonDatHang.length === 0">Tất cả đơn hàng đã được tiếp nhận. DANGLE-PC MÃI ĐỈNH
				^^</h5>

			<div class="container" v-else>
				<el-table :data="dsDonDatHang" border>

					<el-table-column prop="" label="STT" align="center" width="64">
						<template v-slot="scope">
							{{ scope.$index + 1 }}
						</template>
					</el-table-column>
					<el-table-column prop="danhsachhanghoa" label="Sản phẩm đã mua" align="center">
						<template v-slot="scope">
							<ul>
								<li v-for="(item, index) in scope.row.danhsachhanghoa" v-bind:key="index">
									{{ dsHangHoa.find((element) => element._id === item.mahanghoa)?.tenhanghoa }} -
									x{{ item.soluong }}
								</li>
							</ul>
						</template>
					</el-table-column>
					<el-table-column prop="ngaydh" label="Ngày lập đơn đặt hàng" align="center">
						<template v-slot="scope">
							{{ formatDate(scope.row.ngaydh) }}
						</template>
					</el-table-column>
					<el-table-column prop="ngaygh" label="Ngày giao hàng chỉ định" align="center">
						<template v-slot="scope">
							{{ scope.row.ngaygh ? formatDate(scope.row.ngaygh) : "(sớm nhất có thể)" }}
						</template>
					</el-table-column>
					<el-table-column prop="tongtien" label="Tổng giá trị hóa đơn" header-align="center" align="right">
						<template v-slot="scope">
							{{ currencyFormater.format(scope.row.tongtien) }}
						</template>
					</el-table-column>
					<el-table-column prop="makhachhang" label="Tên Khách hàng" header-align="center" align="right">
						<template v-slot="scope">
							{{ scope.row.makhachhang ? dsKhachHang.find((element) => element._id ===
								scope.row.makhachhang)?.hoten : "Nguyễn Khách Hàng" }}
						</template>
					</el-table-column>
					<el-table-column prop="" label="Thao tác" align="center">
						<template v-slot="scope">
							<el-button type="primary" :icon="Edit"
								@click="xacNhanTiepNhanVisible = true; currentDSHangHoa.value = scope.row.danhsachhanghoa;
								currentIDDonDatHang = scope.row._id">
								Tiếp nhận
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<el-dialog v-model="xacNhanTiepNhanVisible">
					<template #header="{ titleId, titleClass }">
						<div class="my-header">
							<h4 :id="titleId" :class="titleClass">
								Xác nhận tiếp nhận đơn hàng
							</h4>
						</div>
					</template>

					<h5>Sản phẩm</h5>
					<div>
						<h6 v-for="(item, index) in currentDSHangHoa.value" v-bind:key="index">
							{{ dsHangHoa.find((element) => element._id === item.mahanghoa)?.tenhanghoa }} - x{{ item.soluong
							}}
						</h6>
					</div>


					<h5 class="mt-3">Đồng ý tiếp nhận đơn hàng ?</h5>

					<template #footer>
						<el-button @click="xacNhanTiepNhanVisible = false">Hủy</el-button>
						<el-button @click="tiepNhanDonHang" type="primary">
							Tiếp nhận đơn hàng
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
