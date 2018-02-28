# kute

A utility to generate the minimal necessary config files for a web app running on kubernetes.

## Prerequisites

* `node@8`
* `kd` for deployments

## Usage

Clone the repo, and link the binary into your `PATH`:

```
git clone git@github.com:lennym/kute.git
cd kute
npm link
```

Then in the project you want to create deployment files for:

```
kute generate [config.js]
```

Or to deploy - _requires `kd` binary to be installed and on your `PATH`_:

```
kute deploy [config.js]
```

If a path to a config file is defined, it should be a javascript file that exports an object, or a json file.

## Options

All options can be defined either in a configuration file, or as command line flags.

The following minimal options must be defined:

* `name` - the name for your deployment
* `image` - the location of the docker image for your app
* `url` - the url on which your app will run

Additional options:

* `replicas` - the number of instances of your app to run - default: `1`
* `memory` - the memory limit assigned to your app - default: `'512Mi'`
* `env` - a map of environment variables defined on your app
* `nginx` - a map of environment variables defined on your nginx proxy

### Environment variables

Environment variables can be most simply defined as key:value pairs.

To load an environment variable from a secret, define in your configuration file as follows:

```js
module.exports = {
  //...
  env: {
    MY_SECRET_USERNAME: {
      secret: true,
      name: 'my-secret',
      key: 'username'
    },
    MY_SECRET_PASSWORD: {
      secret: true,
      name: 'my-secret',
      key: 'password'
    }
  }
}
```

### Deployment options

For deployments, the following additional options are required:

* `server` - the kubernetes server - reads from `process.env.KUBE_SERVER` by default
* `token` - the kubernetes token - reads from `process.env.KUBE_TOKEN` by default
* `namespace` - the namespace to deploy into

### Generate options

By default, generated files are saved into your current working directory. To override this, you can set an `--out` option.

```
$ kute generate config.js --out /app/deploy
```

## What you get

* An ingress
* An application sitting behind an nginx proxy
* A network policy allowing traffic from the ingress to the application

## Caveats

* Your app must be configured to listen on port 8080

## Roadmap

* [ ] Add a flag to deploy a redis instance for UI application session storage
