import Request, { ApiService } from "./api.service";

class KhachHangService extends ApiService {
	constructor() {
		super();
		this.api = Request("khachhang/");
	}
	getAllWithParams(params) {
		return this.api.get("/", { params: { ...params } });
	}
}

export default new KhachHangService();
