# timers-ref [![npm](http://img.shields.io/npm/v/timers-ref.svg)](https://npmjs.org/package/timers-ref)

[![browser support](https://ci.testling.com/feross/timers-ref.png)](https://ci.testling.com/feross/timers-ref)

### `setTimeout` and `setInterval` with `unref` and `ref` like in node.js

Please only use this in the browser, not in node.

## install

```
npm install timers-ref
```

## usage

```js
var timers = require('timers-ref')

timers.setTimeout(function () {
  console.log('hi')
}, 100)

timers.setInterval(function () {
  console.log('hi')
}, 100)

var timeout = timers.setTimeout(function () {}, 100)
timers.clearTimeout(timeout)

var interval = timers.setInterval(function () {}, 100)
timers.clearInterval(interval)
```

If you want to listen to `process.on('exit')` to know when there are no `setTimeout` or `setInterval` timers in the event queue, do this:

```js
timers.setupProcess()

process.once('exit', function (code) {
  console.log('all done')
})
```

Note one important difference: This won't emit process.on('exit') if no setTimeouts or setIntervals are called. Needs at least one call to get things going.

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
