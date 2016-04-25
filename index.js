var net = require('net')
var url = require('url')

var paramsSerializer = require('./lib/utils').paramsSerializer
var parseHttp = require('./lib/utils').parseHttp

function request(options) {
	var parsed = url.parse(options.url || 'http://www.superid.me')
	var defaultHeaders = {}

	options.path = parsed.path
	options.method = options.method || 'GET'
	options.qs = options.qs || null
	options.form = paramsSerializer(options.form) || null

	if(options.form) {
		defaultHeaders['content-type'] = 'text/plain'
		defaultHeaders['content-length'] = options.form.length
	}
	options.headers = options.headers || defaultHeaders

	var port = options.port || 80
	var host = options.host = parsed.host

	var socket = net.connect({
		host, port
	}, function () {
		var requestData = 
			options.method + ' ' + options.path + (options.qs ? ('?'+paramsSerializer(options.qs)) : '') + ' HTTP/1.1\r\n' +
	  	'Host: ' + options.host + '\r\n'

	  for(var prop in options.headers) {
	  	requestData += prop + ': ' + options.headers[prop] + '\r\n'
	  }

	  requestData += '\r\n'

	  if(options.form) {
	  	requestData += options.form
	  }

	  socket.end(requestData)
	})

	return new Promise((resolve, reject) => {
		var buffers = []
		socket.on('data', chunk => {
		  buffers.push(chunk)
		})
		socket.on('end', () => {
			try {
				resolve(parseHttp(Buffer.concat(buffers).toString()))
			} catch(err) {
				reject('文档流解析错误')
			}
		})
		socket.on('error', err => reject(err))
	})
}

module.exports = request
