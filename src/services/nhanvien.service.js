import Request, { ApiService } from "./api.service";

class NhanVienService extends ApiService {
	constructor() {
		super();
		this.api = Request("nhanvien/");
	}
}

export default new NhanVienService();
