import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...Dimensions.get('window'),
    alignContent: 'center',
    justifyContent: 'center',
  },
});
