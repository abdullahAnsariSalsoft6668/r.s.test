import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

type RouteProgressBarProps = {
    progress: number;
    delay?: number;
    fillColors?: readonly [string, string];
};

const RouteProgressBar: React.FC<RouteProgressBarProps> = ({
    progress,
    delay = 0,
    fillColors = ['#A30000', '#5C0000'],
}) => {
    const animatedProgress = useSharedValue(0);

    useEffect(() => {
        animatedProgress.value = withDelay(
            delay,
            withTiming(Math.min(Math.max(progress, 0), 1), { duration: 900 }),
        );
    }, [animatedProgress, delay, progress]);

    const fillStyle = useAnimatedStyle(() => ({
        width: `${animatedProgress.value * 100}%`,
    }));

    return (
        <View style={styles.track}>
            <Animated.View style={[styles.fill, fillStyle]}>
                <LinearGradient
                    colors={[...fillColors]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.fillGradient}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    track: {
        height: moderateScale(6),
        borderRadius: moderateScale(6),
        backgroundColor: Colors.gray100,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: moderateScale(6),
        overflow: 'hidden',
    },
    fillGradient: {
        flex: 1,
        borderRadius: moderateScale(6),
    },
});

export default React.memo(RouteProgressBar);
