import {Dimensions, View} from 'react-native';

import {MathHelper} from '../../helpers/math_helper';

import {BaseGroup} from './base_group';
import {Cloud} from './cloud';

export class Clouds extends BaseGroup {
  update = lifecycle => {
    super.update(lifecycle);

    if (lifecycle.tikCounter % MathHelper.randomize(50, 150) !== 0) {
      return;
    }

    const cloud = new Cloud({
      top: -70,
      left: MathHelper.randomize(-20, Dimensions.get('window').width - 20),
    });

    lifecycle.addObject(cloud);
    this.objects.push(cloud);

    this.render();
  };
}
