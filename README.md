# grunt-phpdocumentor

> Runs the PHPDocumentor documentation generator tool.

## WARNING
This Grunt plugin and has not been tested thorougly yet so use it at your own risk ! 

For now the plugin supports only one PHPDocumentor call : ```phpdoc -d dir -t target```.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-phpdocumentor --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-phpdocumentor');
```

## The "phpdocumentor" task

### Overview
In your project's Gruntfile, add a section named `phpdocumentor` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  phpdocumentor: {
    options : {
      bin: '/different/path/to/phpdoc',
      directory : 'src/main/php/config,src/main/php/library,src/main/php/module',
      target : 'target/phpdocumentor'
    }, 
                    
    /**
     * Target used to generate the PHP documentation of the project.
     */
    generate : {}
  },
})
```

### Options

#### options.bin( optional )
Type: `String`
Default value: `phpdoc`

Path to the phpdoc executable, by default it will try the command itself.

#### options.directory
Type: `String`
Default value: `TODO`

Comma-separated list of directories to (recursively) parse (multiple values allowed)

#### options.target
Type: `String`
Default value: `TODO`

Path where to store the generated output.

### Usage Examples

```grunt phpdocumentor:generate```

## Release History
_(Nothing yet)_
