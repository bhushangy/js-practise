class SearchView {
	#parentElement = document.querySelector(".search");

	getQuery() {
		const searchInput =
			this.#parentElement.querySelector(".search__field").value;
		this.#clearSearchInput();
		return searchInput;
	}

	addSearchButtonClickHandler(handler) {
		this.#parentElement.addEventListener("submit", (e) => {
			e.preventDefault();
			handler();
		});
	}

	#clearSearchInput() {
		this.#parentElement.querySelector(".search__field").value = "";
	}
}

export default new SearchView();
