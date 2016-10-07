/**
 * grunt-phpdocumentor
 * https://github.com/gomoob/grunt-phpdocumentor
 *
 * Copyright (c) 2013 Baptiste Gaillard
 * Licensed under the MIT license.
 */

'use strict';

// External libraries
var ChildProcess = require('child_process'),
    Util = require('util'),
    Path = require('path'),
    Fs = require('fs');

/**
 * Function used to initialize the PHPDocumentor plugin, the purspose of the following function is create a
 * "phpDocumentor" Javascript object which wraps all its functionalities.
 *
 * This function is called inside the 'tasks/phpdocumentor.js' file.
 *
 * @param {grunt} grunt an instance of the 'grunt' object.
 *
 * @see http://gruntjs.com/api/grunt.
 */
exports.init = function(grunt) {

        // A "promise" to be used to indicate to Grunt when the execution of our plugin is terminated
    var done = null,

        // The object which represents the phpDocumentor Grunt plugin
        exports = {},

        // An object which contains the plugin defaults options merged with options passed to the plugin
        options = {},

        // A string which reprents a PHPDocumentor command, this command is created in the 'setup()' method and
        // executed in the 'run()' method
        phpDocumentorCommand = '',

        // Options to pass to ChildProcess.exec() when phpDocumentor is executed
        phpDocumentorCommandExecOptions = {
          maxBuffer: 1048576 // 1 mebibyte
        };

    /**
     * Function used to setup the PHPDocument plugin, this function has to be called before the 'run' method.
     *
     * @param {grunt.task} runner an instance of the current task.
     *
     * @see http://gruntjs.com/api/inside-tasks
     */
    exports.setup = function(runner) {

        /**
         * The list of default options passed to the Grunt PHPDocumentor plugin.
         *
         * @see http://www.phpdoc.org/docs/latest/references/commands/project_run.html
         */
        var defaults = {
            target : '',
            filename : '',
            directory : '',
            encoding : '',
            extensions : '',
            ignore : '',
            'ignore-tags' : '',
            hidden : '',
            'ignore-symlinks' : '',
            markers : '',
            title : '',
            force : '',
            validate : '',
            visibility : '',
            defaultpackagename : '',
            sourcecode : '',
            progressbar : '',
            template : '',
            parseprivate : '',
            config : ''
        };

        // Merge task-specific and/or target-specific options with default option values.
        options = runner.options(defaults);

        // Create a "promise" object to indicate to Grunt when the execution of the plugin is terminated
        done = runner.async();

        // Checks if the provided Phpdocumentor command name is valid
        if(options.command !== undefined &&
           options.command !== 'help' &&
           options.command !== 'list' &&
           options.command !== 'parse' &&
           options.command !== 'run' &&
           options.command !== 'transform' &&
           options.command !== 'project:parse' &&
           options.command !== 'project:run' &&
           options.command !== 'project:transform' &&
           options.command !== 'template:generate' &&
           options.command !== 'template:list' &&
           options.command !== 'template:package') {

            grunt.log.error(Util.format('Phpdocumentor does not provide any command named \'%s\' !', this.data.command));
            done(false);

        }

        // If the 'phar' option is provided so we check the PHAR file path
        if(options.phar !== undefined && options.phar !== null) {

            // Checks if the provided PhpDocumentor PHAR file exists
            if(!Fs.existsSync(options.phar)) {

                grunt.log.error(Util.format('The path to the PhpDocumentor PHAR file provided \'%s\' does not exist !', options.phar));
                grunt.log.error('The \'phar\' option expects an absolute path to an existing PhpDocumentor PHAR file.');
                done(false);

            }

            // path to the phar file
            // WARNING: The quotes are very important otherwise the plugin will not work if it is executed within a
            // directory having spaces
            phpDocumentorCommand = 'php ';
            phpDocumentorCommand += '"';
            phpDocumentorCommand += options.phar;
            phpDocumentorCommand += '"';

        }

        // If the 'phar' option has a null value then we execute the 'phpdoc' command available
        else if(options.phar === null) {

            phpDocumentorCommand = 'phpdoc ';

        }

        // If the 'phar' option is undefined then we execute phpDocumentor using the packaged phpDocumentor PHAR file
        else {

            // Creates the path to the PhpDocumentor PHAR file, by default we use the PhpDocumentor PHAR provided with the
            // plugin.
            var phar = Path.resolve(__dirname, '../..', 'bin', 'phpDocumentor.phar');

            // path to the phar file
            // WARNING: The quotes are very important otherwise the plugin will not work if it is executed within a
            // directory having spaces
            phpDocumentorCommand = 'php ';
            phpDocumentorCommand += '"';
            phpDocumentorCommand += phar;
            phpDocumentorCommand += '"';

        }

        var target    = options.target     || 'docs',
            directory = options.directory  || './';

        // Providing no command or the 'run' command or the 'project:run' command is the same
        // @see http://www.phpdoc.org/docs/latest/references/commands/project_run.html
        if(options.command === undefined || options.command === 'run' || options.command === 'project:run') {

            phpDocumentorCommand += ' --target=' + target;
            phpDocumentorCommand += ' --directory=' + directory;

            // TODO: see the help of the command with 'phpdoc help run' and add the missing options

        }

        // Manage the 'help' command
        else if(options.command === 'help') {

            phpDocumentorCommand += ' help';

        }

        // Providing the 'parse' or 'project:parse' command is the same
        // @see http://www.phpdoc.org/docs/latest/references/commands/project_parse.html
        else if(options.command === 'parse' || options.command === 'project:parse') {

            phpDocumentorCommand += ' project:parse';
            phpDocumentorCommand += ' --target=' + target;
            phpDocumentorCommand += ' --directory=' + directory;

            // TODO: see the help of the command with 'phpdoc help parse' and add the missing options

        }

        // Providing the 'transform' or 'project:transform' command is the same
        // @see http://www.phpdoc.org/docs/latest/references/commands/project_transform.html
        else if(options.command === 'transform' || options.command === 'project:transform') {

            phpDocumentorCommand += ' project:transform';
            phpDocumentorCommand += ' --target=' + target;

            // TODO: see the help of the command with 'phpdoc help tranform' and add the missing options

        }

        // Manage the 'list' command
        else if(options.command === 'list') {

            phpDocumentorCommand += ' list';

            // TODO: see the help of the command with 'phpdoc help list' and add the missing options

        }

        // Manage the 'template:list' command
        else if(options.command === 'template:list') {

            phpDocumentorCommand += ' template:list';

            // TODO: see the help of the command with 'phpdoc help template:list' and add the missing options

        }

        // Writes the PhpDocumentor command line in the console
        grunt.log.write(phpDocumentorCommand);

    };

    /**
     * Function used to check that the 'php' command is available.
     */
    exports.checkPhp = function() {

        // Executes the 'php -v' command and only redirect errors to the console
        var childProcess = ChildProcess.exec('php -v', function(error, stdout, stderr) {

            // On success error will be null
            if(error !== null) {

                grunt.log.writeln(error);

            }

            grunt.log.writeln(stderr);

        });

        childProcess.on('exit', function(code) {

            if(code > 0) {

                grunt.log.error(Util.format('The \'php -v\' command returned the error code \'%d\' !', code));
                grunt.log.error('Please check that PHP CLI is available.');

                return done(false);

            }

            // OK, PHP is available on command line, now run the phpDocumentor
            this.run();

        }.bind(this));

    },

    /**
     * Runs the PhpDocumentor command.
     */
    exports.run = function() {

        var exceptionEncountered = false;

        // Trigger the PHPDocument command execution
        var childProcess = ChildProcess.exec(phpDocumentorCommand, phpDocumentorCommandExecOptions, function(error, stdout, stderr) {

            // On success error will be null
            if(error !== null) {

                grunt.log.writeln(error);

            }

            grunt.log.writeln(stdout);
            grunt.log.writeln(stderr);

            // phpDocumentor output error using '[Exception] \n Error message' messages, for example
            //     [Exception]
            //     No parsable files were found, did you specify any using the -f or -d parameter?
            if(stderr.toString().indexOf('[Exception]') > 0) {

                exceptionEncountered = true;

            }

        });

        // When the execution of PHPDocumentor is terminated, please not that we use the 'close' event and not the
        // 'exit' event because it allow use to exit only when all the phpDocumentor messages are written on the console
        childProcess.on('close', function(code) {

            // An error was encountered during the execution
            if (code > 0) {

                grunt.log.error(Util.format('Exited with code: %d.', code));

                return done(false);

            }

            // If a phpDocumentor exception have been encountered then exit with an error
            if(exceptionEncountered) {

                grunt.log.error(Util.format('A phpDocumentor exception has been encountered !'));

                return done(false);

            }

            grunt.verbose.ok(Util.format('Exited with code: %d.', code));
            done();

        });

    };

    return exports;

};
