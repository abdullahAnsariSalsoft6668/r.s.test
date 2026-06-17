import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';

type DonationProgressBarProps = {
  progress: number;
  fillColors?: readonly [string, string];
};

const DonationProgressBar: React.FC<DonationProgressBarProps> = ({
  progress,
  fillColors,
}) => {
  const { theme } = useAppTheme();
  const resolvedFillColors = fillColors ?? theme.gradients.progress;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        track: {
          height: moderateScale(10),
          borderRadius: moderateScale(10),
          backgroundColor: theme.colors.border.subtle,
          overflow: 'hidden',
        },
        fill: {
          height: '100%',
          borderRadius: moderateScale(10),
          overflow: 'hidden',
        },
        fillGradient: {
          flex: 1,
          borderRadius: moderateScale(10),
        },
      }),
    [theme],
  );

  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const widthProgress = useSharedValue(0);

  useEffect(() => {
    widthProgress.value = withTiming(clampedProgress, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    });
  }, [clampedProgress, widthProgress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${widthProgress.value * 100}%`,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, fillStyle]}>
        <LinearGradient
          colors={[...resolvedFillColors]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.fillGradient}
        />
      </Animated.View>
    </View>
  );
};

export default React.memo(DonationProgressBar);
