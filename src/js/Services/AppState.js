class AppState {
  constructor() {
    this.subcribers = {};
  }

  watch(entity, watcher) {
    if (this.subcribers[entity]) {
      this.subcribers[entity].push(watcher);
    } else {
      this.subcribers[entity] = [watcher];
    }
  }

  update(entity, value) {
    this.subcribers[entity].forEach(watcher => {
      watcher(value);
    });
  }
}

export default new AppState();
