export const state = {
    recipe: {},
};

export const loadRecipe = async function (id) {
    try {
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );

        const data = await res.json();

        if (!res.ok) {
            throw Error(data.message);
        }

        const { recipe } = data.data;
        console.log(data.data);
        state.recipe = {
            title: recipe.title,
            publisher: recipe.publisher,
            ingredients: recipe.ingredients,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            imageUrl: recipe.image_url,
            cookingTime: recipe.cooking_time,
        };
        console.log(state.recipe);
    } catch (error) {
        alert(error);
    }
};