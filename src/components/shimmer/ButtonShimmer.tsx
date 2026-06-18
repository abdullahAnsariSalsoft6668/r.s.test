import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { Colors } from '@/styles/colors';
import { palette } from '@/styles/palette';

type ButtonShimmerProps = {
    /** White spinner for filled/dark buttons */
    inverse?: boolean;
    /** Override spinner color */
    color?: string;
    size?: ActivityIndicatorProps['size'];
};

/** Centered spinner for buttons while submitting. */
const ButtonShimmer: React.FC<ButtonShimmerProps> = ({
    inverse = true,
    color,
    size = 'small',
}) => {
    const indicatorColor = color ?? (inverse ? Colors.white : palette.neutral.text);

    return <ActivityIndicator size={size} color={indicatorColor} />;
};

export default ButtonShimmer;
