import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';

import {routes} from './routes';

export const Switch = () => {
  const [Route, navigate] = useState(routes.menu);

  return (
    <View style={Dimensions.get('window')}>
      <Route navigate={navigate} />
    </View>
  );
};
