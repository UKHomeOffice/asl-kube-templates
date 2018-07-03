module.exports = {
  files: [
    './deployment.yaml',
    './service.yaml'
  ],
  requires: {
    name: String,
    image: String
  },
  options: {
    memory: '256Mi',
    replicas: 1,
    env: {}
  },
  env: {}
};
