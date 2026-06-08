import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import type { RizqThemeColors } from '@/styles/rizqTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { formatCurrency } from './constants';

interface BalanceCardProps {
    colors: RizqThemeColors;
    balance: number;
    income: number;
    expenses: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ colors, balance, income, expenses }) => (
    <LinearGradient
        colors={[...colors.balanceGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
    >
        <TextComp text="Total Balance" style={styles.label} />
        <TextComp text={formatCurrency(balance)} style={styles.balance} />
        <View style={styles.row}>
            <View style={styles.stat}>
                <TextComp text="Income" style={styles.statLabel} />
                <TextComp text={formatCurrency(income)} style={styles.statValue} />
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
                <TextComp text="Expenses" style={styles.statLabel} />
                <TextComp text={formatCurrency(expenses)} style={styles.statValue} />
            </View>
        </View>
    </LinearGradient>
);

const styles = StyleSheet.create({
    card: {
        borderRadius: moderateScale(20),
        padding: moderateScale(22),
        marginBottom: moderateScale(20),
    },
    label: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
    },
    balance: {
        color: '#FFFFFF',
        fontSize: moderateScale(34),
        fontFamily: plusJakarta.bold,
        marginTop: moderateScale(4),
        marginBottom: moderateScale(18),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: moderateScale(14),
        padding: moderateScale(14),
    },
    stat: { flex: 1 },
    statLabel: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.regular,
        marginBottom: moderateScale(2),
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: moderateScale(16),
        fontFamily: plusJakarta.bold,
    },
    divider: {
        width: 1,
        height: moderateScale(36),
        backgroundColor: 'rgba(255,255,255,0.25)',
        marginHorizontal: moderateScale(14),
    },
});

export default React.memo(BalanceCard);
