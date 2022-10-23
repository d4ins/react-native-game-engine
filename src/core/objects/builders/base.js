export class Base {
  state = {};

  constructor(state) {
    this.update(state);
  }

  update(state) {
    if (!state) {
      return;
    }

    Object.assign(this.state, state);
  }
}
