const Promise = require('bluebird');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const { blue, grey, red } = require('chalk');

mustache.escape = text => text;

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
  if (!options['dry-run']) {
    console.log(`${blue(options.recipe.name)} ${grey(options.recipe.path)}`);
  }

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
        if (options['dry-run']) {
          console.log(content);
          return;
        }
        const filename = path.basename(file);
        const target = path.resolve(options.out, `${options.prefix}${filename}`);
        return exists(target)
          .then(exists => {
            if (!exists || options.force) {
              return write(target, content)
                .then(() => {
                  console.log(` - created file: ${grey(target)}`);
                });
            } else {
              console.log(red(` - refusing to overwrite file at ${target}`));
              console.log('   run with --force to overwrite.');
            }
          });
      });

  });

};
