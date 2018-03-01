const Promise = require('bluebird');

const steps = [
  'validate-options',
  'copy-files',
  'deploy'
].map(name => ({
  name,
  fn: require(`./workflow/${name}`)
}));

function exec (options) {
  return chain(steps, options);
}

function chain (steps, options) {
  return Promise.mapSeries(steps, step => {
    return step.fn(options);
  });
}

module.exports = exec;
