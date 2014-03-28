var test = require('tape')
var timers = require('../')

test('setTimeout basic usage', function (t) {
  t.plan(1)
  var d = Date.now()
  timers.setTimeout(function () {
    t.ok(Date.now() - d >= 100)
  }, 100)
})

test('clearTimeout basic usage', function (t) {
  t.plan(1)
  var timeout = timers.setTimeout(function () {
    t.fail('should not get called')
  }, 100)

  setTimeout(function () {
    timers.clearTimeout(timeout)
    t.pass('cleared timeout')
  }, 50)
})

test('setInterval basic usage', function (t) {
  t.plan(5)

  var count = 0
  var d = Date.now()
  var interval = timers.setInterval(function () {
    count += 1
    t.ok(Date.now() - d >= 100 * count)

    if (count === 5) {
      timers.clearInterval(interval)
      t.end()
    }
  }, 100)
})

test('clearInterval basic usage', function (t) {
  t.plan(1)
  var interval = timers.setInterval(function () {
    t.fail('should not get called')
  }, 100)

  setTimeout(function () {
    timers.clearInterval(interval)
    t.pass('cleared interval')
  }, 50)
})
