import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import TextComp from '@/components/TextComp';
import ScalePressable from '@/components/rizqShare/ScalePressable';
import TransactionRowActions from '@/components/rizqShare/TransactionRowActions';
import { plusJakarta } from '@/assets/fonts';
import type { TransactionType, UnifiedTransaction } from '@/models/finance.types';
import { DEFAULT_CURRENCY } from '@/constants/currency';
import type { AppCurrency } from '@/constants/currency';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/styles/createAppTheme';
import { formatCurrency } from '@/utils/donationCalculations';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

type TransactionItemProps = {
  transaction: UnifiedTransaction;
  currency?: AppCurrency;
  onPress?: (transaction: UnifiedTransaction) => void;
  onEdit?: (transaction: UnifiedTransaction) => void;
  editLabel?: string;
  editHint?: string;
};

const getTypeMeta = (
  theme: AppTheme,
  isDark: boolean,
): Record<TransactionType, { color: string; bg: string; glyph: string }> => ({
  income: {
    color: theme.colors.semantic.income,
    bg: isDark ? 'rgba(34, 160, 107, 0.2)' : 'rgba(34, 160, 107, 0.12)',
    glyph: '+',
  },
  expense: {
    color: theme.colors.semantic.expense,
    bg: isDark ? 'rgba(220, 76, 76, 0.18)' : 'rgba(220, 76, 76, 0.10)',
    glyph: '−',
  },
  donation: {
    color: theme.colors.semantic.donation,
    bg: theme.palette.emerald.surface,
    glyph: '♡',
  },
});

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  currency = DEFAULT_CURRENCY,
  onPress,
  onEdit,
  editLabel,
  editHint,
}) => {
  const { theme, isDark } = useAppTheme();
  const typeMeta = useMemo(() => getTypeMeta(theme, isDark), [theme, isDark]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.card.background,
          borderRadius: theme.radius.md,
          padding: spaces.medium,
          marginBottom: spaces.small,
          borderWidth: 1,
          borderColor: theme.colors.border.subtle,
          ...theme.shadows.soft,
        },
        iconBadge: {
          width: moderateScale(40),
          height: moderateScale(40),
          borderRadius: moderateScale(12),
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spaces.small,
        },
        iconGlyph: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(16),
        },
        content: {
          flex: 1,
        },
        trailing: {
          alignItems: 'flex-end',
        },
        label: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(14),
          color: theme.colors.text.primary,
        },
        subtitle: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(12),
          color: theme.colors.text.secondary,
          marginTop: moderateScale(2),
        },
        date: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(11),
          color: theme.colors.text.muted,
          marginTop: moderateScale(2),
        },
        amount: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(14),
        },
        editHint: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(10),
          color: theme.colors.brand.primary,
          marginTop: moderateScale(4),
        },
      }),
    [theme],
  );

  const isExpense = transaction.type === 'expense';
  const meta = typeMeta[transaction.type];
  const prefix = isExpense ? '−' : '+';
  const showEditButton = Boolean(onEdit && editLabel);
  const showEditHint = Boolean(!showEditButton && onPress && editHint);
  const handleRowPress = onPress ?? onEdit;

  const content = (
    <>
      <View style={[styles.iconBadge, { backgroundColor: meta.bg }]}>
        <TextComp text={meta.glyph} style={[styles.iconGlyph, { color: meta.color }]} />
      </View>
      <View style={styles.content}>
        <TextComp text={transaction.label} style={styles.label} />
        {transaction.categoryOrRecipient ? (
          <TextComp text={transaction.categoryOrRecipient} style={styles.subtitle} />
        ) : null}
        <TextComp text={transaction.date} style={styles.date} />
      </View>
      <View style={styles.trailing}>
        <TextComp
          text={`${prefix}${formatCurrency(transaction.amount, currency)}`}
          style={[styles.amount, { color: meta.color }]}
        />
        {showEditHint ? <TextComp text={editHint!} style={styles.editHint} /> : null}
      </View>
      {showEditButton ? (
        <TransactionRowActions
          editLabel={editLabel!}
          onEdit={() => onEdit!(transaction)}
        />
      ) : null}
    </>
  );

  if (handleRowPress) {
    return (
      <ScalePressable
        style={styles.row}
        onPress={() => handleRowPress(transaction)}
        accessibilityRole="button"
      >
        {content}
      </ScalePressable>
    );
  }

  return <View style={styles.row}>{content}</View>;
};
