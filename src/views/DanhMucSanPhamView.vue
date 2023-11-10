<script setup>
import { ref, onMounted } from "vue";
import hangHoaService from "@/services/hanghoa.service";
import chiTietHangHoa from "@/components/hanghoa/ChiTietHangHoa.vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const dsHangHoa = ref([]);
const _tenhanghoa = ref("");

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

onMounted(() => {
    fetchHangHoa(); 
});
</script>

<template>
	<div>
		<div class="container" v-if="!userStore.currentUser">
			<h2 style="padding: 20px 0">Bạn cần đăng nhập để sử dụng chức năng này</h2>
		</div>
		<div class="container" v-else>
			<h2 style="padding: 20px 0">Danh mục sản phẩm</h2>
			<div class="row justify-content-center  mt-3 mb-3">
				<el-input class="col-6" placeholder="Tên sản phẩm cần tìm kiếm" v-model="_tenhanghoa"></el-input>
				<el-button class="col-1" type="primary" @click="timHangHoa">
					Tìm kiếm
				</el-button>
				<el-button class="col-1"  @click="resetTimKiem">
					Đặt lại
				</el-button>
			</div>
			<div class="row">
				<div class="col col-12 col-md-6 col-lg-3" v-for="hh in dsHangHoa" :key="hh._id">
					<chi-tiet-hang-hoa :hanghoa="hh"></chi-tiet-hang-hoa>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container {
	margin-top: 5rem;
}
</style>
