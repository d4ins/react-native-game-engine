import {Dimensions} from 'react-native';

import {MathHelper} from '../../helpers/math_helper';

import {BaseGroup} from './base_group';
import {Obstacle} from './obstacle';

export class FallingObstacles extends BaseGroup {
  tik = 70;

  update = lifecycle => {
    super.update(lifecycle);

    if (lifecycle.tikCounter % this.tik !== 0) {
      return;
    }

    const obstacle = new Obstacle({
      top: -50,
      left: MathHelper.randomize(0, Dimensions.get('window').width - 40),
    });

    lifecycle.addObject(obstacle);
    this.objects.push(obstacle);

    this.render();
  };
}
