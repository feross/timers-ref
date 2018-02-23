# timers-ref [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/feross/timers-ref.svg)](https://greenkeeper.io/)

[npm-image]: https://img.shields.io/npm/v/timers-ref.svg
[npm-url]: https://npmjs.org/package/timers-ref
[downloads-image]: https://img.shields.io/npm/dm/timers-ref.svg
[downloads-url]: https://npmjs.org/package/timers-ref
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

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
