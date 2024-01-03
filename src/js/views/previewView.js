import View from "./view";

export default class PreviewView extends View {
	_generateMarkup() {
		const currentRecipeId = window.location.hash.slice(1);

		return this._data
			.map((recipe) => {
				return `
        <li class="preview">
          <a class="preview__link ${currentRecipeId === recipe.id ? "preview__link--active" : ""
					}" href="#${recipe.id}">
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