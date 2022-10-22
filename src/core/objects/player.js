import {Dimensions} from 'react-native';

import {idle} from '../../assets/hero/idle';
import {moveRight} from '../../assets/hero/move_right';
import {moveLeft} from '../../assets/hero/move_left';

import {Base} from './base';

export class Player extends Base {
  constructor() {
    super({
      physicalAttributes: {
        width: 44,
        height: 64,
        weight: 3,
        top: 150,
        left: Dimensions.get('window').width / 2 - 7,
      },
      environmentAttributes: {gravity: true, colladable: true},
      animations: {
        idle: {set: idle, frameSpeed: 500},
        moveRight: {set: moveRight, frameSpeed: 50},
        moveLeft: {set: moveLeft, frameSpeed: 50},
      },
      additionalProps: {
        resizeMode: 'cover',
      },
    });
  }
}
