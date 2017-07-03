const Relay = require('../index');

const relay = new Relay(5);

relay.write(1);
setTimeout(() => {
  relay.write(0);
}, 2000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
