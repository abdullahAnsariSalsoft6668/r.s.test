import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export const DocumentIcon = () => (
    <Svg width={moderateScale(18)} height={moderateScale(18)} viewBox="0 0 24 24" fill="none">
        <Path
            d="M8 3h6l4 4v14H8V3z"
            stroke={Colors.gray500}
            strokeWidth={1.6}
            strokeLinejoin="round"
        />
        <Path d="M14 3v5h5" stroke={Colors.gray500} strokeWidth={1.6} strokeLinejoin="round" />
    </Svg>
);

export const CalendarIcon = () => (
    <Svg width={moderateScale(18)} height={moderateScale(18)} viewBox="0 0 24 24" fill="none">
        <Rect x="4" y="5" width="16" height="15" rx="2" stroke={Colors.gray500} strokeWidth={1.6} />
        <Path d="M8 3v4M16 3v4M4 10h16" stroke={Colors.gray500} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
);

export const ClockIcon = () => (
    <Svg width={moderateScale(18)} height={moderateScale(18)} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="8" stroke={Colors.gray500} strokeWidth={1.6} />
        <Path d="M12 8v5l3 2" stroke={Colors.gray500} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
);

export const LocationIcon = () => (
    <Svg width={moderateScale(18)} height={moderateScale(18)} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
            stroke={Colors.gray500}
            strokeWidth={1.6}
            strokeLinejoin="round"
        />
        <Circle cx="12" cy="10" r="2.5" stroke={Colors.gray500} strokeWidth={1.6} />
    </Svg>
);

export const UploadIcon = () => (
    <Svg width={moderateScale(28)} height={moderateScale(28)} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 16V4m0 0l-4 4m4-4l4 4"
            stroke={Colors.gray500}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            stroke={Colors.gray500}
            strokeWidth={1.8}
            strokeLinecap="round"
        />
    </Svg>
);
