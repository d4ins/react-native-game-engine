import {Dimensions} from 'react-native';

import {Lifecycle} from '../lifecycle';

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
        idle: {set: [idle[0]], frameSpeed: 500, loop: true},
        moveRight: {
          set: moveRight,
          frameSpeed: Lifecycle.frameTime,
          loop: false,
        },
        moveLeft: {
          set: moveLeft,
          frameSpeed: Lifecycle.frameTime,
          loop: false,
        },
      },
      additionalProps: {
        resizeMode: 'cover',
      },
    });
  }
}
