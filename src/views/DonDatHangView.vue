<script setup>
import { ref, onMounted } from "vue";
import donDatHangService from "@/services/dondathang.service";
import hangHoaService from "@/services/hanghoa.service";
import nhanVienService from "@/services/nhanvien.service";
import { useUserStore } from "@/stores/userStore";
import currencyFormater from "@/utils/currencyFormatter";

const userStore = useUserStore();
const dsDonDatHang = ref([]);
const dsHangHoa = ref([]);
const dsNhanVien = ref([]);


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
			let _data = res.data.filter(item => item.makhachhang === userStore.currentUser.info._id);
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
async function fetchNhanVien(query = '') {
	nhanVienService.getByQuery(query)
		.then(res => {
			dsNhanVien.value = res.data;
			// console.log(dsNhanVien)
		})
		.catch((error) => {
			console.log(error)
		});
}

onMounted(() => {
	if (userStore.currentUser)
		fetchDonDatHang();
	fetchHangHoa();
	fetchNhanVien();
});
</script>

<template>
	<div>
		<div class="container" v-if="!userStore.currentUser">
			<h2 style="padding: 20px 0">Bạn cần đăng nhập để sử dụng chức năng này</h2>
		</div>
		<div class="container" v-else>
			<h5 style="padding: 10px 0">Danh sách đơn đặt hàng</h5>
			<h5 style="padding: 10px 0">Khách hàng: <strong>{{ userStore.currentUser.info.hoten }}</strong></h5>

			<h5 class="text-center" v-if="dsDonDatHang.length === 0">(bạn không có đơn đặt hàng nào)</h5>

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
					<el-table-column prop="manhanvien" label="Nhân viên tiếp nhận" header-align="center" align="right">
						<template v-slot="scope">
							{{ scope.row.manhanvien ? dsNhanVien.find((element) => element._id ===
								scope.row.manhanvien)?.hoten : "(đơn hàng chưa được tiếp nhận)" }}
						</template>
					</el-table-column>
					<el-table-column prop="trangthaigh" label="Trạng thái giao hàng" header-align="center" align="right">
						<template v-slot="scope">
							{{ scope.row.trangthaigh === false ? "Chưa giao hàng" : "Đã giao hàng" }}
						</template>
					</el-table-column>
				</el-table>
			</div>

			<h6 class="mt-3">LƯU Ý: Bạn không thể xóa đơn hàng đã đặt. Hãy vui lòng liên hệ nhân viên theo số
				hotline <strong><em>1900 6688</em></strong> để được giải quyết !</h6>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin-top: 5rem;
}
</style>
