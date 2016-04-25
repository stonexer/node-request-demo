var Test = require('./lib/Test')
var Runner = require('./lib/Runner')

var _runner = new Runner() 

var test = function(title, fn){
	var _test = new Test(title, fn)
	_runner.addTest(_test)
}

module.exports = test
