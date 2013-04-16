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
        Path = require('path');
    
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('phpdocumentor', 'Runs the PHPDocumentor documentation generator tool.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
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
        });
        
        var done = this.async();
        
        // Checks if the provided Phpdocumentor command name is valid
        if(this.data.command !== undefined &&
           this.data.command !== 'help' && 
           this.data.command !== 'list' && 
           this.data.command !== 'parse' && 
           this.data.command !== 'run' && 
           this.data.command !== 'transform' &&
           this.data.command !== 'project:parse' && 
           this.data.command !== 'project:run' && 
           this.data.command !== 'project:transform' &&
           this.data.command !== 'template:generate' && 
           this.data.command !== 'template:list' && 
           this.data.command !== 'template:package') {
            
            grunt.log.error(Util.format('Phpdocumentor does not provide any command named \'%s\' !', this.data.command));
            done(false);
            
        }
        
        // allow to specify the path for the bin, this can be used later to include the phpdoc 'phar' version with this task 
        var phpDocumentorCommand = this.data.bin || 'phpdoc';
        
        phpDocumentorCommand += ' --target=' + options.target;
        phpDocumentorCommand += ' --directory=' + options.directory;
        
        grunt.log.write(phpDocumentorCommand);
        
        var childProcess = ChildProcess.exec(phpDocumentorCommand, function(error, stdout, stderr) {
            
            grunt.log.writeln();
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
