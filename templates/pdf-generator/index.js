module.exports = {
  files: [
    './deployment.yaml',
    './service.yaml',
    './network-policy.yaml'
  ],
  requires: {
    name: String,
    clients: String
  },
  options: {
    image: 'quay.io/ukhomeofficedigital/html-pdf-converter:69987f6c6ed1f91790b76c693a0b68003420ce6c',
    memory: '512Mi',
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
