'use strict';

const winston = require('winston');
const SpyTransport = require('.');

describe('SpyTransport', () => {
  const info = {
    message: 'Hello World',
    metadata: {
      hello: 'world'
    },
    level: 'info'
  };
  const spy = jest.fn();
  let consoleTransport;
  let transport;

  beforeEach(() => {
    consoleTransport = new winston.transports.Console({
      silent: true
    });
    transport = new SpyTransport({ spy });

    winston.add(consoleTransport);
    winston.add(transport);
  });

  it('should call spy', () => {
    winston.log(info);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(info);
  });

  it('should be removable', () => {
    winston.remove(transport);
    winston.log(info);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(info);
  });

  afterEach(() => {
    winston.remove(consoleTransport);
    spy.mockClear();
  });
});
