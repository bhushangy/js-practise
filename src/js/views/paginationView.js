import View from "./view";
import icons from "../../img/icons.svg";

export class PaginationView extends View {
	_parentElement = document.querySelector(".pagination");

	addPaginationButtonClickHandler(handler) {
		this._parentElement.addEventListener("click", function (e) {
			const btn = e.target.closest(".btn--inline");
			if (!btn) return;
			const goToPage = +btn.dataset.goto;
			handler(goToPage);
		});
	}

	_generateMarkup() {
		const currentPage = this._data.currentPage;
		const numOfPages = Math.ceil(
			this._data.results.length / this._data.resultsPerPage
		);

		if (currentPage === 1 && numOfPages > 1) {
			return this._generateButtonMarkup("next", currentPage);
		}

		if (currentPage === numOfPages && numOfPages > 1) {
			return this._generateButtonMarkup("prev", currentPage);
		}

		if (currentPage < numOfPages) {
			return (
				this._generateButtonMarkup("prev", currentPage) +
				this._generateButtonMarkup("next", currentPage)
			);
		}

		return "";
	}

	_generateButtonMarkup(buttonDirection, currentPage) {
		return `
				<button data-goto="${buttonDirection === "prev" ? currentPage - 1 : currentPage + 1
			}" class="btn--inline pagination__btn--${buttonDirection}">
					<svg class="search__icon">
						<use href="${icons}#icon-arrow-${buttonDirection === "prev" ? "left" : "right"
			}"></use>
					</svg>
					<span>Page ${buttonDirection === "prev" ? currentPage - 1 : currentPage + 1
			}</span>
				</button>`;
	}
}

export default new PaginationView();