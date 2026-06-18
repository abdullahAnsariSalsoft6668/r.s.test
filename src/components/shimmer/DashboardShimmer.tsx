import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';
import TransactionRowShimmer from './TransactionRowShimmer';

const DashboardShimmer: React.FC = () => {
    const { theme } = useAppTheme();
    const cardStyle = {
        backgroundColor: theme.colors.card.background,
        borderColor: theme.colors.border.subtle,
    };

    return (
        <View style={styles.wrap}>
            <View style={[styles.balanceCard, cardStyle]}>
                <AppShimmerBox variant="onCard" style={styles.balanceLabel} />
                <AppShimmerBox variant="onCard" style={styles.balanceValue} />
                <View style={styles.statsRow}>
                    {[0, 1, 2].map((key) => (
                        <View key={key} style={styles.statBlock}>
                            <AppShimmerBox variant="onCard" style={styles.statLabel} />
                            <AppShimmerBox variant="onCard" style={styles.statValue} />
                        </View>
                    ))}
                </View>
            </View>

            <View style={[styles.card, cardStyle]}>
                <View style={styles.rowBetween}>
                    <AppShimmerBox variant="onCard" style={styles.lineMd} />
                    <AppShimmerBox variant="onCard" style={styles.badge} />
                </View>
                <AppShimmerBox variant="onCard" style={styles.progressBar} />
                <AppShimmerBox variant="onCard" style={styles.lineLg} />
                <AppShimmerBox variant="onCard" style={styles.banner} />
            </View>

            <AppShimmerBox variant="surface" style={styles.sectionTitle} />
            <AppShimmerBox variant="surface" style={styles.sectionSub} />

            <View style={styles.actionsRow}>
                {[0, 1, 2].map((key) => (
                    <View key={key} style={[styles.actionCard, cardStyle]}>
                        <AppShimmerBox variant="onCard" style={styles.actionIcon} />
                        <AppShimmerBox variant="onCard" style={styles.actionTitle} />
                        <AppShimmerBox variant="onCard" style={styles.actionSub} />
                    </View>
                ))}
            </View>

            <AppShimmerBox variant="surface" style={styles.sectionTitle} />
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
    balanceCard: {
        borderRadius: moderateScale(20),
        padding: spaces.medium,
        marginBottom: spaces.medium,
        borderWidth: 1,
    },
    balanceLabel: {
        width: moderateScale(100),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(10),
    },
    balanceValue: {
        width: moderateScale(180),
        height: moderateScale(32),
        borderRadius: moderateScale(8),
        marginBottom: moderateScale(18),
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spaces.small,
    },
    statBlock: {
        flex: 1,
        gap: moderateScale(6),
    },
    statLabel: {
        width: '80%',
        height: moderateScale(10),
        borderRadius: moderateScale(5),
    },
    statValue: {
        width: '60%',
        height: moderateScale(14),
        borderRadius: moderateScale(6),
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
    sectionTitle: {
        width: moderateScale(160),
        height: moderateScale(16),
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(8),
    },
    sectionSub: {
        width: moderateScale(220),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginBottom: spaces.medium,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: spaces.small,
        marginBottom: spaces.large,
    },
    actionCard: {
        flex: 1,
        borderRadius: moderateScale(16),
        padding: moderateScale(12),
        borderWidth: 1,
        alignItems: 'center',
        gap: moderateScale(8),
    },
    actionIcon: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(18),
    },
    actionTitle: {
        width: '90%',
        height: moderateScale(12),
        borderRadius: moderateScale(6),
    },
    actionSub: {
        width: '70%',
        height: moderateScale(10),
        borderRadius: moderateScale(5),
    },
});

export default DashboardShimmer;
