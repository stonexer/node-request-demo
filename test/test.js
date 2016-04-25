var http = require('http')
var url = require('url')
var request = require('../index')
var test = require('node-test')
var assert = require('assert')

http.createServer(function (req, res) {
	switch (req.method) {
		case 'GET':
			var query = url.parse(req.url, true).query
			if (req.headers.name) {
				res.setHeader('name', req.headers.name)
			}
			if (query.name) {
				res.end(query.name)
			} else {
				res.end('GET')
			}
			break
		case 'POST':
			var buffers = []
			req.on('data', chunk => {
				buffers.push(chunk)
			})
			req.on('end', () => {
				var data = Buffer.concat(buffers).toString()
				res.end(data || 'POST')
			})
			break
	}
}).listen(1337, '127.0.0.1')

// ==========================================

test('GET', function (done) {
	request({
		url: 'http://127.0.0.1',
		port: 1337
		})
		.then(ret => {
			assert.equal(ret.statusCode, 200)
			assert.equal(ret.body, 'GET')
			done()
		}).catch(err => done(err))
})

test('HEADER SET', function (done) {
	request({
		url: 'http://127.0.0.1',
		port: 1337,
		headers: {
			'name': 'superid'
		}
		})
		.then(ret => {
			assert.equal(ret.statusCode, 200)
			assert.equal(ret.body, 'GET')
			assert.equal(ret.headers.name, 'superid')
			done()
		}).catch(err => done(err))
})

test('GET QUERY', function (done) {
	request({
		url: 'http://127.0.0.1',
		port: 1337,
		qs: {
			name: 'superid'
		}
		})
		.then(ret => {
			assert.equal(ret.statusCode, 200)
			assert.equal(ret.body, 'superid')
			done()
		}).catch(err => done(err))
})

test('POST', function (done) {
	request({
		url: 'http://127.0.0.1',
		port: 1337,
		method: 'POST'
		})
		.then(ret => {
			assert.equal(ret.statusCode, 200)
			assert.equal(ret.body, 'POST')
			done()
		}).catch(err => done(err))
})

test('POST FORM', function (done) {
	request({
		url: 'http://127.0.0.1',
		port: 1337,
		method: 'POST',
		form: {
			name: 'superid'
		}
		})
		.then(ret => {
			assert.equal(ret.statusCode, 200)
			assert.equal(ret.body, 'name=superid')
			done()
		}).catch(err => done(err))
})