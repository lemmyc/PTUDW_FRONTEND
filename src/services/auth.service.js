import Request from "./api.service";
class AuthService {
	constructor(baseUrl = "/") {
		this.api = Request(baseUrl);
	}
	async signup(payload, path = "khachhang/") {
		return await this.api.post(path, payload);
	}
	async signin(payload) {
		return await this.api.post("auth/signin", payload);
	}
	async getIdentity() {
		return await this.api.get("auth");
	}
}
export default new AuthService();
