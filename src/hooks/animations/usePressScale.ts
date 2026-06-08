import {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

export const usePressScale = () => {
    const scale = useSharedValue(1);

    const onPressIn = () => {
        scale.value = withSpring(0.96, {
            damping: 15,
            stiffness: 200,
        });
    };

    const onPressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 200,
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return {
        animatedStyle,
        onPressIn,
        onPressOut,
    };
};
