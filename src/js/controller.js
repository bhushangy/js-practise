import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);