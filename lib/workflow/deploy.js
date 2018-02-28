const cp = require('child_process');
const files = require('../files');
const path = require('path');

module.exports = options => {

  if (options.action !== 'deploy') {
    return;
  }

  return new Promise((resolve, reject) => {

    const args = [
      '--insecure-skip-tls-verify'
    ];

    files.forEach(f => args.push('-f', path.resolve(options.tmp, f)));

    const opts = {
      env: Object.assign({}, process.env, {
        KUBE_NAMESPACE: options.namespace,
        KUBE_SERVER: options.server,
        KUBE_TOKEN: options.token
      }),
      stdio: 'inherit'
    };

    const proc = cp.spawn('kd', args, opts);
    proc.on('close', code => {
      return code ? reject(new Error(`Deployment failed with exit code ${code}`)) : resolve();
    });
    proc.on('error', reject);

  });

};
