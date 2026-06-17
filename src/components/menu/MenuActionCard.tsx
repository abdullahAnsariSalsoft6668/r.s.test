import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { palette } from '@/styles/palette';
import { theme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

type MenuActionCardProps = {
    label: string;
    variant: 'share' | 'rate';
    onPress?: () => void;
};

const ShareIcon = () => (
    <Svg width={moderateScale(36)} height={moderateScale(36)} viewBox="0 0 36 36" fill="none">
        <Path
            d="M8 22C8 26 11 28 14 28H24C27 28 30 25 30 21V14"
            stroke={palette.yellow.main}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M22 8H30V16"
            stroke={palette.yellow.main}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M30 8L16 22"
            stroke={palette.yellow.main}
            strokeWidth={3}
            strokeLinecap="round"
        />
    </Svg>
);

const RateIcon = () => (
    <View style={styles.rateWrap}>
        <Text style={styles.rateStars}>⭐⭐⭐</Text>
        <Text style={styles.rateGauge}>📊</Text>
    </View>
);

const MenuActionCard: React.FC<MenuActionCardProps> = ({ label, variant, onPress }) => (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        accessibilityRole="button"
    >
        {variant === 'share' ? <ShareIcon /> : <RateIcon />}
        <TextComp text={label} style={styles.label} />
    </Pressable>
);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: theme.colors.card.background,
        borderRadius: theme.radius.lg,
        paddingVertical: moderateScale(22),
        paddingHorizontal: spaces.medium,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.card,
    },
    cardPressed: {
        opacity: 0.85,
    },
    label: {
        marginTop: moderateScale(10),
        fontFamily: plusJakarta.bold,
        fontSize: moderateScale(14),
        color: theme.colors.text.primary,
        textAlign: 'center',
    },
    rateWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: moderateScale(36),
    },
    rateStars: {
        fontSize: moderateScale(12),
        marginBottom: moderateScale(2),
    },
    rateGauge: {
        fontSize: moderateScale(24),
    },
});

export default MenuActionCard;
