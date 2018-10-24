# kube-cookbook

A utility to generate the minimal necessary config files for a web app running on kubernetes.

## Prerequisites

* `node@8`

## Usage

Install from npm:

```
npm install -g kube-cookbook
```

Then in the project you want to create deployment files for:

```
kube-cookbook [config.yaml]
```

If a path to a config file is defined, it should be yaml, json, or a javascript file exporting an object.

If no file is specified `.kube.yaml` is loaded by default.

## Options

All options can be defined either in a configuration file, or as command line flags.

* `recipe` - the set of templates to generate, depending on the type of app being created - default `'webapp'`
* `out` - the directory in which to create generated files - default `.`
* `prefix` - prefixes the name of the files generated - default `''`
* `force` - overwrite existing files - default `false`
* `dry-run` - will output the generated config to stdout without generating any files
* `config` - files to load additional configuration parameters from

Additional options for a recipe are [documented for that recipe](#webapp-options).

### `config` parameters

If using the `--config` flag to load additional parameters, these can be json or yaml files.

Any data found in those files can be referenced in service templates as `{{config.<filename>.<parameter>}}`.

For example, if I have a `versions.yaml` as follows:

```
web: 1.0
api: 2.0
```

Then in my service configuration if I run with `--config versions.yaml`, then `{{config.versions.web}}` will be replaced with `1.0` and `{{config.versions.api}}` will be replaced with `2.0` in the generated service config.

### Environment variables

Environment variables can be most simply defined as key:value pairs.

To load an environment variable from a secret, define in your configuration file as follows:

```json
{
  "env": {
    "MY_SECRET_USERNAME": {
      "secret": true,
      "name": "my-secret",
      "key": "username"
    },
    "MY_SECRET_PASSWORD": {
      "secret": true,
      "name": "my-secret",
      "key": "password"
    }
  }
}
```

Or as yaml:

```yaml
env:
  MY_SECRET_USERNAME:
    secret: true
    name: my-secret
    key: username
  MY_SECRET_PASSWORD:
    secret: true
    name: my-secret
    key: password
```


## Recipes

The following recipes are available by default:

* webapp - default
* redis
* internal-service
* worker

In addition to these, you can pass a path to a custom recipe, or an npm module name.

To use a recipe in a local directory:

```
kube-cookbook --recipe ./kube
```

To use a recipe from a locall installed npm module:

```
kube-cookbook --recipe myrecipe
```

This will attempt to read the module `kube-recipe-myrecipe` from the local `node_modules` directory.

If a scoped module name is provided - eg. `@scope/myrecipe` then it is required as-is, and not prefixed with `kube-recipe-`.

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

### Internal Service Options

Internal services work in the same way as public facing web apps, with the exception that they are not accessible from the internet, and can only be accessed from other services in the namespace.

As such, the options are the same except the `url` option is no longer required, and a `clients` option is required.

* `clients` - defines the name of the pods which will be granted network access to the service

### Redis Options

The following minimal options must be defined:

* `name` - the name for your deployment
* `clients` - defines the name of the pods which will be granted network access to the redis instance
* `passwordName` - the secret name for the redis password secret
* `passwordKey` - the secret key for the redis password secret

Additional options:

* `replicas` - the number of instances of your app to run - default: `1`
* `prefix` - prefixes the file names of the generated files - default `'redis-'`


### Worker Options

A worker is a service which does not need to be accessed by any other service.

The following minimal options must be defined:

* `name` - the name for your deployment
* `image` - the location of the docker image for your app

Additional options:

* `replicas` - the number of instances of your app to run - default: `1`
* `memory` - the memory limit assigned to your app - default: `'512Mi'`
* `env` - a map of environment variables defined on your app

## Using multiple recipes

You can define multiple recipes in a single config file by defining each as an entry in an array.

Example:

```yaml
---
- name: my-webapp
  recipe: webapp
  image: ...
  url: my-webapp.example.com
  env:
    REDIS_HOST: sessionstore
    REDIS_PASSWORD:
      secret: true
      name: redis-password
      key: password

- name: sessionstore
  recipe: redis
  clients: my-webapp
  passwordName: redis-password
  passwordkey: password
```

This will generate all the files required for both the webapp, and an accompanying redis sessionstore with the password loaded from a secret in the namespace.

## Recipe Definition

Recipes should be defined as a javascript object, and one or more template yaml files.

The exported javascript should have the following format:

```js
module.exports = {
  files: [
    // list of file templates to compile
  ],
  requires: {
    // required parameters and types
  },
  options: {
    // optional parameters and default values
  }
}
```

See the recipes included for examples - [webapp](./templates/webapp/index.js) | [redis](./templates/redis/index.js)

Properties defined in the `requires` and `options` configuration can then be used in templates as mustache placeholders: e.g. `{{{name}}}`
