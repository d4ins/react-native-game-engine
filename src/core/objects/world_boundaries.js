import {Dimensions} from 'react-native';

import {BaseGroup} from './base_group';
import {Boundaries} from './boundaries';

export class WorldBoundaries extends BaseGroup {
  constructor() {
    super();

    this.objects.push(
      new Boundaries({
        top: Dimensions.get('window').height - 90 - 20,
        left: 0,
      }),
    );
    this.objects.push(
      new Boundaries({
        top: 0,
        left: 0,
      }),
    );
  }
}
