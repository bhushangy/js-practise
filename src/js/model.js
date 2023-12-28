import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // If getJSON rejects a promise and errors out, then it is handled
    // in getJSON's catch block and ultimately whatever you return from
    // that catch block will be the result in this fucntion. If you do not
    // return anything, then it will be undefined. If you want to return a
    // rejected promise, then re throw the error again from getJSON's catch block.
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      title: recipe.title,
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      cookingTime: recipe.cooking_time,
    };
  } catch (error) {
    throw error;
  }
};
