const Relay = require('../index');

const relay = new Relay(5);

setInterval(() => {
  relay.toggle();
}, 1000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
