module.exports = {
  files: [
    './deployment.yaml'
  ],
  requires: {
    name: String,
    image: String,
    command: String
  },
  options: {
    memory: '256Mi',
    cpu: '50m',
    env: {}
  },
  env: {}
};
