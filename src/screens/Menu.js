import React from 'react';
import {View, Button} from 'react-native';

import {routes} from '../navigator/routes';

import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...Dimensions.get('window'),
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export const Menu = ({navigate}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigate(routes.scene)}
        title="Start"
        color="black"
      />
    </View>
  );
};
