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

Additional options for a recipe are [documented for that recipe](#webapp-options).

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

The following recipes are available:

* webapp - default
* redis

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

### Redis Options

The following minimal options must be defined:

* `name` - the name for your deployment
* `clients` - defines the name of the pods which will be granted network access to the redis instance
* `passwordName` - the secret name for the redis password secret
* `passwordKey` - the secret key for the redis password secret

Additional options:

* `replicas` - the number of instances of your app to run - default: `1`
* `prefix` - prefixes the file names of the generated files - default `'redis-'`
