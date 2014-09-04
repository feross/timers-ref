var EventEmitter = require('events').EventEmitter

var timeouts = []
var intervals = []

function Timeout (cb, time, args) {
  var self = this

  self._timeout = window.setTimeout(function () {
    if (typeof cb === 'function') {
      cb.apply(undefined, args)
    }
    if (this._ref) {
      timeouts.splice(timeouts.indexOf(this._timeout), 1)
    }
    self._timeout = null
    checkExited()
  }, time)

  self._ref = true
  timeouts.push(self._timeout)
}

Timeout.prototype.unref = function () {
  if (this._ref && this._timeout) {
    timeouts.splice(timeouts.indexOf(this._timeout), 1)
    this._ref = false
    checkExited()
  }
}

Timeout.prototype.ref = function () {
  if (!this._ref && this._timeout) {
    timeouts.push(this.timeout)
  }
}

function Interval (cb, time, args) {
  var self = this

  self._interval = window.setInterval(function () {
    if (typeof cb === 'function') {
      cb.apply(undefined, args)
    }
  }, time)

  self._ref = true
  intervals.push(self._interval)
}

Interval.prototype.unref = function () {
  if (this._ref && this._interval) {
    intervals.splice(intervals.indexOf(this._interval), 1)
    this._ref = false
    checkExited()
  }
}

Interval.prototype.ref = function () {
  if (!this._ref && this._interval) {
    intervals.push(this.interval)
  }
}

function _setTimeout (cb, time) {
  var args = Array.prototype.slice.call(arguments, 2)
  return new Timeout(cb, time, args)
}

function _clearTimeout (timeout) {
  if (!(timeout instanceof Timeout)) return

  if (timeout._timeout) {
    clearTimeout(timeout._timeout)
  }
  timeout.unref()
}

function _setInterval (cb, time) {
  var args = Array.prototype.slice.call(arguments, 2)
  return new Interval(cb, time, args)
}

function _clearInterval (interval) {
    if (interval._interval) {
    clearInterval(interval._interval)
  }
  interval.unref()
}

function checkExited () {
  if (timeouts.length && intervals.length === 0) {
    process.emit('exit', 0)
  }
}

if (typeof setTimeout === 'function') exports.setTimeout = _setTimeout
if (typeof clearTimeout === 'function') exports.clearTimeout = _clearTimeout
if (typeof setInterval === 'function') exports.setInterval = _setInterval
if (typeof clearInterval === 'function') exports.clearInterval = _clearInterval

// TODO: track this too
exports.setImmediate = require('process/browser.js').nextTick

/**
 * Turn the `process` object into an EventEmitter, so the user can use process.on('exit')
 */
exports.setupProcess = function () {
  if (typeof process === 'undefined') {
    global.process = require('process/')
  }
  process.on = EventEmitter.prototype.on
  process.addListener = EventEmitter.prototype.addListener
  process.once = EventEmitter.prototype.once
  process.off = EventEmitter.prototype.off
  process.removeListener = EventEmitter.prototype.removeListener
  process.emit = EventEmitter.prototype.emit
  EventEmitter.call(process)
}

/**
 * The timers module also includes some private methods used in some node modules:
 *
 * These are used to efficiently support a large quanity of timers with the same
 * timeouts by creating only a few timers under the covers.
 */

exports.enroll = function (item, delay) {
  item._timeoutID = _setTimeout(item._onTimeout, delay)
}

exports.unenroll = function (item) {
  clearTimeout(item._timeoutID)
}

exports.active = function (item) {
  // our naive impl doesn't care (correctness is still preserved)
}
