import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View} from 'react-native';

import {AnimatedAsset} from '../../components/AnimatedAsset';

import {Pointer} from '../../helpers/pointer';

import {Gravity} from '../physics/gravity';
import {Friction} from '../physics/friction';
import {Mover} from '../physics/mover';

export class Base extends Pointer {
  physicalAttributes = {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    weight: 0,
    opacity: 0,
    backgroundColor: 'transparent',
  };

  environmentAttributes = {
    gravity: true,
    colladable: false,
    obstacle: false,
  };

  velocity = {
    vertical: 0,
    horizontal: 0,
  };

  layout = {
    x: 0,
    y: 0,
  };

  ref = null;

  styles = {
    position: 'absolute',
  };

  state = 'idle';

  setState = null;

  animations = {
    idle: null,
    death: null,
    moveLeft: null,
    moveRight: null,
  };

  additionalProps = {};

  constructor(options) {
    super();

    if (options.physicalAttributes) {
      Object.assign(this.physicalAttributes, options.physicalAttributes);
    }

    if (options.environmentAttributes) {
      Object.assign(this.environmentAttributes, options.environmentAttributes);
    }

    if (options.velocity) {
      Object.assign(this.velocity, options.velocity);
    }

    if (options.animations) {
      Object.assign(this.animations, options.animations);
    }

    if (options.additionalProps) {
      Object.assign(this.additionalProps, options.additionalProps);
    }
  }

  set position(value) {
    Object.keys(value).forEach(key => {
      this.physicalAttributes[key] = value[key];
    });
  }

  idle = () => {
    this.state = 'idle';
    this.render();
  };

  moveLeft = () => {
    this.state = 'moveLeft';
    this.render();
  };

  moveRight = () => {
    this.state = 'moveRight';
    this.render();
  };

  death = () => {
    this.state = 'death';
    this.render();
  };

  init = () => {
    this.physicalAttributes.opacity = 1;
  };

  update = () => {
    if (!this.ref) {
      return;
    }

    Gravity.instance.accelerate(this);
    Friction.instance.brake(this);

    Mover.instance.move(this);

    this.ref.current.setNativeProps({
      ...this.physicalAttributes,
    });

    if (this.velocity.horizontal === 0 && this.state !== 'idle') {
      this.idle();
    }
  };

  addVelocity = (direction, amount) => {
    this.velocity[direction] = amount;
  };

  handleLayout = event => {
    this.layout = event.nativeEvent.layout;
  };

  render = () => {
    if (!this.setState) {
      return;
    }

    this.setState(this.animations[this.state]);
  };

  UI = () => {
    this.ref = useRef();
    const [state, setState] = useState(this.animations[this.state]);

    const Component = state ? AnimatedAsset : View;

    useLayoutEffect(() => (this.setState = setState), [setState]);

    return (
      <Component
        ref={this.ref}
        onLayout={this.handleLayout}
        assets={state?.set}
        frameSpeed={state?.frameSpeed}
        style={{
          ...this.styles,
          ...this.physicalAttributes,
        }}
        {...this.additionalProps}
      />
    );
  };
}
