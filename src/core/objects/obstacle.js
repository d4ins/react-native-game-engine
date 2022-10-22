import {MathHelper} from '../../helpers/math_helper';

import {Base} from './base';

export class Obstacle extends Base {
  constructor({left, top}) {
    super({
      physicalAttributes: {
        top,
        left,
        width: MathHelper.randomize(40, 150),
        height: 20,
        backgroundColor: 'blue',
      },
      environmentAttributes: {obstacle: true},
      velocity: {vertical: 9},
    });
  }
}
