import mitt from 'mitt';

const emitter = mitt();

export default class Message {
  static error(message) {
    emitter.emit('message', { type: 'error', message });
  }

  static success(message) {
    emitter.emit('message', { type: 'success', message });
  }
}
