import { useEffect } from 'react';
import {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from 'react-native-reanimated';

import {
    AUTH_FORM_BASE_DELAY,
    AUTH_SPRING,
    AUTH_STAGGER_STEP,
} from '@/screens/auth/shared/authAnimationConfig';

type AuthStaggerOptions = {
    index?: number;
    baseDelay?: number;
    step?: number;
    translateY?: number;
};

export const useAuthStagger = ({
    index = 0,
    baseDelay = AUTH_FORM_BASE_DELAY,
    step = AUTH_STAGGER_STEP,
    translateY = 22,
}: AuthStaggerOptions = {}) => {
    const opacity = useSharedValue(0);
    const translate = useSharedValue(translateY);

    useEffect(() => {
        const delay = baseDelay + index * step;

        opacity.value = withDelay(delay, withSpring(1, AUTH_SPRING));
        translate.value = withDelay(delay, withSpring(0, AUTH_SPRING));
    }, [baseDelay, index, opacity, step, translate, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translate.value }],
    }));

    return animatedStyle;
};
