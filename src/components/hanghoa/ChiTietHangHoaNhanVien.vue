<script setup>
import currencyFormater from "@/utils/currencyFormatter";
import hangHoaService from "@/services/hanghoa.service";
import { ElNotification } from "element-plus";
import { reactive, ref } from "vue";
const visible = ref(false);
const props = defineProps({
    hanghoa: {
        type: Object,
        required: true
    },
    fetchHangHoa: Function
});
const formRef = ref(null);

const form = reactive({
    tenhanghoa: props.hanghoa.tenhanghoa || "",
    loaihanghoa: props.hanghoa.loaihanghoa || "",
    urlhinh: props.hanghoa.urlhinh || "",
    motahanghoa: props.hanghoa.motahanghoa || "",
    soluong: props.hanghoa.soluong || 1,
    gia: props.hanghoa.gia || 1,
    giamgia: props.hanghoa.giamgia || 0,
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

async function editItem() {
    try {
		await hangHoaService.update(props.hanghoa._id, form);
		ElNotification.success("Thông tin hàng hóa cập nhật thành công !");
        props.fetchHangHoa();
        visible.value = false;
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <el-card shadow="hover">
        <div class="">
            <div class="d-flex"><img :src="`${hanghoa.urlhinh}`" class="product-img" alt={{hanghoa.tenhanghoa}}></div>
            <h6 style="height: 48px;">{{ hanghoa.tenhanghoa }}</h6>

            <p>Loại: {{ hanghoa.loaihanghoa }}</p>

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
                Giá đã giảm: {{ currencyFormater.format((hanghoa.gia) * (100 - hanghoa.giamgia) / 100) }}
            </p>
            <p v-else style="color: #fff; pointer-events: none;">
                V
            </p>

            <el-divider></el-divider>

            <el-button type="warning" class="w-100" @click="visible = true">
                Chỉnh sửa hàng hóa
            </el-button>
        </div>
    </el-card>

    <el-dialog v-model="visible">
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h4 :id="titleId" :class="titleClass">
                    Chỉnh sửa thông tin hàng hóa
                </h4>
            </div>
        </template>

        <el-form :model="form" :rules="formRules" class="row justify-content-between" ref="formRef"
            label-width="120px" label-position="top" status-icon>
            <el-form-item class="w-25 m-2" label="Tên hàng hóa" prop="tenhanghoa">
                <el-input placeholder="Tên hàng hóa" v-model="form.tenhanghoa"></el-input>
            </el-form-item>
            <el-form-item class="w-25 m-2"  label="Loại hàng hóa" prop="loaihanghoa">
                <el-input placeholder="Loại hàng hóa" v-model="form.loaihanghoa"></el-input>
            </el-form-item>
            
            
            <el-form-item class="w-25 m-2"  label="Số lượng hàng hóa" prop="soluong">
                <el-input placeholder="Số lượng hàng hóa" v-model="form.soluong"></el-input>
            </el-form-item>
            <el-form-item class="w-25 m-2"  label="Giá hàng hóa" prop="gia">
                <el-input placeholder="Giá hàng hóa" v-model="form.gia"></el-input>
            </el-form-item>
            <el-form-item class="w-25 m-2"  label="Phần trăm giảm giá" prop="giamgia">
                <el-input placeholder="Phần trăm giảm giá" v-model="form.giamgia"></el-input>
            </el-form-item>
            <el-form-item class="w-25 m-2"  label="Ghi chú nội bộ của hàng hóa" prop="mota">
                <el-input placeholder="Ghi chú nội bộ của hàng hóa" v-model="form.mota"></el-input>
            </el-form-item>
            <el-form-item class="w-100 m-2"  label="Mô tả hàng hóa" prop="motahanghoa">
                <el-input placeholder="Mô tả hàng hóa" v-model="form.motahanghoa"></el-input>
            </el-form-item>
            <el-form-item class="w-100 m-2"  label="URL ảnh hàng hóa" prop="urlhinh">
                <el-input placeholder="URL ảnh hàng hóa" v-model="form.urlhinh"></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <el-button @click="visible = false">Hủy</el-button>
            <el-button @click="editItem" type="success">
                Chỉnh sửa hàng hóa
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