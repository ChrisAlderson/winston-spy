'use strict';

const abstractWinstonTransport = require('abstract-winston-transport');
const assume = require('assume');
const winston = require('winston');
const sinon = require('sinon');
const SpyTransport = require('./');

describe('SpyTransport', () => {
  const info = {
    message: 'Hello World',
    metadata: {
      hello: 'world'
    },
    level: 'info'
  };
  const spy = sinon.spy();
  let consoleTransport;
  let transport;

  before(() => {
    consoleTransport = new winston.transports.Console({
      silent: true
    });
    transport = new SpyTransport({ spy });

    winston.add(consoleTransport);
    winston.add(transport);
  });

  describe('abstract-winston-transport', () => {
    it('should pas abstract-winston-transport tests', () => {
      abstractWinstonTransport({
        name: transport.name,
        Transport: SpyTransport
      });
    });
  });

  it('should be added to the winston.transports', () => {
    assume(winston.transports.SpyTransport).exists();
  });

  it('should call spy', () => {
    winston.log(info);
    assume(spy.calledOnce).true();
    assume(spy.calledWith(info)).true();
  });

  it('should be removable', () => {
    winston.remove(transport);
    winston.log(info);
    assume(spy.calledOnce).true();
    assume(spy.calledWith(info)).true();
  });

  after(() => {
    winston.remove(consoleTransport);
  });
});
