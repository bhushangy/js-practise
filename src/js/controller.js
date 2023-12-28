import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

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
    alert(error);
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
