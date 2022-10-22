import React from 'react';
import {Button, SafeAreaView} from 'react-native';

import {routes} from '../../../navigator/routes';

import {styles} from './styles';

export const NavBar = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => props.navigate(routes.menu)}
        title="Stop"
        color="white"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
};
