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
    replicas: 1,
    memory: {
      requests: '32Mi',
      limit: '128Mi'
    },
    cpu: {
      requests: '50m',
      limit: '400m'
    },
  }
};
