import { useEffect } from 'react';
import {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from 'react-native-reanimated';

const ENTRANCE_SPRING = {
    damping: 20,
    stiffness: 130,
    mass: 0.9,
} as const;

type EntranceAnimationOptions = {
    index?: number;
    baseDelay?: number;
    step?: number;
    translateY?: number;
    enabled?: boolean;
};

export const useEntranceAnimation = ({
    index = 0,
    baseDelay = 0,
    step = 60,
    translateY = 20,
    enabled = true,
}: EntranceAnimationOptions = {}) => {
    const opacity = useSharedValue(enabled ? 0 : 1);
    const translate = useSharedValue(enabled ? translateY : 0);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const delay = baseDelay + index * step;
        opacity.value = withDelay(delay, withSpring(1, ENTRANCE_SPRING));
        translate.value = withDelay(delay, withSpring(0, ENTRANCE_SPRING));
    }, [baseDelay, enabled, index, opacity, step, translate, translateY]);

    return useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translate.value }],
    }));
};
