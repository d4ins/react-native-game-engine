import React, {useRef, useLayoutEffect} from 'react';
import {
  Button,
  Dimensions,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import {routes} from '../navigator/routes';

import {Lifecycle} from '../core/lifecycle';
import {Player} from '../core/objects/player';
import {WorldBoundaries} from '../core/objects/world_boundaries';
import {FallingObstacles} from '../core/objects/falling_obstacles';
import {Clouds} from '../core/objects/clouds';
import {UserIO} from '../core/user_io';
import {Score} from '../core/services/score';

export const styles = StyleSheet.create({
  container: Dimensions.get('window'),
  navigationContainer: {
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

export const Scene = props => {
  const lifecycleRef = useRef(new Lifecycle({navigate: props.navigate}));
  const worldBoundariesRef = useRef(new WorldBoundaries());
  const fallingObstaclesRef = useRef(new FallingObstacles());
  const cloudsRef = useRef(new Clouds());
  const playerRef = useRef(new Player());
  const scoreRef = useRef(new Score());

  useLayoutEffect(() => {
    const lifecycle = lifecycleRef.current;
    const player = playerRef.current;
    const worldBoundaries = worldBoundariesRef.current;
    const fallingObstacles = fallingObstaclesRef.current;
    const clouds = cloudsRef.current;
    const score = scoreRef.current;

    UserIO.instance.player = player;

    lifecycle.addObjectGroup(worldBoundaries);
    lifecycle.addObjectGroup(fallingObstacles);
    lifecycle.addObjectGroup(clouds);

    lifecycle.addObject(player);

    lifecycle.addService(score);

    lifecycle.start();

    return () => {
      lifecycle.end();
    };
  }, []);

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeUp={UserIO.instance.onSwipeUp}
      onSwipeLeft={UserIO.instance.onSwipeLeft}
      onSwipeRight={UserIO.instance.onSwipeRight}>
      <ImageBackground
        style={styles.container}
        source={require('../assets/background.png')}>
        <Pressable style={styles.container} onPress={UserIO.instance.onPress}>
          <worldBoundariesRef.current.UI />
          <cloudsRef.current.UI />
          <fallingObstaclesRef.current.UI />

          <playerRef.current.UI />

          <scoreRef.current.UI />

          <SafeAreaView style={styles.navigationContainer}>
            <Button
              onPress={() => props.navigate(routes.menu)}
              title="Stop"
              color="white"
              accessibilityLabel="Learn more about this purple button"
            />
          </SafeAreaView>
        </Pressable>
      </ImageBackground>
    </GestureRecognizer>
  );
};
