import React, {useEffect} from 'react';
import {View, Button, Platform, UIManager} from 'react-native';

import {routes} from '../../navigator/routes';
import {styles} from './styles';

export const Menu = ({navigate}) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

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
