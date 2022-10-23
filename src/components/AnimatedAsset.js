import React, {forwardRef, useEffect, useRef} from 'react';
import {Image} from 'react-native';

export const AnimatedAsset = forwardRef((props, ref) => {
  const intervalRef = useRef();
  const imageRef = useRef(props.assets[0]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const index = props.assets.indexOf(imageRef.current);
      const shouldReset = index === -1;
      const nextIndex = shouldReset ? 0 : index + 1;

      if (nextIndex >= props.assets.length) {
        ref.current.setNativeProps({
          source: [Image.resolveAssetSource(props.idleAsset.set[0])],
        });
        return;
      }

      imageRef.current = props.assets[nextIndex];

      ref.current.setNativeProps({
        source: [Image.resolveAssetSource(imageRef.current)],
      });
    }, props.frameSpeed ?? 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [props.assets, props.frameSpeed, ref]);

  return (
    <Image
      ref={ref}
      source={imageRef.current}
      resizeMode="contain"
      resizeMethod="scale"
      {...props}
    />
  );
});
