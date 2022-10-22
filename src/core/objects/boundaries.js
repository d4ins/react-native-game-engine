import {Base} from './base';
import {Dimensions} from 'react-native';

export class Boundaries extends Base {
  constructor({top, left}) {
    super({
      physicalAttributes: {
        top,
        left,
        width: Dimensions.get('window').width,
        height: 20,
      },
      environmentAttributes: {gravity: false, obstacle: true},
    });
  }
}
