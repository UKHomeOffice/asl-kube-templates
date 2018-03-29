module.exports = {
  files: [
    './deployment.yaml',
    './service.yaml',
    './network-policy.yaml'
  ],
  requires: {
    name: String,
    image: String,
    url: String
    clients: String
  },
  options: {
    memory: '256Mi',
    replicas: 1,
    env: {},
    nginx: {}
  },
  env: {
    nginx: {
      PROXY_SERVICE_HOST: '127.0.0.1',
      PROXY_SERVICE_PORT: '"8080"',
      ENABLE_UUID_PARAM: '"FALSE"',
      NAXSI_USE_DEFAULT_RULES: '"FALSE"',
      PORT_IN_HOST_HEADER: '"FALSE"',
      ERROR_REDIRECT_CODES: '""'
    }
  }
};
