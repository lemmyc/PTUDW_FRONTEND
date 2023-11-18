<script setup>
import { ref, onMounted, toRaw } from "vue";
import currencyFormater from "@/utils/currencyFormatter";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores/userStore.js";
import donDatHangService from "@/services/dondathang.service";

import {
	Delete,
	Check
} from '@element-plus/icons-vue'
const userCart = ref([]);
const donDatHang = ref([]);
const xoaHangHoaModalVisible = ref(false);
const donDathangVisible = ref(false);
const currentHangHoa = ref({})
const tenHangHoaSeXoa = ref("")
const tongTien = ref(0);

const ngaygh = ref("")


const userStore = useUserStore();
function formatDateTime(dateTimeStr) {
	const date = new Date(dateTimeStr);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

async function xoaHangHoa() {
	// eslint-disable-next-line vue/no-ref-as-operand
	let _hangHoa = currentHangHoa?._rawValue.value
	let _donDatHang = JSON.parse(window.localStorage.getItem("donDatHang")) || []; //Gui di
	let _userCart = JSON.parse(window.localStorage.getItem("userCart")) || []; //Hien thi
	let posExist = _donDatHang.findIndex(element => element.mahanghoa === _hangHoa.mahanghoa)
	if (posExist !== -1) {
		_donDatHang.splice(posExist, 1)
		_userCart.splice(posExist, 1)
	}
	window.localStorage.setItem("donDatHang", JSON.stringify(_donDatHang));
	window.localStorage.setItem("userCart", JSON.stringify(_userCart));
	userCart.value = _userCart;
	donDatHang.value = _donDatHang;
	ElNotification.success("Xóa hàng hóa khỏi giỏ hàng thành công");
	xoaHangHoaModalVisible.value = false;
}

async function themDonDatHang() {

	try {
		let payload = {
			"makhachhang": userStore.currentUser.info._id,
			"manhanvien": null,
			"ngaydh": (new Date()).toJSON(),
			"ngaygh": ngaygh.value === "" ? null : (ngaygh.value).toJSON(),

			// eslint-disable-next-line vue/no-ref-as-operand
			"danhsachhanghoa": donDatHang?._rawValue,
			"tongtien": tongTien.value
		}

		if(
			// ms -> day
			(((new Date(payload.ngaygh)) - (new Date(payload.ngaydh)))
			/ (1000 * 60 * 60 * 24)) >= 5 
		){
			await donDatHangService.create(payload);
			ElNotification.success("Tạo đơn đặt hàng thành công. Cảm ơn quý khách đã ủng hộ DANGLE-PC");
			userCart.value = [];
			donDatHang.value = [];
			window.localStorage.setItem("userCart", JSON.stringify([]));
			window.localStorage.setItem("donDatHang", JSON.stringify([]));
			donDathangVisible.value = false;
		}
		else{
			ElNotification.error("Ngày giao hàng chỉ định phải sau ngày đặt hàng tối thiểu 5 ngày.");
		}

	} catch (error) {
		ElNotification.error(error);
	}

}
onMounted(() => {
	const storedUserCart = window.localStorage.getItem("userCart");
	const storedDonDatHang = window.localStorage.getItem("donDatHang");
	if (storedUserCart) {
		userCart.value = JSON.parse(storedUserCart);
	}
	if (storedDonDatHang) {
		donDatHang.value = JSON.parse(storedDonDatHang);
	}
	if (donDatHang.value.length > 0) {
		let dsHangHoa = toRaw(donDatHang.value);
		for (let hangHoa of dsHangHoa) {
			tongTien.value += hangHoa.thanhtien
		}
	}
});
</script>

<template>
	<div>
		<div class="container" v-if="userCart.length === 0">
			<h5 style="padding: 20px 0">Giỏ hàng của bạn đang trống</h5>
			<h5>Hãy bắt đầu bằng việc thêm một món đồ vào giỏ hàng</h5>

			<h5 class="mt-5">
				<router-link to="/danh-muc-san-pham">
					<el-icon>
						<Shop />
					</el-icon>
					Xem danh mục sản phẩm
				</router-link>
			</h5>

		</div>
		<div class="container" v-else>
			<h2 style="padding: 20px 0">Giỏ hàng</h2>


			<h5>Chỉ định ngày giao hàng cụ thể (bỏ trống nếu muốn giao sớm nhất có thể)</h5>
			<el-date-picker class="m-3" v-model="ngaygh" type="date" placeholder="Ngày giờ giao hàng chỉ định" />
			<el-button type="success" :icon="Check" @click="donDathangVisible = true"> Hoàn tất đơn đặt hàng</el-button>
			<h5><b>Tổng tiền: {{ currencyFormater.format(tongTien) }}</b></h5>


			<el-table :data="userCart" border style="word-break: normal;">
				<el-table-column prop="urlhinh" label="Hình ảnh" align="center">
					<template v-slot="scope">
						<img :src="scope.row.urlhinh" style="max-width: 64px; object-fit: cover;" />
					</template>
				</el-table-column>
				<el-table-column prop="tenhanghoa" label="Tên hàng hóa" align="center" />
				<el-table-column prop="loaihanghoa" label="Loại hàng hóa" align="center" />
				<el-table-column prop="giagoc" label="Giá gốc" header-align="center" align="right">
					<template v-slot="scope">
						{{ currencyFormater.format(scope.row.giagoc) }}
					</template>
				</el-table-column>
				<el-table-column prop="soluong" label="Số lượng" header-align="center" align="right">
					<template v-slot="scope"><el-input-number placeholder="Số lượng cần đặt" v-model="scope.row.soluong"
							:min="1" :max="scope.row.soluongkho" controls-position="right" size="large"
							style="width: 80px;"></el-input-number></template>
				</el-table-column>
				<el-table-column prop="phantramgiam" label="Phần trăm giảm" header-align="center" align="right">
					<template v-slot="scope">
						{{ scope.row.phantramgiam }} %
					</template>
				</el-table-column>
				<el-table-column prop="giadagiam" label="Giá đã giảm" header-align="center" align="right">
					<template v-slot="scope">
						{{ currencyFormater.format(scope.row.giadagiam) }}
					</template>
				</el-table-column>
				<el-table-column prop="thanhtien" label="Thành tiền" header-align="center" align="right">
					<template v-slot="scope">
						{{ currencyFormater.format(scope.row.giadagiam * scope.row.soluong) }}
					</template>
				</el-table-column>
				<el-table-column prop="" label="Thao tác" align="center">
					<template v-slot="scope">
						<el-button type="danger" :icon="Delete" circle
							@click="xoaHangHoaModalVisible = true; currentHangHoa.value = scope.row; tenHangHoaSeXoa = scope.row.tenhanghoa" />
					</template>
				</el-table-column>
			</el-table>

		</div>

		<el-dialog v-model="xoaHangHoaModalVisible">
			<template #header="{ titleId, titleClass }">
				<div class="my-header">
					<h4 :id="titleId" :class="titleClass">
						Xác nhận xóa
					</h4>
				</div>
			</template>
			<h5><em>{{ tenHangHoaSeXoa }}</em> sẽ bị xóa khỏi giỏ hàng</h5>
			<h5>Bạn chắc chứ ?</h5>

			<template #footer>
				<el-button @click="xoaHangHoaModalVisible = false">Hủy</el-button>
				<el-button @click="xoaHangHoa" type="danger">
					Đúng, hãy xóa nó
				</el-button>
			</template>
		</el-dialog>

		<el-dialog v-model="donDathangVisible">
			<template #header="{ titleId, titleClass }">
				<div class="my-header">
					<p :id="titleId" :class="titleClass" style="font-size: 24px;">
						<strong>Xác nhận giỏ hàng và tạo đơn đặt hàng</strong>
					</p>
				</div>
			</template>
			<h5 class="m-1">Tên khách hàng: <strong>{{ userStore.currentUser.info.hoten }}</strong></h5>
			<h5 class="m-1">Số điện thoại: <strong>{{ userStore.currentUser.info.sodienthoai }}</strong></h5>
			<h5 class="m-1">Địa chỉ giao hàng: <strong>{{ userStore.currentUser.info.diachi }}</strong></h5>
			<h5 class="m-1">Ngày giao hàng chỉ định: <strong>{{ ngaygh ? formatDateTime(ngaygh) : "(sớm nhất có thể)"
			}}</strong></h5>
			<h5 class="m-1">Tổng số tiền của hóa đơn: <strong>{{ currencyFormater.format(tongTien) }}</strong></h5>

			<h5 class="mt-3">Vui lòng kiểm tra lại các thông tin giao hàng và ấn "Đặt hàng" khi hoàn tất.</h5>

			<template #footer>
				<el-button @click="donDathangVisible = false" size="large">Hủy</el-button>
				<el-button @click="themDonDatHang" type="success" size="large">
					Đặt hàng
				</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped>
.container {
	margin-top: 5rem;
}
</style>
