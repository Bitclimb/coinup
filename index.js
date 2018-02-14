const assert = require('assert');
const { callbackify } = require('util');
const net = require('net');

const urlParse = u => {
  assert(typeof u === 'string');
  const parts = {};
  const o = u.split(':');
  if (o.length > 1) {
    parts.port = parseInt(o.pop());
  } else {
    parts.port = 80;
  }
  parts.hostname = o.pop().split('//').pop();
  return parts;
};

module.exports = (url, opts, cb) => {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = Object.assign({ timeout: 1000 }, opts);
  assert(typeof opts.timeout === 'number');
  const fn = () => new Promise(resolve => {
    const socket = new net.Socket();
    url = urlParse(url);
    const onError = () => {
      socket.destroy();
      resolve(false);
    };
    socket.setTimeout(opts.timeout);
    socket.on('error', onError);
    socket.on('timeout', onError);
    socket.connect(url.port, url.hostname, () => {
      socket.end();
      resolve(true);
    });
  });
  if (typeof cb === 'function') {
    const cfn = callbackify(fn);
    cfn(cb);
  } else {
    return fn();
  }
};
