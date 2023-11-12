<script setup>
import currencyFormater from "@/utils/currencyFormatter";
import { ElNotification } from "element-plus";
import { ref } from "vue";
const visible = ref(false);
const props = defineProps({
    hanghoa: {
        type: Object,
        required: true
    }
});
let donDatHang = JSON.parse(window.localStorage.getItem("donDatHang")) || [];
let posExist = donDatHang.findIndex(element => element.mahanghoa === props.hanghoa._id)
const soluong = ref(posExist !== -1 ? donDatHang[posExist].soluong : 1);

async function addToCart() {
    try {
        if (soluong.value <= props.hanghoa.soluong){
            let donDatHang = JSON.parse(window.localStorage.getItem("donDatHang")) || []; //Gui di
            let userCart = JSON.parse(window.localStorage.getItem("userCart")) || []; //Hien thi
            let posExist = donDatHang.findIndex(element => element.mahanghoa === props.hanghoa._id)
            if (posExist !== -1){
                donDatHang.splice(posExist, 1)
                userCart.splice(posExist, 1)
            }
            donDatHang.push({
                mahanghoa: props.hanghoa._id,
                soluong: soluong.value,
                giagoc: props.hanghoa.gia,
                phantramgiam: props.hanghoa.giamgia,
                giadagiam: (props.hanghoa.gia) * (100 - props.hanghoa.giamgia) / 100,
                thanhtien: ((props.hanghoa.gia) * (100 - props.hanghoa.giamgia) / 100) * soluong.value
            })
            userCart.push({
                mahanghoa: props.hanghoa._id,
                urlhinh: props.hanghoa.urlhinh,
                tenhanghoa: props.hanghoa.tenhanghoa,
                loaihanghoa: props.hanghoa.loaihanghoa,
                soluong: soluong.value,
                soluongkho: props.hanghoa.soluong,
                giagoc: props.hanghoa.gia,
                phantramgiam: props.hanghoa.giamgia,
                giadagiam: (props.hanghoa.gia) * (100 - props.hanghoa.giamgia) / 100,
                thanhtien: ((props.hanghoa.gia) * (100 - props.hanghoa.giamgia) / 100) * soluong.value
            })
            window.localStorage.setItem("donDatHang", JSON.stringify(donDatHang));
            window.localStorage.setItem("userCart", JSON.stringify(userCart));
            ElNotification.success("Thêm vào giỏ hàng thành công");
            visible.value = false;
        }
        else
            ElNotification.error("Số lượng hàng cần đặt lớn hơn số lượng trong kho. Hãy nhập lại !");
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <el-card style="margin: 8px 0;" shadow="hover">
        <div class="">
            <div class="d-flex  mb-3"><img :src="`${hanghoa.urlhinh}`" class="product-img" alt={{hanghoa.tenhanghoa}}></div>
            <h6 style="height: 64px;">{{ hanghoa.tenhanghoa }}</h6>

            <p>Loại: {{ hanghoa.loaihanghoa }}</p>
            <p style="height: 80px;">Mô tả: {{ hanghoa.motahanghoa }}</p>

            <el-divider></el-divider>
            <p v-if="hanghoa.giamgia > 0" style="color: red;">Giảm giá : {{ hanghoa.giamgia }} %</p>
            <p v-else style="color: #fff;  pointer-events: none;">V</p>
            <p>
                <el-icon>
                    <Menu></Menu>
                </el-icon>
                Số lượng trong kho: {{ hanghoa.soluong }}
            </p>

            <p>
                <el-icon>
                    <Money></Money>
                </el-icon>
                Giá: {{ currencyFormater.format(hanghoa.gia) }}
            </p>

            <p v-if="hanghoa.giamgia > 0" style="color: red;">
                Giá đã giảm: {{ currencyFormater.format((hanghoa.gia) * (100 - hanghoa.giamgia) / 100)}}
            </p>
            <p v-else style="color: #fff; pointer-events: none;">
                V
            </p>

            <el-divider></el-divider>

            <el-button type="primary" class="w-100" @click="visible = true">
                Thêm vào giỏ hàng
            </el-button>
        </div>
    </el-card>

    <el-dialog v-model="visible">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">
                    Thêm vào giỏ hàng
                </h4>
            </div>
        </template>

        <h5>{{ hanghoa.tenhanghoa }}</h5>

        <p>
            <el-icon>
                <Menu></Menu>
            </el-icon>
            Số lượng trong kho: {{ hanghoa.soluong }}
        </p>

        <el-input-number placeholder="Số lượng cần đặt" v-model="soluong" :min="1" :max="hanghoa.soluong"></el-input-number>
        <p>
            <el-icon>
                <Money></Money>
            </el-icon>
            Tổng tiền: {{ currencyFormater.format(soluong * ((hanghoa.gia) * (100 - hanghoa.giamgia) / 100)) }}
        </p>
        <template #footer>
            <el-button @click="visible = false">Hủy</el-button>
            <el-button @click="addToCart" type="success">
                Xác nhận thêm vào giỏ hàng
            </el-button>
        </template>
    </el-dialog>
</template>


<style scoped>
.product-img {
    scale: 1;
    max-width: 128px;
    object-fit: cover;
    margin: auto;
    transition: ease-in-out .3s;
    cursor: pointer;
}

.product-img:hover {
    scale: 1.2;
    transition: ease-in-out .3s;
}
</style>