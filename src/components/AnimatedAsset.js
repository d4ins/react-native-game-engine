import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';

export const AnimatedAsset = forwardRef((props, ref) => {
  const timeout = useRef();
  const [currentAnimation, setCurrentAnimation] = useState(props.assets[0]);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      const index = props.assets.indexOf(currentAnimation);
      setCurrentAnimation(props.assets[index + 1] ?? props.assets[0]);
    }, props.frameSpeed ?? 1000);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [
    currentAnimation,
    setCurrentAnimation,
    props.assets.length,
    props.assets,
    props.frameSpeed,
  ]);

  return (
    <Image
      ref={ref}
      source={currentAnimation}
      resizeMode="contain"
      resizeMethod="scale"
      {...props}
    />
  );
});
