module.exports = {
  files: [
    './deployment.yaml'
  ],
  requires: {
    name: String,
    image: String
  },
  options: {
    alive: '/app/alive',
    ready: '/app/ready',
    env: {}
  },
  env: {}
};
