var paramsSerializer = params => {
  var qs = []
  for (var key in params) {
    qs.push(`${key}=${params[key]}`)
  }
  return encodeURI(qs.join('&'))
}

var parseHttp = http => {
	var ret = {}

	var arr = http.split('\r\n')
	var firstLine = arr.shift()
	parseResponseLine(firstLine, ret)

	arr = arr.join('\r\n').split('\r\n\r\n')
	var headers = arr.shift()
	parseHeaders(headers, ret)

	ret.body = arr.join('\r\n\r\n')

	return ret
}

var parseResponseLine = (line,ret) => {
	var responseExp = /^HTTP\/(\d)\.(\d) (\d{3}) ?(.*)$/

  var match = responseExp.exec(line)
  return ret.statusCode = +match[3]
}

var parseHeaders = (headers, ret) => {
  var parsed = {}

  if (!headers) { return ret.headers = parsed }

  headers.split('\r\n').forEach(line => {
    var i = line.indexOf(':')
    var key = line.substr(0, i).toLowerCase()
    var val = line.substr(i+2)

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
    }
  })

  return ret.headers = parsed
}

module.exports.paramsSerializer = paramsSerializer
module.exports.parseHttp = parseHttp
