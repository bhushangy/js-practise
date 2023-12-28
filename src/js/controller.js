import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
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
    await model.loadSearchResults(query);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addSearchButtonClickHandler(controlSearchResults);
};

init();
