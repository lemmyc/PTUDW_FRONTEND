import Request, { ApiService } from "./api.service";

class HangHoaService extends ApiService {
	constructor() {
		super();
		this.api = Request("hanghoa/");
	}
}

export default new HangHoaService();
