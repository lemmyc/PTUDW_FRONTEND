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
    // {
    //   path: '/gio-hang',
    //   component: () => import('../views/GioHangView.vue')
    // },
    // {
    //   path: '/hoa-don',
    //   component: () => import('../views/HoaDonView.vue')
    // }
    // ,
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
  ]
})

export default router
