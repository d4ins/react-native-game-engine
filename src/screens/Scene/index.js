import React, {useRef, useLayoutEffect} from 'react';
import {Dimensions, ImageBackground, Pressable, StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import {Lifecycle} from '../../core/lifecycle';
import {Player} from '../../core/objects/player';
import {WorldBoundaries} from '../../core/objects/world_boundaries';
import {FallingObstacles} from '../../core/objects/falling_obstacles';
import {Clouds} from '../../core/objects/clouds';
import {UserIO} from '../../core/user_io';

import {NavBar} from './NavBar';

export const styles = StyleSheet.create({
  container: Dimensions.get('window'),
});

export const Scene = props => {
  const lifecycleRef = useRef(new Lifecycle({navigate: props.navigate}));
  const worldBoundariesRef = useRef(new WorldBoundaries());
  const fallingObstaclesRef = useRef(new FallingObstacles());
  const cloudsRef = useRef(new Clouds());
  const playerRef = useRef(new Player());

  useLayoutEffect(() => {
    const lifecycle = lifecycleRef.current;
    const player = playerRef.current;
    const worldBoundaries = worldBoundariesRef.current;
    const fallingObstacles = fallingObstaclesRef.current;
    const clouds = cloudsRef.current;

    UserIO.instance.player = player;

    lifecycle.addObjectGroup(worldBoundaries);
    lifecycle.addObjectGroup(fallingObstacles);
    lifecycle.addObjectGroup(clouds);

    lifecycle.addObject(player);

    lifecycle.start();

    return () => {
      lifecycle.end();
    };
  }, []);

  return (
    <GestureRecognizer
      style={styles.container}
      onTap
      onSwipeUp={UserIO.instance.onSwipeUp}
      onSwipeLeft={UserIO.instance.onSwipeLeft}
      onSwipeRight={UserIO.instance.onSwipeRight}>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/background.png')}>
        <Pressable style={styles.container} onPress={UserIO.instance.onPress}>
          <worldBoundariesRef.current.UI />
          <cloudsRef.current.UI />
          <fallingObstaclesRef.current.UI />

          <playerRef.current.UI />

          <NavBar navigate={props.navigate} />
        </Pressable>
      </ImageBackground>
    </GestureRecognizer>
  );
};
