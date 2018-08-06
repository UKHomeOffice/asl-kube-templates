const path = require('path');
const UsageError = require('../usage-error');

module.exports = options => {

  const recipe = options.recipe;
  options.args = {};

  // check compulsory arguments exist
  Object.keys(recipe.requires).forEach(key => {
    if (!options[key]) {
      throw new UsageError(`Missing option "${key}"`);
    }
    if (recipe.normalise && recipe.normalise[key]) {
      options[key] = recipe.normalise[key](options[key]);
    }
    if (options[key].constructor !== recipe.requires[key]) {
      throw new UsageError(`Invalid option type "${key}"`);
    }
    options.args[key] = options[key];
  });

  Object.keys(recipe.options).forEach(key => {
    options.args[key] = options[key] || recipe.options[key];
  });

  options.prefix = options.prefix || options.args.prefix || '';
  options.out = path.resolve(process.cwd(), options.out || '.');

};
