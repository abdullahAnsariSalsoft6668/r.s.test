import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';

export type RecipientListShimmerProps = {
    rowCount?: number;
};

const RecipientListShimmer: React.FC<RecipientListShimmerProps> = ({ rowCount = 5 }) => {
    const { theme } = useAppTheme();
    const rows = useMemo(
        () => Array.from({ length: rowCount }, (_, index) => `recipient-shimmer-${index}`),
        [rowCount],
    );
    const cardStyle = {
        backgroundColor: theme.colors.card.background,
        borderColor: theme.colors.border.subtle,
    };

    return (
        <View style={styles.wrap}>
            <AppShimmerBox variant="card" style={styles.search} />
            {rows.map((key) => (
                <View key={key} style={[styles.card, cardStyle]}>
                    <View style={styles.cardBody}>
                        <AppShimmerBox variant="onCard" style={styles.name} />
                        <AppShimmerBox variant="onCard" style={styles.relationship} />
                    </View>
                    <AppShimmerBox variant="onCard" style={styles.delete} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    search: {
        width: '100%',
        height: moderateScale(48),
        borderRadius: moderateScale(14),
        marginBottom: spaces.medium,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(14),
        padding: spaces.medium,
        borderWidth: 1,
        marginBottom: spaces.small,
    },
    cardBody: {
        flex: 1,
        gap: moderateScale(8),
    },
    name: {
        width: '55%',
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    relationship: {
        width: '35%',
        height: moderateScale(11),
        borderRadius: moderateScale(5),
    },
    delete: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
    },
});

export default RecipientListShimmer;
