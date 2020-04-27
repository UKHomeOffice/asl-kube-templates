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
    memory: {
      requests: '128Mi',
      limit: '512Mi'
    },
    cpu: {
      requests: '200m',
      limit: '400m'
    },
    env: {}
  },
  env: {}
};
