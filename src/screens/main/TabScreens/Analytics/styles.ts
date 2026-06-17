import { StyleSheet } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import type { AppTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

export const createAnalyticsStyles = (theme: AppTheme) =>
  StyleSheet.create({
    scroll: { flex: 1 },
    scrollContent: { flexGrow: 1, paddingBottom: moderateScale(100) },
    loader: { marginVertical: moderateScale(40) },
    scoreRow: {
      flexDirection: 'row',
      gap: moderateScale(8),
      marginBottom: spaces.medium,
    },
    scoreCard: {
      flex: 1,
      backgroundColor: theme.colors.card.background,
      borderRadius: theme.radius.md,
      padding: moderateScale(12),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
      ...theme.shadows.soft,
    },
    scoreLabel: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(11),
      color: theme.colors.text.muted,
      textAlign: 'center',
      marginBottom: moderateScale(4),
    },
    scoreValue: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(16),
      color: theme.colors.brand.primaryDark,
      textAlign: 'center',
    },
    compareCard: {
      backgroundColor: theme.colors.card.background,
      borderRadius: theme.radius.lg,
      padding: spaces.medium,
      marginBottom: spaces.medium,
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
      ...theme.shadows.card,
    },
    sectionTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(16),
      color: theme.colors.text.primary,
      marginBottom: moderateScale(12),
    },
    compareRow: {
      flexDirection: 'row',
      gap: moderateScale(16),
    },
    compareCol: {
      flex: 1,
    },
    compareLabel: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(13),
      color: theme.colors.text.secondary,
      marginBottom: moderateScale(8),
    },
    compareIncome: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(15),
      color: theme.colors.semantic.income,
      marginBottom: moderateScale(4),
    },
    compareDonation: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(15),
      color: theme.colors.semantic.donation,
    },
    trendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(10),
      gap: moderateScale(10),
    },
    trendMonth: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(12),
      color: theme.colors.text.secondary,
      width: moderateScale(44),
    },
    trendBars: {
      flex: 1,
      gap: moderateScale(4),
    },
    trendBar: {
      height: moderateScale(6),
      borderRadius: moderateScale(4),
      minWidth: moderateScale(4),
    },
    incomeBar: { backgroundColor: theme.colors.semantic.income },
    expenseBar: { backgroundColor: theme.colors.semantic.expense },
    donationBar: { backgroundColor: theme.colors.semantic.donation },
    insightCard: {
      backgroundColor: theme.palette.gold.surface,
      borderRadius: theme.radius.md,
      padding: spaces.medium,
      marginTop: spaces.medium,
      borderWidth: 1,
      borderColor: 'rgba(201, 162, 39, 0.25)',
    },
    insightTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(14),
      color: theme.colors.brand.primaryDark,
      marginBottom: moderateScale(8),
    },
    insightBody: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(14),
      color: theme.colors.text.secondary,
      lineHeight: moderateScale(20),
    },
  });
