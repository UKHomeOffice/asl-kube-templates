# kute

A utility to generate the minimal necessary config files for a web app running on kubernetes.

## Prerequisites

* `node@8`

## Usage

Clone the repo, and link the binary into your `PATH`:

```
git clone git@github.com:lennym/kube-cookbook.git
cd kube-cookbook
npm link
```

Then in the project you want to create deployment files for:

```
kube-cookbook [config.js]
```

If a path to a config file is defined, it should be a javascript file that exports an object, or a json file.

If no file is specified `.kube.js` is loaded by default.

## Options

All options can be defined either in a configuration file, or as command line flags.

* `recipe` - the set of templates to generate, depending on the type of app being created - default `'webapp'`
* `out` - the directory in which to create generated files - default `.`

Additional options for a recipe are [documented for that recipe](#webapp-options).

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

## Recipes

Currently only one recipe is available - a basic webapp.

### Webapp Options

The following minimal options must be defined:

* `name` - the name for your deployment
* `image` - the location of the docker image for your app
* `url` - the url on which your app will run

Additional options:

* `replicas` - the number of instances of your app to run - default: `1`
* `memory` - the memory limit assigned to your app - default: `'512Mi'`
* `env` - a map of environment variables defined on your app
* `nginx` - a map of environment variables defined on your nginx proxy
