import icons from "url:../img/icons.svg";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = (parentEl) => {
  const spinnerMarkUp = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  // Remove any existing content inside parentElement
  recipeContainer.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", spinnerMarkUp);
};

async function showRecipe() {
  try {
    // Get the id from the url
    const id = window.location.hash.slice(1);

    if (!id) return;

    renderSpinner(recipeContainer);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok) {
      recipeContainer.innerHTML = "";
      throw Error(data.message);
    }

    let { recipe } = data.data;
    recipe = {
      title: recipe.title,
      publsiher: recipe.publsiher,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      cookingTime: recipe.cooking_time,
    };

    // Update DOM

    const recipeMarkup = `
      <figure class="recipe__fig">
        <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
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
    ${recipe.ingredients
      .map(
        (ingredient) =>
          `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ingredient.quantity}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ingredient.unit}</span>
          ${ingredient.description}
        </div>
      </li>`
      )
      .join("")}
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">0.5</div>
        <div class="recipe__description">
          <span class="recipe__unit">cup</span>
          ricotta cheese
        </div>
      </li>
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publsiher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href=${recipe.sourceUrl}
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

    // Remove any existing content inside recipeContainer
    recipeContainer.innerHTML = "";

    // Insert markup as the first child of recipeContainer
    recipeContainer.insertAdjacentHTML("afterbegin", recipeMarkup);
  } catch (error) {
    alert(error);
  }
}

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, showRecipe)
);
