/*
 * grunt-phpdocumentor
 * https://github.com/gomoob/grunt-phpdocumentor
 *
 * Copyright (c) 2013 Baptiste Gaillard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var ChildProcess = require('child_process'), 
        Util = require('util'), 
        Path = require('path'),
        _ = require('lodash')._;
    
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('phpdocumentor', 'Runs the PHPDocumentor documentation generator tool.', function() {

        var options = {};
        // Merge task-specific and/or target-specific options with these defaults.
        _.extend(options, {
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
            },
            this.data
        );
        
        var done = this.async();
        
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
        
        // path to the phar file
        var phpDocumentorCommand = options.bin        || Path.resolve(__dirname, '..', 'bin', 'phpdoc'),
            target               = options.target     || 'docs',
            directory            = options.directory  || './';

        phpDocumentorCommand += ' --target=' + target;
        phpDocumentorCommand += ' --directory=' + directory;
        
        grunt.log.write(phpDocumentorCommand);
        
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

    });

};
