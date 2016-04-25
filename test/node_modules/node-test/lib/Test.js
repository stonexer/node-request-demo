function Test(title, fn) {
  this.title = title
  this.fn = fn
  this.async = !! fn.length
  this._timeout = 5000
}

Test.prototype.run = function(fn){
  var timer
    , ms = this._timeout
    , start = new Date

  var uncaughtExceptionHandler = err => {
    process.removeListener('uncaughtException', uncaughtExceptionHandler);
    clearTimeout(timer)
    this.duration = new Date - start
    fn(err)
  }

  try {
    // async
    if (this.async) {
  	  // timeout
      timer = setTimeout(function(){
        fn(new Error('超时' + ms + 'ms'))
      }, ms)

      process.on('uncaughtException', uncaughtExceptionHandler)

      this.fn(err => {
        clearTimeout(timer)
        this.duration = new Date - start
        fn(err)
      })
    // sync
    } else {
	    this.fn()
	    this.duration = new Date - start
	    fn()
  	} 
  } catch(err) {
    this.duration = new Date - start
    fn(err)
	}
}

module.exports = Test
