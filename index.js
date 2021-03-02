'use strict';

const Transport = require('winston-transport');
const winston = require('winston');

class SpyTransport extends Transport {
  constructor(options = { level: 'info' }) {
    super(options);

    this.name = 'spytransport';

    if (options.spy) {
      this.spy = options.spy;
    } else {
      const sinon = require('sinon');
      this.spy = sinon.spy();
    }
  }

  log(info, callback = () => {}) {
    this.spy(info);

    setImmediate(() => {
      this.emit('logged', info);
    });

    callback();
    return true;
  }
}

module.exports = winston.transports.SpyTransport = SpyTransport;
