import {Alert, LayoutAnimation} from 'react-native';

import {routes} from '../navigator/routes';
import {CollisionDetector} from './physics/collision_detector';

export class Lifecycle {
  inited = false;

  interval = null;

  navigate = null;

  objects = [];

  objectsToInit = [];

  objectsGroup = [];

  services = [];

  frameTime = 1000 / 40;

  tikCounter = 0;

  animationConfig = {
    duration: this.frameTime,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  constructor({navigate}) {
    this.navigate = navigate;
  }

  start() {
    this.services.forEach(helper => helper.init(this));
    this.objectsGroup.forEach(object => object.init(this));
    this.objects.forEach(object => object.init(this));

    this.inited = true;

    this.interval = setInterval(() => {
      this.objectsToInit.forEach(object => object.init(this));
      this.objectsToInit.length = 0;

      LayoutAnimation.configureNext(this.animationConfig);

      this.services.forEach(helper => helper.update(this));
      this.objectsGroup.forEach(object => object.update(this));
      this.objects.forEach(object => object.update(this));

      const hasCollision = CollisionDetector.instance.detect(this.objects);

      this.tikCounter++;

      if (hasCollision) {
        this.gameOver();
        return;
      }
    }, this.frameTime);
  }

  end() {
    clearInterval(this.interval);
  }

  gameOver() {
    Alert.alert('You lost!');
    this.navigate(routes.menu);
  }

  addObject(object) {
    this.objects.push(object);

    if (this.inited) {
      this.objectsToInit.push(object);
    }
  }

  addObjectGroup(object) {
    this.objectsGroup.push(object);
  }

  addService(service) {
    this.services.push(service);
  }
}
