import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import { useAppTheme } from '@/context/ThemeContext';

import { getShimmerColors, getThemedShimmerColors, type ShimmerPalette, type ShimmerVariant } from './shimmerColors';

export type AppShimmerBoxProps = {
    style?: StyleProp<ViewStyle>;
    /** Legacy palette for grocery shimmers */
    palette?: ShimmerPalette;
    /** RizqShare theme variant — used when `palette` is omitted */
    variant?: ShimmerVariant;
};

const AppShimmerBox: React.FC<AppShimmerBoxProps> = ({ style, palette, variant = 'surface' }) => {
    const { isDark, theme } = useAppTheme();
    const shimmerColors = palette ? getShimmerColors(palette) : getThemedShimmerColors(isDark, variant);

    return (
        <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={[
                styles.base,
                { backgroundColor: palette ? undefined : theme.colors.background.secondary },
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    base: {
        overflow: 'hidden',
    },
});

export default AppShimmerBox;
