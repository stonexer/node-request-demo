function log(name, time, success) {
	console.log(`${name} - 耗时${time}ms - ${success ? '通过' : '失败'}`)
}

var Logger = (test,cb) => {
	return err => {
		if (err) {
			log(test.title, test.duration, false)
		} else {
			log(test.title, test.duration, true)
		}
		cb()
	}
}

module.exports = Logger
