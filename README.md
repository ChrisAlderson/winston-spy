# winston-spy

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][dev-david-image]][dev-david-url]

[travis-url]: https://travis-ci.org/ChrisAlderson/winston-spy
[travis-image]: https://travis-ci.org/ChrisAlderson/winston-spy.svg?branch=master
[coverage-url]: https://coveralls.io/github/ChrisAlderson/winston-spy?branch=master
[coverage-image]: https://coveralls.io/repos/github/ChrisAlderson/winston-spy/badge.svg?branch=master
[david-url]: https://david-dm.org/ChrisAlderson/winston-spy
[david-image]: https://david-dm.org/ChrisAlderson/winston-spy.svg
[dev-david-url]: https://david-dm.org/ChrisAlderson/winston-spy?type=dev
[dev-david-image]: https://david-dm.org/ChrisAlderson/winston-spy/dev-status.svg


This tiny module defines a winston transport that can be used to test winston
logging with spies.

## Installation

```bash
 $ npm install --save-dev @chrisalderson/winston-spy sinon
 $ npm install --save winston@next # If you haven't already ;)
```

## Usage

Pass a function to the transport as the `spy` option. This function will be
called whenever `winston.log()` is called.

```js
'use strict';

const winston = require('winston');

// Initialize the transport.
const spyTransport = new winston.transports.SpyTransport();
// Or setup your own spy and pass it down to the constructor like this:
// const spyTransport = new winston.transports.SpyTransport({
//   spy: require('sinon').spy()
// });

// Add the transport the the default winston logger. Or a logger created with
// `winston.createLogger`.
winston.add(spyYransport);

// Access the `spy` via:
spyTransport.spy
````

## Example

Here is an example of how to use the `SpyTransport` in a test-case with
[`mocha`](https://github.com/mochajs/mocha).

```js
'use strict';

const sinon = require('sinon');
const SpyTransport = require('winston-spy');
const winston = require('winston');

describe('SpyTransport', () => {
  let consoleTransport;
  let transport;

  before(() => {
    consoleTransport = new winston.transports.Console({
      silent: true
    });
    transport = new winston.transports.SpyTransport({ spy });

    // This example uses the default logger of winston, but you can also use
    // your own configured logger with `winston.createLogger`.
    winston.add(consoleTransport);
    winston.add(spyTransport);
  });

  it('should call spy', () => {
    const info = {
      message: 'foo',
      level: 'info'
    };
    winston.log(info);

    assume(spy.calledOnce).true();
    assume(.spy.calledWith(info)).true();

    // Or with the default spy of the `SpyTransport` instance.
    // assume(spyTransport.spy.calledOnce).true();
    // assume(spyTransport.spy.calledWith(info)).true();
  });

  after(() => {
    winston.remove(consoleTransport);
    winston.remove(spyTransport);
  });
});
```
