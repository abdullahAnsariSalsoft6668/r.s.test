import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';
import TransactionRowShimmer from './TransactionRowShimmer';

const DonateShimmer: React.FC = () => {
    const { theme } = useAppTheme();
    const cardStyle = {
        backgroundColor: theme.colors.card.background,
        borderColor: theme.colors.border.subtle,
    };

    return (
        <View style={styles.wrap}>
            <View style={[styles.card, cardStyle]}>
                <View style={styles.rowBetween}>
                    <AppShimmerBox variant="onCard" style={styles.lineMd} />
                    <AppShimmerBox variant="onCard" style={styles.badge} />
                </View>
                <AppShimmerBox variant="onCard" style={styles.progressBar} />
                <AppShimmerBox variant="onCard" style={styles.lineLg} />
                <AppShimmerBox variant="onCard" style={styles.banner} />
            </View>

            <View style={styles.statsRow}>
                {[0, 1].map((key) => (
                    <View key={key} style={[styles.statCard, cardStyle]}>
                        <AppShimmerBox variant="onCard" style={styles.statLabel} />
                        <AppShimmerBox variant="onCard" style={styles.statValue} />
                    </View>
                ))}
            </View>

            <AppShimmerBox variant="card" style={styles.quoteCard} />

            <AppShimmerBox variant="surface" style={styles.sectionTitle} />
            <AppShimmerBox variant="surface" style={styles.sectionSub} />

            <TransactionRowShimmer />
            <TransactionRowShimmer />
            <TransactionRowShimmer />
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        paddingBottom: spaces.medium,
    },
    card: {
        borderRadius: moderateScale(16),
        padding: spaces.medium,
        marginBottom: spaces.medium,
        borderWidth: 1,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(12),
    },
    lineMd: {
        width: moderateScale(120),
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    badge: {
        width: moderateScale(44),
        height: moderateScale(22),
        borderRadius: moderateScale(20),
    },
    progressBar: {
        width: '100%',
        height: moderateScale(10),
        borderRadius: moderateScale(8),
    },
    lineLg: {
        width: '85%',
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginTop: moderateScale(12),
    },
    banner: {
        width: '100%',
        height: moderateScale(44),
        borderRadius: moderateScale(12),
        marginTop: moderateScale(12),
    },
    statsRow: {
        flexDirection: 'row',
        gap: spaces.small,
        marginBottom: spaces.medium,
    },
    statCard: {
        flex: 1,
        borderRadius: moderateScale(16),
        padding: spaces.medium,
        borderWidth: 1,
        gap: moderateScale(8),
    },
    statLabel: {
        width: '70%',
        height: moderateScale(11),
        borderRadius: moderateScale(5),
    },
    statValue: {
        width: '55%',
        height: moderateScale(18),
        borderRadius: moderateScale(6),
    },
    quoteCard: {
        width: '100%',
        height: moderateScale(96),
        borderRadius: moderateScale(16),
        marginBottom: spaces.large,
    },
    sectionTitle: {
        width: moderateScale(150),
        height: moderateScale(16),
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(8),
    },
    sectionSub: {
        width: moderateScale(200),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginBottom: spaces.medium,
    },
});

export default DonateShimmer;
