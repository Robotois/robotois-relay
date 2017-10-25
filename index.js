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
  this.blinkInterval = false;

  process.on('SIGINT', () => {
    selft.relay.release();
  });

  process.on('SIGTERM', () => {
    selft.relay.release();
  });
}

RelayModule.prototype.publishNow = function publishNow() {
  this.mqttClient.publish(
    this.myTopic,
    this.blinkInterval ? 'blink' : this.relayStatus.toString(),
  );
};

RelayModule.prototype.setMqttClient = function setMqttClient(mqttConfig) {
  this.mqttClient = mqttConfig.mqttClient;
  this.myTopic = `digitalOutputs/relay${mqttConfig.instance}`;
};

RelayModule.prototype.write = function write(relayValue) {
  switch (relayValue) {
    case 0:
      this.turnOff();
      break;
    case 1:
      this.turnOn();
      break;
    default:
      this.turnOff();
  }
};

RelayModule.prototype.setValue = function setValue(value, notify) {
  this.relay.write(value);
  this.relayStatus = value;
  if (this.mqttClient && notify) {
    this.mqttClient.publish(this.myTopic, value.toString());
  }
};

RelayModule.prototype.blink = function blink() {
  if (!this.blinkInterval) {
    if (this.mqttClient) {
      this.mqttClient.publish(this.myTopic, 'blink');
    }
    this.setValue(1, false);
    this.blinkInterval = setInterval(() => {
      this.toggle();
    }, 1000); // cambiar estado cada 1000ms
  }
};

RelayModule.prototype.turnOn = function turnOn() {
  if (this.blinkInterval) {
    clearInterval(this.blinkInterval);
    this.blinkInterval = false;
    // If it is blinking it could be ON already when trying to set the ON state.
    // This is done to force the MQTT notifications that it has changed from BLINK to ON
    this.setValue(1, true);
    return;
  }

  if (this.relayStatus === 0) {
    this.setValue(1, true);
  }
};

RelayModule.prototype.turnOff = function turnOff() {
  if (this.blinkInterval) {
    clearInterval(this.blinkInterval);
    this.blinkInterval = false;
    // If it is blinking it could be OFF already when trying to set the OFF state.
    // This is done to force the MQTT notifications that it has changed from BLINK to OFF
    this.setValue(0, true);
    return;
  }

  if (this.relayStatus === 1) {
    this.setValue(0, true);
  }
};

RelayModule.prototype.toggle = function toggle() {
  if (this.relayStatus === 1) {
    this.setValue(0, false);
  } else {
    this.setValue(1, false);
  }
};

RelayModule.prototype.release = function release() {
  clearInterval(this.blinkInterval);
  this.relay.release();
};

module.exports = RelayModule;
