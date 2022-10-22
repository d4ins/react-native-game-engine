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
    if (!object.environmentAttributes.gravity) {
      return;
    }

    const speed =
      object.velocity.vertical +
      object.physicalAttributes.weight * this.accelerationConstant;

    if (speed > this.maxVelocityConstant) {
      object.velocity.vertical = this.maxVelocityConstant;
      return;
    }

    object.velocity.vertical = speed;
  };
}
