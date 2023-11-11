import { createRouter, createWebHistory } from 'vue-router'
// import authService from "@/services/auth.service";
import { useUserStore } from "@/stores/userStore";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/danh-muc-san-pham',
      component: () => import('../views/DanhMucSanPhamView.vue')
    },
    
    {
      path: '/gio-hang',
      component: () => import('../views/GioHangView.vue')
    },
    {
      path: '/don-dat-hang',
      component: () => import('../views/DonDatHangView.vue')
    },
    {
      path: '/chinh-sua-thong-tin',
      component: () => import('../views/ChinhSuaThongTinView.vue')
    },
    {
      path: '/nhan-vien/chinh-sua-thong-tin',
      component: () => import('../views/NhanVien/ChinhSuaThongTinView.vue')
    },
		{
			path: "/auth/signin",
			component: () => import("@/views/SignInView.vue"),
			beforeEnter() {
				const userStore = useUserStore();

				if (userStore.currentUser) return "/";
			},
		},
		{
			path: "/auth/signup",
			component: () =>
				import("@/views/SignUpView.vue"),
			beforeEnter() {
				const userStore = useUserStore();

				if (userStore.currentUser) return "/";
			},
		},
    {
      path: '/nhan-vien/danh-muc-san-pham',
      component: () =>
				import("../views/NhanVien/DanhMucSanPhamView.vue"),
			beforeEnter() {
				const userStore = useUserStore();

				if (!userStore.currentUser.lanhanvien) return "/";
			},
    },
    {
      path: '/nhan-vien/tiep-nhan-don-hang',
      component: () =>
				import("../views/NhanVien/TiepNhanDonHangView.vue"),
			beforeEnter() {
				const userStore = useUserStore();
				if (!userStore.currentUser.lanhanvien) return "/";
			},
    },
    {
      path: '/nhan-vien/don-hang-da-tiep-nhan',
      component: () =>
				import("../views/NhanVien/DonHangDaTiepNhanView.vue"),
			beforeEnter() {
				const userStore = useUserStore();
				if (!userStore.currentUser.lanhanvien) return "/";
			},
    },
  ]
})

export default router
