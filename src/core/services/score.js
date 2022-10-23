import React, {useRef} from 'react';
import {TextInput} from 'react-native';

import {Base} from './base';

export class Score extends Base {
  score = 0;

  ref = null;

  styles = {
    position: 'absolute',
    top: 50,
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
  };

  update = lifecycle => {
    if (lifecycle.tikCounter % 40 !== 0) {
      return;
    }

    this.score++;
    this.ref.current.setNativeProps({text: `Score ${this.score}`});
  };

  UI = () => {
    this.ref = useRef();

    return (
      <TextInput
        ref={this.ref}
        style={this.styles}
        defaultValue={`Score ${this.score}`}
        editable={false}
      />
    );
  };
}
