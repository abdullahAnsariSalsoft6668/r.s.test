import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import type { RizqThemeColors } from '@/styles/rizqTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { formatCurrency } from './constants';

interface DonationProgressBarProps {
    colors: RizqThemeColors;
    progress: number;
    current: number;
    goal: number;
    title?: string;
    showAmounts?: boolean;
}

const DonationProgressBar: React.FC<DonationProgressBarProps> = ({
    colors,
    progress,
    current,
    goal,
    title = 'Donation Progress',
    showAmounts = true,
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.header}>
                <TextComp text={title} style={[styles.title, { color: colors.text }]} />
                <TextComp text={`${clampedProgress}%`} style={[styles.percent, { color: colors.primary }]} />
            </View>
            <View style={[styles.track, { backgroundColor: colors.progressTrack }]}>
                <View
                    style={[
                        styles.fill,
                        { width: `${clampedProgress}%`, backgroundColor: colors.primary },
                    ]}
                />
            </View>
            {showAmounts && (
                <TextComp
                    text={`${formatCurrency(current)} / ${formatCurrency(goal)}`}
                    style={[styles.amounts, { color: colors.textSecondary }]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: moderateScale(16),
        borderWidth: 1,
        padding: moderateScale(16),
        marginBottom: moderateScale(20),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(15),
        fontFamily: plusJakarta.bold,
    },
    percent: {
        fontSize: moderateScale(15),
        fontFamily: plusJakarta.bold,
    },
    track: {
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: moderateScale(5),
    },
    amounts: {
        marginTop: moderateScale(8),
        fontSize: moderateScale(13),
        fontFamily: plusJakarta.regular,
    },
});

export default React.memo(DonationProgressBar);
