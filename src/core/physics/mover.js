import {Dimensions} from 'react-native';

export class Mover {
  static _instance = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  move = object => {
    this.teleport(object);

    object.physicalAttributes.update({
      top: object.physicalAttributes.state.top + object.velocity.state.vertical,
    });
    object.physicalAttributes.update({
      left:
        object.physicalAttributes.state.left + object.velocity.state.horizontal,
    });
  };

  teleport = object => {
    const rightBoundaries = Dimensions.get('window').width;

    if (object.physicalAttributes.state.left < 0) {
      object.physicalAttributes.update({
        left: rightBoundaries - object.physicalAttributes.state.width,
      });
    }

    if (object.physicalAttributes.state.left > rightBoundaries) {
      object.physicalAttributes.update({left: 0});
    }
  };
}
