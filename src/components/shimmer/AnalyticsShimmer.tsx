import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';

const AnalyticsShimmer: React.FC = () => {
    const { theme } = useAppTheme();
    const cardStyle = {
        backgroundColor: theme.colors.card.background,
        borderColor: theme.colors.border.subtle,
    };

    return (
        <View style={styles.wrap}>
            <View style={styles.scoreRow}>
                {[0, 1, 2].map((key) => (
                    <View key={key} style={[styles.scoreCard, cardStyle]}>
                        <AppShimmerBox variant="onCard" style={styles.scoreLabel} />
                        <AppShimmerBox variant="onCard" style={styles.scoreValue} />
                    </View>
                ))}
            </View>

            <View style={[styles.compareCard, cardStyle]}>
                <AppShimmerBox variant="onCard" style={styles.sectionTitle} />
                <View style={styles.compareRow}>
                    {[0, 1].map((key) => (
                        <View key={key} style={styles.compareCol}>
                            <AppShimmerBox variant="onCard" style={styles.compareLabel} />
                            <AppShimmerBox variant="onCard" style={styles.compareValue} />
                            <AppShimmerBox variant="onCard" style={styles.compareValueSm} />
                        </View>
                    ))}
                </View>
            </View>

            <AppShimmerBox variant="surface" style={styles.sectionTitle} />

            {[0, 1, 2, 3].map((key) => (
                <View key={key} style={styles.trendRow}>
                    <AppShimmerBox variant="surface" style={styles.trendMonth} />
                    <AppShimmerBox variant="card" style={styles.trendBar} />
                </View>
            ))}

            <View style={[styles.insightCard, cardStyle]}>
                <AppShimmerBox variant="onCard" style={styles.insightTitle} />
                <AppShimmerBox variant="onCard" style={styles.insightLine} />
                <AppShimmerBox variant="onCard" style={styles.insightLineShort} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        paddingBottom: spaces.medium,
    },
    scoreRow: {
        flexDirection: 'row',
        gap: spaces.small,
        marginBottom: spaces.medium,
    },
    scoreCard: {
        flex: 1,
        borderRadius: moderateScale(16),
        padding: moderateScale(12),
        borderWidth: 1,
        gap: moderateScale(8),
    },
    scoreLabel: {
        width: '90%',
        height: moderateScale(10),
        borderRadius: moderateScale(5),
    },
    scoreValue: {
        width: '65%',
        height: moderateScale(18),
        borderRadius: moderateScale(6),
    },
    compareCard: {
        borderRadius: moderateScale(16),
        padding: spaces.medium,
        marginBottom: spaces.medium,
        borderWidth: 1,
    },
    sectionTitle: {
        width: moderateScale(160),
        height: moderateScale(16),
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(12),
    },
    compareRow: {
        flexDirection: 'row',
        gap: spaces.medium,
    },
    compareCol: {
        flex: 1,
        gap: moderateScale(8),
    },
    compareLabel: {
        width: '70%',
        height: moderateScale(11),
        borderRadius: moderateScale(5),
    },
    compareValue: {
        width: '80%',
        height: moderateScale(16),
        borderRadius: moderateScale(6),
    },
    compareValueSm: {
        width: '60%',
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spaces.small,
        marginBottom: moderateScale(12),
    },
    trendMonth: {
        width: moderateScale(36),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
    },
    trendBar: {
        flex: 1,
        height: moderateScale(28),
        borderRadius: moderateScale(8),
    },
    insightCard: {
        borderRadius: moderateScale(16),
        padding: spaces.medium,
        borderWidth: 1,
        gap: moderateScale(10),
        marginTop: spaces.small,
    },
    insightTitle: {
        width: moderateScale(130),
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    insightLine: {
        width: '100%',
        height: moderateScale(12),
        borderRadius: moderateScale(6),
    },
    insightLineShort: {
        width: '75%',
        height: moderateScale(12),
        borderRadius: moderateScale(6),
    },
});

export default AnalyticsShimmer;
