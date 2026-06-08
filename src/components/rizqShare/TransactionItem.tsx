import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import type { RizqThemeColors } from '@/styles/rizqTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { formatCurrency } from './constants';
import { DonateIcon, ExpenseIcon, IncomeIcon } from './RizqIcons';
import type { Transaction } from './types';

interface TransactionItemProps {
    colors: RizqThemeColors;
    transaction: Transaction;
}

const getIcon = (type: Transaction['type'], colors: RizqThemeColors) => {
    switch (type) {
        case 'income':
            return <IncomeIcon color={colors.income} />;
        case 'expense':
            return <ExpenseIcon color={colors.expense} />;
        case 'donation':
            return <DonateIcon color={colors.donation} />;
    }
};

const getAmountColor = (type: Transaction['type'], colors: RizqThemeColors) => {
    switch (type) {
        case 'income':
            return colors.income;
        case 'expense':
        case 'donation':
            return colors.expense;
    }
};

const TransactionItem: React.FC<TransactionItemProps> = ({ colors, transaction }) => {
    const amountColor = getAmountColor(transaction.type, colors);
    const prefix = transaction.amount >= 0 ? '+' : '-';

    return (
        <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={[styles.iconWrap, { backgroundColor: `${amountColor}15` }]}>
                {getIcon(transaction.type, colors)}
            </View>
            <View style={styles.content}>
                <TextComp text={transaction.title} style={[styles.title, { color: colors.text }]} />
                <TextComp text={transaction.date} style={[styles.date, { color: colors.textMuted }]} />
            </View>
            <TextComp
                text={`${prefix}${formatCurrency(transaction.amount)}`}
                style={[styles.amount, { color: amountColor }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(14),
        borderWidth: 1,
        padding: moderateScale(14),
        marginBottom: moderateScale(10),
    },
    iconWrap: {
        width: moderateScale(42),
        height: moderateScale(42),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(12),
    },
    content: { flex: 1 },
    title: {
        fontSize: moderateScale(15),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(2),
    },
    date: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.regular,
    },
    amount: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.bold,
    },
});

export default React.memo(TransactionItem);
