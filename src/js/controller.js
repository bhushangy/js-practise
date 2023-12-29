import * as model from "./model.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";

async function controlRecipes() {
  try {
    // Get the id from the url
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Show spinner
    recipeView.renderSpinner();

    // Fetch data
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(error);
  }
}

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query.trim()) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.getPaginatedSearchResults(1));
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getPaginatedSearchResults(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addServingsHandler(controlServings);
  searchView.addSearchButtonClickHandler(controlSearchResults);
  paginationView.addPaginationButtonClickHandler(controlPagination);
};

init();