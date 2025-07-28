const recipeList = document.getElementById('recipe-list');
const form = document.getElementById('recipe-form');
const search = document.getElementById('search');

let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function displayRecipes(filter = '') {
  recipeList.innerHTML = '';
  recipes
    .filter(recipe => recipe.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((recipe, index) => {
      const div = document.createElement('div');
      div.className = 'recipe';
      div.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <button onclick="deleteRecipe(${index})">Delete</button>
      `;
      recipeList.appendChild(div);
    });
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  localStorage.setItem('recipes', JSON.stringify(recipes));
  displayRecipes(search.value);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;
  recipes.push({ title, ingredients, instructions });
  localStorage.setItem('recipes', JSON.stringify(recipes));
  form.reset();
  displayRecipes();
});

search.addEventListener('input', function () {
  displayRecipes(search.value);
});

displayRecipes();
