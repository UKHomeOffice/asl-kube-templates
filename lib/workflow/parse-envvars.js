const parsenv = env => {
  return Object.keys(env).map(name => {
    if (typeof env[name] === 'string' || typeof env[name] === 'number') {
      return {
        name,
        value: env[name]
      };
    }
    if (Array.isArray(env[name])) {
      return {
        name,
        value: env[name].join('')
      };
    }
    return Object.assign({ name }, env[name]);
  });
};

module.exports = options => {

  const keys = Object.keys(options.recipe.env).concat(['env']);

  keys.forEach(key => {
    const vars = Object.assign({}, options.recipe.env[key], options.args[key]);
    options.args[key] = parsenv(vars);
  });

}