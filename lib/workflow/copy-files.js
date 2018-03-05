const Promise = require('bluebird');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

const read = Promise.promisify(fs.readFile);
const write = Promise.promisify(fs.writeFile);
const exists = file => new Promise((resolve, reject) => {
  read(file)
    .then(() => resolve(true), e => {
      if (e.code === 'ENOENT') {
        return resolve(false);
      }
      return reject(e);
    });
});

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
        const filename = path.basename(file);
        const target = path.resolve(options.out, `${options.prefix}${filename}`);
        return exists(target)
          .then(exists => {
            if (!exists || options.force) {
              return write(target, content)
                .then(() => {
                  console.log(` - created file: ${target}`);
                });
            } else {
              console.log(` - refusing to overwrite file at ${target}.\n    run with --force to overwrite.`);
            }
          });
      });

  });

};
