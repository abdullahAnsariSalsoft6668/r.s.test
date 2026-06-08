import { useEffect } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';

interface FadeSlideOptions {
    duration?: number;
    delay?: number;
    translateY?: number;
}

export const useFadeSlide = ({
    duration = 300,
    delay = 0,
    translateY = 20,
}: FadeSlideOptions = {}) => {
    const opacity = useSharedValue(0);
    const translate = useSharedValue(translateY);

    useEffect(() => {
        const timingConfig = { duration, easing: Easing.out(Easing.ease) };
        opacity.value = delay
            ? withDelay(delay, withTiming(1, timingConfig))
            : withTiming(1, timingConfig);
        translate.value = delay
            ? withDelay(delay, withTiming(0, timingConfig))
            : withTiming(0, timingConfig);
    }, [delay, duration]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translate.value }],
    }));

    return { animatedStyle };
};
