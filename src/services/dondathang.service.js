import Request, { ApiService } from "./api.service";

class DonDatHangService extends ApiService {
	constructor() {
		super();
		this.api = Request("dondathang/");
	}
	confirm(payload){
		return this.api.put("/",payload);
	}
}

export default new DonDatHangService();
