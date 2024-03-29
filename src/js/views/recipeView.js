import View from "./view";
import icons from "../../img/icons.svg";
import Fracty from "fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMsg = "We could not find your recipe. Please try again!!";
  _message = "";

  // This method acts like a publisher because it listening to the events,
  // and the subscriber is the caller of this method.
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addServingsHandler(handler) {
    this._parentElement.addEventListener("click", function (event) {
      const button = event.target.closest(".btn--tiny");
      if (!button) return;
      const newServings = +button.dataset.servings;
      if (newServings > 0) handler(newServings);
    });
  }

  addBookmarkHandler(handler) {
    this._parentElement.addEventListener("click", function (event) {
      const bookmarkBtn = event.target.closest(".btn--bookmark");
      if (!bookmarkBtn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.imageUrl}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${this._data.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${this._data.servings}
          </span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-servings=${this._data.servings - 1
      } class="btn--tiny btn--decrease-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-servings=${this._data.servings + 1
      } class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <button class="btn--round btn--bookmark recipe__book">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.bookmarked ? "-fill" : ""
      }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._generateMarkupIngredient(this._data.ingredients)}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publsiher}</span>. Please
          check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href=${this._data.sourceUrl}
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    </>`;
  }

  _generateMarkupIngredient(ingredients) {
    return ingredients
      .map(
        (ingredient) =>
          `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity
            ? Fracty(ingredient.quantity).toString()
            : ""
          }</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit}</span>
                  ${ingredient.description}
                </div>
              </li>`
      )
      .join("");
  }
}

export default new RecipeView();