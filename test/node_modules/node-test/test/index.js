var test = require('../index.js')
var assert = require('assert')

// 同步功能测试
test('1.同步运行错误', function () {
  assert.euqal(1 + 1, 2)
})

test('2.同步运算错误', function () {
  assert.notEqual(1 + 1, 1)
})

test('3.同步运算正确', function () {
  assert.equal(1 + 1, 2)
})

// 异步功能测试
test('4.异步运行错误', function (done) {
  setTimeout(function () {
    assert.euqal(2 + 2, 4)
    done();
  }, 100)
})

test('5.异步运算错误', function (done) {
  setTimeout(function () {
    assert.equal(1 + 2, 4)
    done();
  }, 100)
})

test('6.异步运算正确', function (done) {
  setTimeout(function () {
    assert.equal(2 + 2, 4)
    done();
  }, 100)
})