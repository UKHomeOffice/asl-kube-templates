const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const mustache = require('mustache');
mustache.escape = text => text;

const render = (file, params) => {
  const content = fs.readFileSync(file).toString();
  return mustache.render(content, params, {}, [ '{{config.', '}}' ]);
}

module.exports = (file, params = {}) => {
  const type = path.extname(file);

  try {
    if (type === '.js') {
      return require(file);
    } else if (type === '.json') {
      const content = render(file, params);
      return JSON.parse(content);
    } else if (type === '.yaml' || type === '.yml') {
      const content = render(file, params);
      return yaml.safeLoad(content);
    }
  } catch (e) {
    console.error(e);
    throw new Error(`Could not read configuration from ${file}`);
  }
};
