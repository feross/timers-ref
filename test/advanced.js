var test = require('tape')
var timers = require('../')

test('setTimeout with arguments', function (t) {
  t.plan(2)
  var d = Date.now()
  timers.setTimeout(function (arg1, arg2) {
    t.equal(arg1, 'this is arg1')
    t.equal(arg2, 'this is arg2')
  }, 100, 'this is arg1', 'this is arg2')
})

test('setInterval with arguments', function (t) {
  t.plan(10)

  var count = 0
  var d = Date.now()
  var interval = timers.setInterval(function (arg1, arg2) {
    count += 1
    t.equal(arg1, 'this is arg1')
    t.equal(arg2, 'this is arg2')

    if (count === 5) {
      timers.clearInterval(interval)
      t.end()
    }
  }, 100, 'this is arg1', 'this is arg2')
})
