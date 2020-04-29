module.exports = {
  files: [
    './autoscaler.yaml'
  ],
  requires: {
    name: String,
    max: Number
  },
  options: {
    min: 1,
    max: 4,
    utilisation: 75
  }
};
