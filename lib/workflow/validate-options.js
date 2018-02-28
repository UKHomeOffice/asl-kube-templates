const UsageError = require('../usage-error');

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

  // check compulsory arguments exist
  const args = [
    'name',
    'url',
    'image'
  ];
  args.forEach(key => {
    if (!options[key]) {
      throw new UsageError(`Missing option "${key}"`);
    }
  });

  // check compulsory arguments for deployment exist
  if (options.action === 'deploy') {
    const deployargs = [
      'server',
      'token',
      'namespace'
    ];
    deployargs.forEach(key => {
      if (!options[key]) {
        throw new UsageError(`Missing option "${key}"`);
      }
    });
  }

  // normalise and default arguments
  options.memory = options.memory || '512Mi';
  options.replicas = options.replicas || 1;
  options.out = options.out || process.cwd();

  const env = options.env || {};
  options.env = parsenv(env);

  const nginx = Object.assign({
    PROXY_SERVICE_HOST: '127.0.0.1',
    PROXY_SERVICE_PORT: '"8080"',
    ENABLE_UUID_PARAM: '"FALSE"',
    NAXSI_USE_DEFAULT_RULES: '"FALSE"',
    PORT_IN_HOST_HEADER: '"FALSE"',
    ERROR_REDIRECT_CODES: '""'
  }, options.nginx);

  options.nginx = parsenv(nginx);

}