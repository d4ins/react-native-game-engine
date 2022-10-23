import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View} from 'react-native';

import {AnimatedAsset} from '../../components/AnimatedAsset';

import {Pointer} from '../../helpers/pointer';

import {Gravity} from '../physics/gravity';
import {Friction} from '../physics/friction';
import {Mover} from '../physics/mover';

import {PhysicalAttributes} from './builders/physical_attributes';
import {EnvironmentAttributes} from './builders/environment_attributes';
import {VelocityAttributes} from './builders/velocity_attributes';
import {AnimationsAttributes} from './builders/animations_attributes';
import {AdditionalPropsAttributes} from './builders/additional_props_attributes';

export class Base extends Pointer {
  physicalAttributes = new PhysicalAttributes();
  environmentAttributes = new EnvironmentAttributes();
  velocity = new VelocityAttributes();
  animations = new AnimationsAttributes();
  additionalProps = new AdditionalPropsAttributes();

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

  constructor(options) {
    super();

    this.physicalAttributes.update(options.physicalAttributes);
    this.environmentAttributes.update(options.environmentAttributes);
    this.velocity.update(options.velocity);
    this.animations.update(options.animations);
    this.additionalProps.update(options.additionalProps);
  }

  set position(value) {
    Object.keys(value).forEach(key => {
      this.physicalAttributes.update({[key]: value[key]});
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
    this.physicalAttributes.update({opacity: 1});
  };

  update = () => {
    if (!this.ref) {
      return;
    }

    Gravity.instance.accelerate(this);
    Friction.instance.brake(this);

    Mover.instance.move(this);

    this.ref.current.setNativeProps({
      ...this.physicalAttributes.state,
    });

    if (this.velocity.state.horizontal === 0 && this.state !== 'idle') {
      this.idle();
    }
  };

  addVelocity = (direction, amount) => {
    this.velocity.update({[direction]: amount});
  };

  handleLayout = event => {
    this.layout = event.nativeEvent.layout;
  };

  render = () => {
    if (!this.setState) {
      return;
    }

    this.setState(this.animations.state[this.state]);
  };

  UI = () => {
    this.ref = useRef();
    const [state, setState] = useState(this.animations.state[this.state]);

    const Component = state ? AnimatedAsset : View;

    useLayoutEffect(() => (this.setState = setState), [setState]);

    return (
      <Component
        ref={this.ref}
        onLayout={this.handleLayout}
        idleAsset={this.animations.state.idle}
        state={this.state}
        assets={state?.set}
        loop={state?.loop}
        frameSpeed={state?.frameSpeed}
        style={{
          ...this.styles,
          ...this.physicalAttributes.state,
        }}
        {...this.additionalProps.state}
      />
    );
  };
}
