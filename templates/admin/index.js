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
    alive: '/app/alive',
    ready: '/app/ready',
    env: {}
  },
  env: {}
};
