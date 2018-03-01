const path = require('path');

module.exports = options => {
  let recipe;
  const recipePath = `../../templates/${options.recipe}`;
  try {
    recipe = require(recipePath);
  } catch (e) {
    throw new Error(`Unknown recipe: ${options.recipe}`);
  }
  recipe.files = (recipe.files || []).map(file => path.resolve(__dirname, recipePath, file));
  recipe.env = recipe.env || {};
  recipe.requires = recipe.requires || {};
  recipe.options = recipe.options || {};
  options.recipe = recipe;
};
