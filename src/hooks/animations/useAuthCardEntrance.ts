import { useEffect } from 'react';
import {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from 'react-native-reanimated';

import { AUTH_CARD_DELAY, AUTH_SPRING } from '@/screens/auth/shared/authAnimationConfig';

export const useAuthCardEntrance = (translateY = 48) => {
    const opacity = useSharedValue(0);
    const translate = useSharedValue(translateY);

    useEffect(() => {
        opacity.value = withDelay(AUTH_CARD_DELAY, withSpring(1, AUTH_SPRING));
        translate.value = withDelay(AUTH_CARD_DELAY, withSpring(0, AUTH_SPRING));
    }, [opacity, translate, translateY]);

    return useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translate.value }],
    }));
};
