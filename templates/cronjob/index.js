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
    schedule: '0 0 * * *', // run every midnight
    memory: {
      requests: '128Mi',
      limit: '512Mi'
    },
    cpu: {
      requests: '100m',
      limit: '400m'
    },
    env: {}
  },
  env: {}
};
