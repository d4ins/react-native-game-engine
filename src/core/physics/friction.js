export class Friction {
  breakConstant = 2;

  static _instance = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  brake = object => {
    const isZero = object.velocity.horizontal === 0;

    if (isZero) {
      return;
    }

    const isPositive = object.velocity.horizontal > 0;

    const result =
      object.velocity.horizontal +
      (isPositive ? -this.breakConstant : this.breakConstant);
    const isResultOpposite =
      (isPositive && result < 0) || (!isPositive && result > 0);

    object.velocity.horizontal = isResultOpposite ? 0 : result;
  };
}
