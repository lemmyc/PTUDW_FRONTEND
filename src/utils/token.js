class Token {
	static #tokenName = "@danglepc/jwt";

	static get token() {
		return localStorage.getItem(this.#tokenName);
	}

	static set token(_token) {
		if (!_token) {
			localStorage.removeItem(this.#tokenName);
		} else {
			localStorage.setItem(this.#tokenName, _token);
		}
	}
}

export default Token;
