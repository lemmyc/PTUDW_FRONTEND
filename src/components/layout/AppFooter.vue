<script setup>
import Token from "@/utils/token";
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";

// console.log(userStore.currentUser)

</script>
<template>
    <footer class="pb-0">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-3 text-center text-md-left mt-3 mb-2">
                    <h6>DANGLE-PC</h6>
                    <h6>&copy; 2023 All rights reserved.</h6>
                </div>
                <div class="col-12 col-md-3 text-center text-md-left mt-3 mb-2">
                    <h6>Về DANGLE-PC</h6>
                    <ul>
                        <li class="ml-2"><a href="/" style="color:black">Giới thiệu</a></li>
                        <li class="ml-2"><a href="/" style="color:black">Tuyển dụng</a></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3 text-center text-md-left mt-3 mb-2">
                    <h6>Chính sách của DANGLE-PC</h6>
                    <ul>
                        <li class="ml-2"><a href="/" style="color:black">Chính sách bảo hành</a></li>
                        <li class="ml-2"><a href="/" style="color:black">Chính sách thanh toán</a></li>
                        <li class="ml-2"><a href="/" style="color:black">Chính sách bảo mật</a></li>
                        <li class="ml-2"><a href="/" style="color:black">Chính sách giao hàng</a></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3 text-center text-md-left mt-3 mb-2">
                    <h6>Hỗ trợ</h6>
                    <ul>
                        <li class="ml-2">Hotline: <span style="color: #12CBC4">1900.6688</span></li>
                        <li class="ml-2">Tổng đài góp ý: <span style="color: #12CBC4">1900.8866</span></li>
                        <li class="ml-2">Email: <span style="color: #12CBC4">hotro@danglepc.vn</span></li>
                    </ul>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="row align-items-center mb-3">
                <h6>Kết nối với chúng tôi</h6>
                <a href="/" class="ml-3"><img src="@/assets/images/logo_tiktok.webp" alt="TikTok" style="width: 32px;"></a>
                <a href="/" class="ml-3"><img src="@/assets/images/logo_youtube.webp" alt="Youtube" style="width: 32px;"></a>
                <a href="/" class="ml-3 mr-5"><img src="@/assets/images/logo_facebook.webp" alt="TikTok" style="width: 32px;"></a>
                <a href="/" class="ml-5"><img src="@/assets/images/logo_bct.webp" alt="BCT"  style="width: 192px"></a>
            </div>
        </div>
    </footer>
</template>



<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}

.main-header {
    background-color: rgba(0, 0, 0, 0.8);
}

.dialog {
    transition: all 0.1s linear;
}
</style>
