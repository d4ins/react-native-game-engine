export class Gravity {
  accelerationConstant = 0.3;

  maxVelocityConstant = 200;

  static _instance = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  accelerate = object => {
    if (!object.environmentAttributes.state.gravity) {
      return;
    }

    const speed =
      object.velocity.state.vertical +
      object.physicalAttributes.state.weight * this.accelerationConstant;

    if (speed > this.maxVelocityConstant) {
      object.velocity.state.vertical = this.maxVelocityConstant;
      return;
    }

    object.velocity.update({vertical: speed});
  };
}
