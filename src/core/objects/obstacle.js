import {MathHelper} from '../../helpers/math_helper';

import {Base} from './base';
import {brick} from '../../assets/brick';

export class Obstacle extends Base {
  constructor({left, top}) {
    super({
      physicalAttributes: {
        top,
        left,
        width: MathHelper.randomize(40, 150),
        height: 20,
        backgroundColor: 'red',
      },
      environmentAttributes: {obstacle: true},
      velocity: {vertical: 9},
      animations: {
        idle: {set: brick, loop: false},
      },
      additionalProps: {
        resizeMode: 'stretch',
      },
    });
  }
}
