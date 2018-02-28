module.exports = msg => {
  msg && console.log(msg);

  console.log(`
    kute generate [file] [options]
    kute deploy [file] [options]

    Options:

      --name      name for your deployment
      --image     location of the docker image for your app
      --url       url on which your app will run

      --replicas  number of instances of your app to run - default: 1
      --memory    memory limit assigned to your app - default: '512Mi'

    Deploy Options:

      --server    kubernetes server - reads from process.env.KUBE_SERVER by default
      --token     kubernetes token - reads from process.env.KUBE_TOKEN by default
      --namespace ACP namespace to deploy into
    Generate Options:

      --out       directory in which to create files - default .
`);

};
