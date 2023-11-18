<script  setup>
import authService from "@/services/auth.service";
import { useUserStore } from "@/stores/userStore";
import Token from "@/utils/token";
import {
	ElNotification
} from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(false);

const formRef = ref(null);

const form = reactive({
	taikhoan: "",
	matkhau: "",
});

const formRules = reactive({
	taikhoan: [
		{
			required: true,
			message: "Tài khoản là bắt buộc",
		},
	],
	matkhau: [
		{
			required: true,
			message: "Mật khẩu là bắt buộc",
		},
	]
});

function signUp() {
	formRef.value.validate(async (valid) => {
		if (!valid) return;

		try {
			isLoading.value = true;

			const token = await authService.signin(form);

			Token.token = token.toString();

			const currentUser = await authService.getIdentity();

			userStore.setUser(currentUser);

			router.push("/");
		} catch (error) {
			ElNotification.error(error.response.data.msg);
		} finally {
			isLoading.value = false;
		}
	});
}
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="col col-12">
				<h2 class="mt-4 mb-4 text-center">Đăng nhập</h2>
			</div>

			<el-form :model="form" :rules="formRules"  class="col col-12 row justify-content-center" ref="formRef"  label-width="120px"
				label-position="top" status-icon>
				<div class="col col-12 col-md-6">
					<el-form-item label="Tài khoản" prop="taikhoan">
						<el-input placeholder="Tài khoản" v-model="form.taikhoan"></el-input>
					</el-form-item>

					<el-form-item label="Mật khẩu" prop="matkhau">
						<el-input placeholder="Mật khẩu" type="password" v-model="form.matkhau"></el-input>
					</el-form-item>
				</div>

				

				<div class="col col-12 text-center">
					<el-button type="primary" :isLoading="isLoading" @click="signUp">
						Đăng ký
					</el-button>
					<p class="mt-2">
						Chưa có tài khoản tại <b>DANGLEPC</b> ?
						<router-link to="/auth/signup">
							Đăng ký
						</router-link>
					</p>
				</div>
			</el-form>
		</div>
	</div>
</template>

<style scoped>
	.container{
		margin-top: 5rem;
	}
</style>
