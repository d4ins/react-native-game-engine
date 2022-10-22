import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'black',
    height: 90,
    width: Dimensions.get('window').width,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
});
