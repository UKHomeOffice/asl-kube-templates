const Promise = require('bluebird');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

const files = require('../files');

const read = Promise.promisify(fs.readFile);
const write = Promise.promisify(fs.writeFile);

module.exports = options => {

  return Promise.mapSeries(files, file => {

    return Promise.resolve()
      .then(() => {
        const target = path.resolve(__dirname, '../../templates', file);
        return read(target);
      })
      .then(content => {
        return mustache.render(content.toString(), options);
      })
      .then(content => {
        const target = path.resolve(options.out, file);
        return write(target, content);
      });

  });

};
