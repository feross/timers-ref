var test = require('tape')
var timers = require('../')

timers.setupProcess()

test('process.on(\'exit\') called when no more setTimeouts exist', function (t) {
  t.plan(2)
  var d = Date.now()
  timers.setTimeout(function () {
    t.pass('timeout got called')
  }, 100)
  process.once('exit', function () {
    t.ok(Date.now() - d >= 100)
  })
})

test('timeout.unref() causes process.on(\'exit\') to get called before all timeouts are done', function (t) {
  t.plan(1)
  var d = Date.now()
  var timeout = timers.setTimeout(function () {}, 100)
  process.once('exit', function () {
    t.ok(Date.now() - d < 100)
  })
  timeout.unref()
})

