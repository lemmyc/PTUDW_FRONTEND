import Request, { ApiService } from "./api.service";

class DonDatHangService extends ApiService {
	constructor() {
		super();
		this.api = Request("dondathang/");
	}
	confirm(payload){
		return this.api.post("dondathang/", payload);
	}
}

export default new DonDatHangService();
