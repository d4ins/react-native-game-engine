import {cloud} from '../../assets/cloud';
import {Base} from './base';
import {MathHelper} from '../../helpers/math_helper';

export class Cloud extends Base {
  constructor({left, top}) {
    super({
      physicalAttributes: {
        top,
        left,
        width: 181,
        height: 66,
      },
      velocity: {vertical: 2},
      animations: {
        idle: {
          set: [cloud[MathHelper.randomize(0, cloud.length - 1)]],
          loop: false,
        },
      },
    });
  }
}
