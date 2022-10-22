export class UserIO {
  static _instance = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  player = null;

  onSwipeUp = () => {
    this.onPress();
  };

  onSwipeLeft = () => {
    this.player.addVelocity('horizontal', -20);
    this.player.moveLeft();
  };

  onSwipeRight = event => {
    this.player.addVelocity('horizontal', 20);
    this.player.moveRight();
  };

  onPress = () => {
    this.player.idle();
    this.player.addVelocity('vertical', -20);
  };
}
