import { StyleSheet, I18nManager } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import type { AppTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';

export const createAddIncomeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    headerTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(18),
      color: theme.colors.text.primary,
    },
    content: {
      paddingHorizontal: moderateScale(20),
      paddingBottom: moderateScale(32),
    },
    noteInput: {
      height: moderateScale(96),
      alignItems: 'flex-start',
      paddingVertical: moderateScale(12),
    },
    noteText: {
      textAlignVertical: 'top',
      minHeight: moderateScale(72),
    },
    recurringRow: {
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.card.background,
      borderRadius: moderateScale(14),
      padding: moderateScale(16),
      marginBottom: moderateScale(24),
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
    },
    recurringCopy: {
      flex: 1,
      marginEnd: moderateScale(12),
    },
    recurringLabel: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(15),
      color: theme.colors.text.primary,
      marginBottom: moderateScale(4),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    recurringHint: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(12),
      color: theme.colors.text.secondary,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    submitButton: {
      marginTop: moderateScale(8),
    },
    deleteButton: {
      marginTop: moderateScale(12),
    },
    loader: {
      marginTop: moderateScale(48),
    },
    notFound: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(24),
      gap: moderateScale(16),
    },
    notFoundText: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(15),
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
  });
