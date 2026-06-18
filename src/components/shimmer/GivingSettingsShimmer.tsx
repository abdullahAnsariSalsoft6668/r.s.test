import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';

const GivingSettingsShimmer: React.FC = () => {
    const { theme } = useAppTheme();
    const cardStyle = {
        backgroundColor: theme.colors.card.background,
        borderColor: theme.colors.border.subtle,
    };

    return (
        <View style={styles.wrap}>
            <AppShimmerBox variant="surface" style={styles.subtitle} />

            <View style={[styles.card, cardStyle]}>
                <View style={styles.percentRow}>
                    <AppShimmerBox variant="onCard" style={styles.percentLabel} />
                    <AppShimmerBox variant="onCard" style={styles.percentValue} />
                </View>
                <AppShimmerBox variant="onCard" style={styles.slider} />
                <View style={styles.stepper}>
                    <AppShimmerBox variant="onCard" style={styles.stepButton} />
                    <AppShimmerBox variant="onCard" style={styles.stepButton} />
                </View>
                <AppShimmerBox variant="onCard" style={styles.basisLabel} />
                <AppShimmerBox variant="onCard" style={styles.basisValue} />
            </View>

            <View style={[styles.previewCard, cardStyle]}>
                <AppShimmerBox variant="onCard" style={styles.previewTitle} />
                <AppShimmerBox variant="onCard" style={styles.previewLine} />
                <AppShimmerBox variant="onCard" style={styles.previewLineShort} />
            </View>

            <AppShimmerBox variant="card" style={styles.saveButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    subtitle: {
        width: '90%',
        height: moderateScale(14),
        borderRadius: moderateScale(6),
        marginBottom: spaces.medium,
    },
    card: {
        borderRadius: moderateScale(16),
        padding: spaces.medium,
        borderWidth: 1,
        marginBottom: spaces.medium,
    },
    percentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spaces.medium,
    },
    percentLabel: {
        width: moderateScale(140),
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    percentValue: {
        width: moderateScale(44),
        height: moderateScale(18),
        borderRadius: moderateScale(6),
    },
    slider: {
        width: '100%',
        height: moderateScale(8),
        borderRadius: moderateScale(8),
        marginBottom: spaces.medium,
    },
    stepper: {
        flexDirection: 'row',
        gap: spaces.small,
        marginBottom: spaces.medium,
    },
    stepButton: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(12),
    },
    basisLabel: {
        width: moderateScale(120),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(8),
    },
    basisValue: {
        width: moderateScale(160),
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    previewCard: {
        borderRadius: moderateScale(16),
        padding: spaces.medium,
        borderWidth: 1,
        marginBottom: spaces.large,
        gap: moderateScale(10),
    },
    previewTitle: {
        width: moderateScale(120),
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    previewLine: {
        width: '100%',
        height: moderateScale(12),
        borderRadius: moderateScale(6),
    },
    previewLineShort: {
        width: '80%',
        height: moderateScale(12),
        borderRadius: moderateScale(6),
    },
    saveButton: {
        width: '100%',
        height: moderateScale(52),
        borderRadius: moderateScale(14),
    },
});

export default GivingSettingsShimmer;
