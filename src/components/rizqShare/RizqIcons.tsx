import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

export const RizqLeafIcon = ({ size = 24, color = '#2D5A27' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C8 6 4 8 4 14c0 4 3.5 7 8 8 4.5-1 8-4 8-8 0-6-4-8-8-12z"
            fill={color}
        />
        <Path d="M12 22V10" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
);

export const IncomeIcon = ({ size = 22, color = '#2D5A27' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} fill={`${color}22`} />
        <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
);

export const ExpenseIcon = ({ size = 22, color = '#DC2626' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={10} fill={`${color}22`} />
        <Path d="M8 12h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
);

export const DonateIcon = ({ size = 22, color = '#CA8A04' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 21s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z"
            fill={`${color}33`}
            stroke={color}
            strokeWidth={1.5}
        />
    </Svg>
);

export const ReceiptIcon = ({ size = 22, color = '#2D5A27' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x={6} y={3} width={12} height={18} rx={2} fill={`${color}22`} stroke={color} strokeWidth={1.5} />
        <Path d="M9 8h6M9 12h6M9 16h4" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
);

export const MosqueIcon = ({ size = 120, color = '#2D5A27' }: IconProps) => (
    <Svg width={size} height={size * 0.7} viewBox="0 0 160 100" fill="none">
        <Circle cx={80} cy={18} r={12} fill="#FBBF24" />
        <Path d="M68 18c6-8 18-8 24 0" stroke="#FBBF24" strokeWidth={2} fill="none" />
        <Rect x={55} y={38} width={50} height={45} rx={4} fill={color} />
        <Path d="M45 83h70" stroke={color} strokeWidth={3} strokeLinecap="round" />
        <Rect x={72} y={55} width={16} height={28} rx={2} fill="#1E3D1A" />
        <Circle cx={40} cy={50} r={6} fill={color} />
        <Circle cx={120} cy={50} r={6} fill={color} />
        <Path d="M40 50v33M120 50v33" stroke={color} strokeWidth={3} />
    </Svg>
);

export const HeartFabIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 21s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z"
            fill={color}
        />
    </Svg>
);
