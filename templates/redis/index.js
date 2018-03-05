module.exports = {
  files: [
    './deployment.yaml',
    './service.yaml',
    './network-policy.yaml'
  ],
  requires: {
    name: String,
    passwordName: String,
    passwordKey: String,
    clients: String
  },
  options: {
    prefix: 'redis-',
    replicas: 1
  }
};
