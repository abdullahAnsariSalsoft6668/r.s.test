import React, { useEffect } from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { moderateScale, width } from '@/styles/scaling';

type OnboardingHeroImageProps = {
  source: ImageSourcePropType;
  delayMs?: number;
};

const OnboardingHeroImage: React.FC<OnboardingHeroImageProps> = ({
  source,
  delayMs = 0,
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.92);

  useEffect(() => {
    const timing = {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    };
    opacity.value = withDelay(delayMs, withTiming(1, timing));
    scale.value = withDelay(delayMs, withTiming(1, timing));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayMs]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const heroWidth = width * 0.88;
  const heroHeight = heroWidth * 0.62;

  return (
    <Animated.View style={[styles.wrap, animatedStyle]}>
      <Image
        source={source}
        style={{
          width: heroWidth,
          height: heroHeight,
          borderRadius: moderateScale(20),
        }}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    zIndex: 10,
  },
});

export default OnboardingHeroImage;
