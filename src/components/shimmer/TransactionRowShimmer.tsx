import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';

const TransactionRowShimmer: React.FC = () => {
    const { theme } = useAppTheme();

    return (
        <View
            style={[
                styles.row,
                {
                    backgroundColor: theme.colors.card.background,
                    borderColor: theme.colors.border.subtle,
                },
            ]}
        >
            <AppShimmerBox variant="onCard" style={styles.icon} />
            <View style={styles.body}>
                <AppShimmerBox variant="onCard" style={styles.title} />
                <AppShimmerBox variant="onCard" style={styles.subtitle} />
            </View>
            <AppShimmerBox variant="onCard" style={styles.amount} />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spaces.medium,
        borderRadius: moderateScale(16),
        borderWidth: 1,
        marginBottom: spaces.small,
    },
    icon: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        marginRight: spaces.small,
    },
    body: {
        flex: 1,
        gap: moderateScale(8),
    },
    title: {
        width: '55%',
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    subtitle: {
        width: '35%',
        height: moderateScale(11),
        borderRadius: moderateScale(6),
    },
    amount: {
        width: moderateScale(56),
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
});

export default TransactionRowShimmer;
