import MyIcons, { IconName } from '@/components/MyIcons';
import React, { useEffect, useMemo } from 'react';
import { I18nManager, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import type { EntranceFrom } from './onboardingCollageConfig';
import { ORB_ANIMATION_DURATION_MS } from './onboardingCollageConfig';
import { moderateScale } from '@/styles/scaling';

const FLY_MAG = moderateScale(220);

function initialOffset(from: EntranceFrom, rtl: boolean): { x: number; y: number } {
  switch (from) {
    case 'top':
      return { x: 0, y: -FLY_MAG };
    case 'bottom':
      return { x: 0, y: FLY_MAG };
    case 'left':
      return { x: rtl ? FLY_MAG : -FLY_MAG, y: 0 };
    case 'right':
      return { x: rtl ? -FLY_MAG : FLY_MAG, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export type OnboardingIconOrbProps = {
  iconName: IconName;
  iconColor: string;
  backgroundColor: string;
  diameter: number;
  leftPct: number;
  topPct: number;
  zIndex: number;
  from: EntranceFrom;
  delayMs: number;
  containerStyle?: ViewStyle;
};

const OnboardingIconOrb: React.FC<OnboardingIconOrbProps> = ({
  iconName,
  iconColor,
  backgroundColor,
  diameter,
  leftPct,
  topPct,
  zIndex,
  from,
  delayMs,
  containerStyle,
}) => {
  const rtl = I18nManager.isRTL;
  const init = useMemo(() => initialOffset(from, rtl), [from, rtl]);

  const translateX = useSharedValue(init.x);
  const translateY = useSharedValue(init.y);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timing = {
      duration: ORB_ANIMATION_DURATION_MS,
      easing: Easing.out(Easing.cubic),
    };
    opacity.value = withDelay(delayMs, withTiming(1, timing));
    translateX.value = withDelay(delayMs, withTiming(0, timing));
    translateY.value = withDelay(delayMs, withTiming(0, timing));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- shared values are stable refs
  }, [delayMs]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  const half = diameter / 2;
  const iconSize = diameter * 0.46;
  const positionStyle: ViewStyle = {
    position: 'absolute',
    top: `${topPct}%` as `${number}%`,
    marginTop: -half,
    zIndex,
    width: diameter,
    height: diameter,
    ...(rtl
      ? { right: `${100 - leftPct}%`, marginRight: -half }
      : { left: `${leftPct}%`, marginLeft: -half }),
  };

  return (
    <Animated.View style={[positionStyle, animatedStyle, containerStyle]}>
      <View
        style={[
          styles.circle,
          {
            width: diameter,
            height: diameter,
            borderRadius: half,
            backgroundColor,
          },
        ]}
      >
        <MyIcons name={iconName} size={iconSize} stroke={iconColor} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingIconOrb;
