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
     * Test method used to test the execution of the plugin with the default options.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    testWithDefaultOptions : function(test) {

        test.expect(2);
        
        // At the beginning no 'docs' directory exists
        test.ok(!fs.existsSync('docs'));
        
        // Executes the plugin inside the 'target' directory to not pollute the project
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
     * Test method used to test the execution of the plugin with the 'target' option.
     * 
     * @param {nodeunit} test a reference to nodeunit.
     */
    testWithTarget : function(test) {
        
        test.expect(2);
        
        // At the beginning no 'target/testWithTarget' directory exists
        test.ok(!fs.existsSync('target/testWithTarget'));
        
        // Executes the plugin inside the 'target' directory to not pollute the project
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
        
    }

};
