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
    Path = require('path');

exports.init = function(grunt) {

    var done = null,
        exports = {}, 
        options = {}, 
        phpDocumentorCommand = null;
    
    exports.setup = function(runner) {
        
        var defaults = {
            target : '',
            filename : '',
            directory : '',
            encoding : '',
            extensions : '',
            ignore : '',
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
        
        // Creates the path to the PhpDocumentor PHAR file, by default we use the PhpDocumentor PHAR provided with the 
        // plugin. 
        var phpDocumentorPhar = Path.resolve(__dirname, '../..', 'bin', 'phpDocumentor.phar');
        
        // If the 'phpDocumentorPhar' option is provided we check its path
        if(options.phpDocumentorPhar !== undefined) {
            
            // Checks if the provided PhpDocumentor PHAR file exists
            if(!fs.existsSynch(options.phpDocumentorPhar)) {
                
                grunt.log.error(Util.format('The path to the PhpDocumentor PHAR file provided \'%s\' does not exist !', options.phpDocumentorPhar));
                grunt.log.error('The \'phpDocumentorPhar\' option expects an absolute path to an existing PhpDocumentor PHAR file.');
                done(false);

            }
            
            phpDocumentorPhar = options.phpDocumentorPhar;
            
        }
        
        // path to the phar file
        phpDocumentorCommand = 'php ';
        phpDocumentorCommand += phpDocumentorPhar;
        
        var target               = options.target     || 'docs',
            directory            = options.directory  || './';

        phpDocumentorCommand += ' --target=' + target;
        phpDocumentorCommand += ' --directory=' + directory;
        
        // Writes the PhpDocumentor command line in the console
        grunt.log.write(phpDocumentorCommand);
        
    };
    
    /**
     * Runs the PhpDocumentor command.
     */
    exports.run = function() {
      
        var childProcess = ChildProcess.exec(phpDocumentorCommand, function(error, stdout, stderr) {
            
            grunt.log.writeln(error);
            grunt.log.writeln(stdout);
            grunt.log.writeln(stderr);

        });
        
        childProcess.on('exit', function(code) {
            
            if (code > 0) {
                
                grunt.log.error(Util.format('Exited with code: %d.', code));
                
                return done(false);
            
            }

            grunt.verbose.ok(Util.format('Exited with code: %d.', code));
            done();
        });
        
    };
    
    return exports;
    
};
