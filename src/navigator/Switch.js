import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import {routes} from './routes';

const styles = StyleSheet.create({
  container: {
    ...Dimensions.get('window'),
    backgroundColor: 'white',
  },
});

export const Switch = () => {
  const [Route, navigate] = useState(routes.menu);

  return (
    <View style={styles.container}>
      <Route navigate={navigate} />
    </View>
  );
};
