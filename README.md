# coinup

- Check if your coin wallet's jsonrpc is active and reachable

> Note: Tihs module does not check if your wallet accepts rpc commands, it only checks if the host:port is reachable

## Install

```
$ npm install coinup --save
```

## Usage

```js
const coinup = require('coinup');

// Promises
coinup('127.0.0.1:8332').then(isup => {
  console.log(isup);
  //=> true
});

// async/await
(async () => {
  const isup = await coinup('localhost:18332')
  console.log(isup)
  //=> true
})()

// callback es6 arrow
coinup('127.0.0.1:8332', (err,isup) => {
  console.log(isup)
  //=> true
})

// callback es5 function
coinup('127.0.0.1:8332', function(err,isup) {
  console.log(isup)
  //=> true
})

// adding timeout, also works on any of the methods above
coinup('127.0.0.1:8332', { timeout: 2000 }, function(err,isup) {
  console.log(isup)
  //=> true
})
```