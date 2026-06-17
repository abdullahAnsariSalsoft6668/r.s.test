import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { DEFAULT_CURRENCY } from '@/constants/currency';
import type { AppCurrency } from '@/constants/currency';
import { useAppTheme } from '@/context/ThemeContext';
import { formatCurrency } from '@/utils/donationCalculations';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

type BalanceCardProps = {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savings: number;
  currency?: AppCurrency;
  incomeLabel: string;
  expensesLabel: string;
  savingsLabel: string;
  balanceLabel: string;
};

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  monthlyIncome,
  monthlyExpenses,
  savings,
  currency = DEFAULT_CURRENCY,
  incomeLabel,
  expensesLabel,
  savingsLabel,
  balanceLabel,
}) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          borderRadius: theme.radius.lg,
          marginBottom: spaces.medium,
          overflow: 'hidden',
          ...theme.shadows.card,
        },
        accentBar: {
          height: moderateScale(4),
          width: '100%',
        },
        inner: {
          padding: spaces.medium,
          backgroundColor: theme.colors.card.background,
        },
        balanceLabel: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(13),
          color: theme.colors.text.secondary,
          marginBottom: moderateScale(4),
        },
        balanceValue: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(34),
          color: theme.colors.brand.primaryDark,
          letterSpacing: -0.5,
          marginBottom: moderateScale(14),
        },
        divider: {
          height: 1,
          backgroundColor: theme.colors.border.subtle,
          marginBottom: moderateScale(14),
        },
        row: {
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
        stat: {
          flex: 1,
          alignItems: 'center',
        },
        statDivider: {
          width: 1,
          height: moderateScale(36),
          backgroundColor: theme.colors.border.subtle,
          marginHorizontal: moderateScale(4),
        },
        statLabel: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(10),
          color: theme.colors.text.muted,
          marginBottom: moderateScale(4),
          textAlign: 'center',
        },
        statValue: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(13),
          textAlign: 'center',
        },
        incomeValue: {
          color: theme.colors.semantic.income,
        },
        expenseValue: {
          color: theme.colors.semantic.expense,
        },
        savingsValue: {
          color: theme.colors.semantic.savings,
        },
      }),
    [theme],
  );

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={[...theme.gradients.gold]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.accentBar}
      />
      <LinearGradient
        colors={[...theme.gradients.cardAccent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.inner}
      >
        <TextComp text={balanceLabel} style={styles.balanceLabel} />
        <TextComp text={formatCurrency(balance, currency)} style={styles.balanceValue} />
        <View style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.stat}>
            <TextComp text={incomeLabel} style={styles.statLabel} />
            <TextComp
              text={formatCurrency(monthlyIncome, currency)}
              style={[styles.statValue, styles.incomeValue]}
            />
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <TextComp text={expensesLabel} style={styles.statLabel} />
            <TextComp
              text={formatCurrency(monthlyExpenses, currency)}
              style={[styles.statValue, styles.expenseValue]}
            />
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <TextComp text={savingsLabel} style={styles.statLabel} />
            <TextComp
              text={formatCurrency(savings, currency)}
              style={[styles.statValue, styles.savingsValue]}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
