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

    object.physicalAttributes.top =
      object.physicalAttributes.top + object.velocity.vertical;
    object.physicalAttributes.left =
      object.physicalAttributes.left + object.velocity.horizontal;
  };

  teleport = object => {
    const rightBoundaries = Dimensions.get('window').width;

    if (object.physicalAttributes.left < 0) {
      object.physicalAttributes.left =
        rightBoundaries - object.physicalAttributes.width;
    }

    if (object.physicalAttributes.left > rightBoundaries) {
      object.physicalAttributes.left = 0;
    }
  };
}
