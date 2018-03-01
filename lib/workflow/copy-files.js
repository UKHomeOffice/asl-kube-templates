const Promise = require('bluebird');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

const read = Promise.promisify(fs.readFile);
const write = Promise.promisify(fs.writeFile);

module.exports = options => {

  return Promise.mapSeries(options.recipe.files, file => {

    return Promise.resolve()
      .then(() => {
        const target = path.resolve(__dirname, '../../templates', file);
        return read(target);
      })
      .then(content => {
        return mustache.render(content.toString(), options.args);
      })
      .then(content => {
        const target = path.resolve(options.out, path.basename(file));
        return write(target, content);
      });

  });

};
