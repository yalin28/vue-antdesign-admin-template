class EventEmitter {
  constructor() {
    this.events = {};
  }
  $on(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(fn);
    return this;
  }
  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((fn) => fn(...args));
    }
    return this;
  }
  $off(event, fn) {
    if (!event) {
      this.events = {};
      return this;
    }
    if (!fn) {
      delete this.events[event];
      return this;
    }
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== fn);
    }
    return this;
  }
}

export const events = new EventEmitter();
export default events;
