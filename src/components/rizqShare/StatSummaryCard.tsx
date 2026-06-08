import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import type { RizqThemeColors } from '@/styles/rizqTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StatSummaryCardProps {
    colors: RizqThemeColors;
    label: string;
    value: string;
    trend?: string;
    trendColor?: string;
    accentColor?: string;
}

const StatSummaryCard: React.FC<StatSummaryCardProps> = ({
    colors,
    label,
    value,
    trend,
    trendColor,
    accentColor,
}) => (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        {accentColor && (
            <View style={[styles.accent, { backgroundColor: accentColor }]} />
        )}
        <TextComp text={label} style={[styles.label, { color: colors.textSecondary }]} />
        <TextComp text={value} style={[styles.value, { color: colors.text }]} />
        {trend && (
            <TextComp text={trend} style={[styles.trend, { color: trendColor ?? colors.primary }]} />
        )}
    </View>
);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: '45%',
        borderRadius: moderateScale(14),
        borderWidth: 1,
        padding: moderateScale(14),
        marginBottom: moderateScale(10),
        overflow: 'hidden',
    },
    accent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: moderateScale(3),
    },
    label: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.regular,
        marginBottom: moderateScale(6),
    },
    value: {
        fontSize: moderateScale(18),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(4),
    },
    trend: {
        fontSize: moderateScale(11),
        fontFamily: plusJakarta.regular,
    },
});

export default React.memo(StatSummaryCard);
