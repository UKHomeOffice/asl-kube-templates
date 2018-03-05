const path = require('path');

module.exports = options => {
  let recipe;
  let recipePath;
  const name = options.recipe;
  const recipePaths = [];

  // load a local path relative to process.cwd
  if (options.recipe && ['/', '.'].includes(options.recipe.charAt(0))) {
    recipePaths.push(require(path.resolve(process.cwd(), options.recipe)));
  } else {
    // look for installed npm modules
    if (options.recipe.charAt(0) === '@') {
      recipePaths.push(path.resolve(process.cwd(), `./node_modules/${options.recipe}`));
    } else {
      recipePaths.push(path.resolve(process.cwd(), `./node_modules/kube-recipe-${options.recipe}`));
    }
    // try the locally available recipes
    recipePaths.push(`../../templates/${options.recipe}`);
  }

  // traverse over the paths until one loads
  while(!recipe && recipePaths.length) {
    try {
      recipePath = recipePaths.shift();
      recipe = require(recipePath);
    } catch (e) {}
  }

  if (!recipe) {
    throw new Error(`Unable to load recipe: ${options.recipe}`);
  }

  recipe.name = name;
  recipe.path = recipePath;
  recipe.files = (recipe.files || []).map(file => path.resolve(__dirname, recipePath, file));
  recipe.env = recipe.env || {};
  recipe.requires = recipe.requires || {};
  recipe.options = recipe.options || {};
  options.recipe = recipe;

};
