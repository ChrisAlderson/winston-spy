'use strict';

const sinon = require('sinon');
const Transport = require('winston-transport');
const winston = require('winston');

class SpyTransport extends Transport {
  constructor(options = { level: 'info', spy: sinon.spy() }) {
    super(options);

    this.name = 'spytransport';
    this.spy = options.spy;
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
