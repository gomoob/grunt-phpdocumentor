'use strict';

var grunt = require('grunt'), 
    fs = require('fs');

exports.phpdocumentor = {

    /**
     * Function called before the execution of each test method.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    setUp: function(done) {
        
        // Execution of our setUp method is terminated
        done();
    
    },
  
    /**
     * Function called after the execution of each test method.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    tearDown : function(done) {

        // Execution of our tearDown method is terminated
        done();

    },
    
    /**
     * Test method used to test the execution of the plugin with a custom PHAR file.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    testWithCustomPharFile : function(test) {
        
        test.expect(2);
        
        // At the beginning no 'target/testWithCustomPharFile' directory exists
        test.ok(!fs.existsSync('target/testWithCustomPharFile'));
        
        // Executes the plugin using a new Grunt Process
        grunt.util.spawn({
            grunt: true,
            args: ['phpdocumentor:testWithCustomPharFile', '--no-color']
        }, function(error, result, code) {

            // If an error occured we display the associated log
            if(code > 0) {
                
                console.log(result);
                
            }
              
            // A 'target/testWithCustomPharFile' directory must have been created
            test.ok(fs.existsSync('target/testWithCustomPharFile'));
              
            // Indicates that the execute of our test is terminated
            test.done();

        });
        
    },
    
    /**
     * Test method used to test the execution of the plugin with the default options.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    testWithDefaultOptions : function(test) {

        test.expect(2);
        
        // At the beginning no 'docs' directory exists
        test.ok(!fs.existsSync('docs'));
        
        // Executes the plugin using a new Grunt Process
        grunt.util.spawn({
            grunt: true,
            args: ['phpdocumentor:testWithDefaultOptions', '--no-color']
        }, function(error, result, code) {

            // If an error occured we display the associated log
            if(code > 0) {
                
                console.log(result);
                
            }
            
            // A 'docs' directory must have been created
            test.ok(fs.existsSync('docs'));
              
            // Indicates that the execute of our test is terminated
            test.done();

        });
        
    },
    
    /**
     * Test method used to test the execution of the plugin with a 'null' phar option.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    testWithNullPhar : function(test) {
        
        test.expect(2);
        
        // At the beginning no 'target/testWithNullPhar' directory exists
        test.ok(!fs.existsSync('target/testWithNullPhar'));
        
        // Executes the plugin using a new Grunt Process
        grunt.util.spawn({
            grunt: true,
            args: ['phpdocumentor:testWithNullPhar', '--no-color']
        }, function(error, result, code) {

            // If an error occured we display the associated log
            if(code > 0) {

                console.log(result);

            }

            // A 'target/testWithNullPhar' directory must have been created
            test.ok(fs.existsSync('target/testWithNullPhar'));

            // Indicates that the execute of our test is terminated
            test.done();

        });
        
    },
    
    /**
     * Test method used to test the execution of the plugin with the 'target' option.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    testWithTarget : function(test) {
        
        test.expect(2);
        
        // At the beginning no 'target/testWithTarget' directory exists
        test.ok(!fs.existsSync('target/testWithTarget'));
        
        // Executes the plugin using a new Grunt Process
        grunt.util.spawn({
            grunt: true,
            args: ['phpdocumentor:testWithTarget', '--no-color']
        }, function(error, result, code) {

            // If an error occured we display the associated log
            if(code > 0) {
                
                console.log(result);
                
            }
              
            // A 'target/testWithTarget' directory must have been created
            test.ok(fs.existsSync('target/testWithTarget'));
              
            // Indicates that the execute of our test is terminated
            test.done();

        });
        
    },
    
    /**
     * Test method used to test the execution of the plugin for Task Level options overwriting.
     */
    testWithTaskOptionsOverwriting : function(test) {
        
        test.expect(1);
        
        // At the beginning no 'target/testWithCustomPharFile' directory exists
        // test.ok(!fs.existsSync('target/testWithCustomPharFile'));
        
        // Executes the plugin using a new Grunt Process
        grunt.util.spawn({
            grunt: true,
            args: ['phpdocumentor:testWithTaskOptionsOverwriting', '--no-color']
        }, function(error, result, code) {

            // If an error occured we display the associated log
            if(code > 0) {
                
                console.log(result);
                
            }
            
            // We test that the output of the command contains the phpDocumentor 'help' command usage string
            //  Usage : 
            //    help [--xml] [--format="..."] [--raw] [command_name]
            test.ok(result.stdout.indexOf('help [--xml] [--format="..."] [--raw] [command_name]') > 0);

            // Indicates that the execute of our test is terminated
            test.done();

        });
        
    }

};
