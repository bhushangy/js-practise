import View from "./view";

class ResultsView extends View {
	_parentElement = document.querySelector(".results");
	_errorMsg = "No recipes found. Please try again!!";

	_generateMarkup() {
		return this._data
			.map((recipe) => {
				return `
        <li class="preview">
          <a class="preview__link preview__link--active" href="#${recipe.id}">
            <figure class="preview__fig">
              <img src="${recipe.imageUrl}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipe.title}</h4>
              <p class="preview__publisher">${recipe.publisher}</p>
            </div>
          </a>
        </li>
        `;
			})
			.join("");
	}
}

export default new ResultsView();