import View from "./view";

class BookmarksView extends View {
	_parentElement = document.querySelector(".bookmarks__list");
	_errorMsg = "No bookmarks yet...";

	_generateMarkup() {
		const currentRecipeId = window.location.hash.slice(1);

		return this._data
			.map((recipe) => {
				console.log(currentRecipeId, " ", recipe.id);
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

export default new BookmarksView();