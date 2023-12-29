import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";
import { RESULTS_PER_PAGE, INITIAL_RESULTS_ARRAY } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: INITIAL_RESULTS_ARRAY,
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
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
      id: recipe.id,
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

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getPaginatedSearchResults = function (
  page = state.search.currentPage
) {
  state.search.currentPage = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};