module.exports = msg => {
  msg && console.log(msg);

  console.log(`
    kube-cookbook [file] [options]

    Options:
      --out       directory in which to create files - default .
      --force, -f overwrite existing files
      --prefix    string to prefix file names

    Recipe Options:
      --name      name for your deployment
      --image     location of the docker image for your app
      --url       url on which your app will run

      --replicas  number of instances of your app to run - default: 1
      --memory    memory limit assigned to your app - default: '512Mi'
`);

};
