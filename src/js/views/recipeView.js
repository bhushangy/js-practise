import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  render(data) {
    this.#data = data;
    const markUp = this.#generateMarkup();
    this.#clear();
    // Insert markup as the first child of recipeContainer
    this.#parentElement.insertAdjacentHTML("afterbegin", markUp);
  }

  // Remove any existing content inside recipeContainer i.e spinner
  #clear() {
    this.#parentElement.innerHTML = "";
  }

  // Public method because controller needs to call this while fethcing data
  renderSpinner = () => {
    const spinnerMarkUp = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    // Remove any existing content inside parentElement
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", spinnerMarkUp);
  };

  // This method acts like a publisher because it listening to the events,
  // and the subscriber is the caller of this method.
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  #generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this.#data.imageUrl}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${this.#data.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${this.#data.servings}
          </span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.#generateMarkupIngredient(this.#data.ingredients)}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.#data.publsiher}</span>. Please
          check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href=${this.#data.sourceUrl}
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

  #generateMarkupIngredient(ingredients) {
    return ingredients
      .map(
        (ingredient) =>
          `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity
            ? new Fraction(ingredient.quantity).toString()
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
