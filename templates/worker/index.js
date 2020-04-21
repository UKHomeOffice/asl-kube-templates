module.exports = {
  files: [
    './deployment.yaml'
  ],
  requires: {
    name: String,
    image: String
  },
  options: {
    memory: '256Mi',
    cpu: '50m',
    replicas: 1,
    env: {}
  },
  env: {}
};
