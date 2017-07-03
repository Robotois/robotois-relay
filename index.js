const RModule = require('bindings')('RelayModule');
/**
 * Creates an instance of RelayModule.
 * @param {int} port The port number where this component us connected.
 * @returns {RelayModule} RelayModule object
 */
function RelayModule(port) {
  const selft = this;
  this.relay = new RModule(port);
  this.relayStatus = 0;
  // this.blinkStatus = false;
  this.blinkInterval = false;

  process.on('SIGINT', () => {
    selft.relay.release();
  });

  process.on('SIGTERM', () => {
    selft.relay.release();
  });
}

RelayModule.prototype.write = function write(relayValue) {
  this.relayStatus = relayValue;
  this.relay.write(relayValue);
};

RelayModule.prototype.blink = function blink() {
  if (!this.blinkInterval) {
    this.blinkInterval = setInterval(() => {
      this.toggle();
    }, 1000); // cambiar estado cada 1000ms
  }
};

RelayModule.prototype.turnOn = function turnOn() {
  clearInterval(this.blinkInterval);
  this.blinkInterval = false;
  this.write(1);
};

RelayModule.prototype.turnOff = function turnOff() {
  clearInterval(this.blinkInterval);
  this.blinkInterval = false;
  this.write(0);
};

RelayModule.prototype.toggle = function toggle() {
  if (this.relayStatus === 1) {
    this.write(0);
  } else {
    this.write(1);
  }
};

RelayModule.prototype.release = function release() {
  clearInterval(this.blinkInterval);
  this.relay.release();
};

module.exports = RelayModule;
