const Relay = require('../index');

const relay = new Relay(5);

relay.blink();

setTimeout(() => {
  relay.turnOff();
}, 5000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
