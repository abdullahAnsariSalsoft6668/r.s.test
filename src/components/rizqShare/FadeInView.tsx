import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type FadeInViewProps = {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  style?: StyleProp<ViewStyle>;
};

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  index = 0,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);

  useEffect(() => {
    const startDelay = delay + index * 70;
    opacity.value = withDelay(
      startDelay,
      withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      startDelay,
      withTiming(0, { duration: 420, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, index, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default React.memo(FadeInView);
