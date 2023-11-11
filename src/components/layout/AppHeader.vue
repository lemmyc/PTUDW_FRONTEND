<script setup>
import Token from "@/utils/token";
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";

const router = useRouter();

const userStore = useUserStore();
// console.log(userStore.currentUser)
const logout = () => {
    Token.token = null;
    userStore.setUser(null);
    router.push("/");
};
</script>
<template>
    <header class="header-area header-sticky" :style="{
        background:
            $route.path !== '/' ? '#444' : '#ffffff10',
    }">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <nav class="main-nav">
                        <router-link to="/" class="logo"><em>DANGLE-PC</em></router-link>
                        <ul class="nav">
                            <li class="scroll-to-section">
                                <router-link to="/">Trang chủ</router-link>
                            </li>

                            <li class="scroll-to-section" v-if="userStore.currentUser?.lakhachhang">
                                <router-link to="/danh-muc-san-pham">Danh mục sản phẩm</router-link>
                            </li>

                            <li class="scroll-to-section" v-if="userStore.currentUser?.lanhanvien">
                                <router-link to="/nhan-vien/danh-muc-san-pham">Danh mục sản phẩm (NV)</router-link>
                            </li>

                            <li v-if="userStore.currentUser?.lakhachhang" class="scroll-to-section">
                                <router-link to="/gio-hang">Giỏ hàng</router-link>
                            </li>

                            <li v-if="userStore.currentUser?.lanhanvien" class="scroll-to-section">
                                <router-link to="/nhan-vien/tiep-nhan-don-hang">Tiếp nhận đơn hàng</router-link>
                            </li>

                            <el-dropdown trigger="click" v-if="userStore.currentUser">
                                <el-button icon="arrow-down">
                                    {{ userStore.currentUser.info.hoten }}
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>

                                        <router-link v-if="userStore.currentUser?.lakhachhang" to="/don-dat-hang">
                                            <el-dropdown-item>
                                                Đơn đặt hàng
                                            </el-dropdown-item>
                                        </router-link>
                                        <router-link v-if="userStore.currentUser?.lakhachhang" to="/chinh-sua-thong-tin">
                                            <el-dropdown-item>
                                                Thông tin cá nhân
                                            </el-dropdown-item>
                                        </router-link>

                                        <router-link v-if="userStore.currentUser?.lanhanvien" to="/nhan-vien/don-hang-da-tiep-nhan">
                                            <el-dropdown-item>
                                                Đơn đã tiếp nhận
                                            </el-dropdown-item>
                                        </router-link>
                                        <router-link v-if="userStore.currentUser?.lanhanvien" to="/nhan-vien/chinh-sua-thong-tin">
                                            <el-dropdown-item>
                                                Thông tin cá nhân
                                            </el-dropdown-item>
                                        </router-link>

                                        <el-dropdown-item @click="logout">
                                            Đăng xuất
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>

                            <li v-if="!userStore.currentUser" class="scroll-to-section">
                                <router-link to="/auth/signin">
                                    Đăng nhập
                                </router-link>
                            </li>
                            <li v-if="!userStore.currentUser" class="main-button">
                                <router-link to="/auth/signup">
                                    Đăng ký
                                </router-link>
                            </li>
                        </ul>
                        <a class="menu-trigger">
                            <span>Menu</span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </header>
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
