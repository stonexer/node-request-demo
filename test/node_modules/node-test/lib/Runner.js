var logger = require('./Logger')

var Runner = function () {
	this.isRunning = false
	this.tests = []
}

Runner.prototype.addTest = function(test) {
	this.tests.push(test)

	if(!this.isRunning) this.run()
	this.isRunning = true
}

Runner.prototype.run = function() {
	if(!this.tests.length) return;

	setTimeout(()=>{
		var _test = this.tests.shift()
		_test.run(logger(_test, ()=>{this.run()}))
	}, 0)
}

module.exports = Runner
