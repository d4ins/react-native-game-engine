import {useLayoutEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';

import {Pointer} from '../../helpers/pointer';

export class BaseGroup extends Pointer {
  objects = [];

  ref = null;

  setObjects = null;

  styles = {
    ...Dimensions.get('window'),
    position: 'absolute',
    top: 0,
    left: 0,
  };

  get outOfBoundsItems() {
    return this.objects.filter(
      object => object.physicalAttributes.top > Dimensions.get('window').height,
    );
  }

  init = lifecycle => {
    this.objects.map(object => lifecycle.addObject(object));
  };

  update(lifecycle) {
    this.cleanOutOfBoundsItems(lifecycle);
  }

  cleanOutOfBoundsItems(lifecycle) {
    this.outOfBoundsItems.forEach(object => {
      this.objects.splice(this.objects.indexOf(object), 1);
      lifecycle.objects.splice(lifecycle.objects.indexOf(object), 1);
    });
  }

  render = () => {
    if (!this.setObjects) {
      return;
    }

    this.setObjects([...this.objects]);
  };

  UI = () => {
    const [objects, setObjects] = useState(this.objects);

    useLayoutEffect(() => (this.setObjects = setObjects), [setObjects]);

    return (
      <View style={this.styles}>
        {objects.map(object => (
          <object.UI key={object.address} />
        ))}
      </View>
    );
  };
}
