import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';
import TransactionRowShimmer from './TransactionRowShimmer';

export type TransactionListShimmerProps = {
    rowCount?: number;
    showFilters?: boolean;
};

const TransactionListShimmer: React.FC<TransactionListShimmerProps> = ({
    rowCount = 6,
    showFilters = true,
}) => {
    const rows = useMemo(
        () => Array.from({ length: rowCount }, (_, index) => `tx-shimmer-${index}`),
        [rowCount],
    );

    return (
        <View style={styles.wrap}>
            {showFilters ? (
                <>
                    <AppShimmerBox variant="surface" style={styles.title} />
                    <AppShimmerBox variant="surface" style={styles.subtitle} />
                    <View style={styles.filtersRow}>
                        {[0, 1, 2, 3].map((key) => (
                            <AppShimmerBox key={key} variant="card" style={styles.filterPill} />
                        ))}
                    </View>
                </>
            ) : null}
            {rows.map((key) => (
                <TransactionRowShimmer key={key} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        paddingBottom: spaces.large,
    },
    title: {
        width: moderateScale(140),
        height: moderateScale(16),
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(8),
    },
    subtitle: {
        width: moderateScale(220),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginBottom: spaces.medium,
    },
    filtersRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spaces.small,
        marginBottom: spaces.medium,
    },
    filterPill: {
        width: moderateScale(72),
        height: moderateScale(34),
        borderRadius: moderateScale(20),
    },
});

export default TransactionListShimmer;
