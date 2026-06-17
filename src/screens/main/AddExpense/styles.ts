import { StyleSheet, I18nManager } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import type { AppTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';

export const createAddExpenseStyles = (theme: AppTheme) =>
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
    receiptSection: {
      marginBottom: moderateScale(24),
    },
    receiptLabel: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(14),
      color: theme.colors.text.primary,
      marginBottom: moderateScale(4),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    receiptHint: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(12),
      color: theme.colors.text.secondary,
      marginBottom: moderateScale(12),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    receiptPicker: {
      borderWidth: 1,
      borderColor: theme.colors.border.default,
      borderStyle: 'dashed',
      borderRadius: moderateScale(14),
      paddingVertical: moderateScale(28),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background.elevated,
      gap: moderateScale(8),
    },
    receiptPickerText: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(14),
      color: theme.colors.text.secondary,
    },
    receiptPreviewWrap: {
      position: 'relative',
      borderRadius: moderateScale(14),
      overflow: 'hidden',
    },
    receiptPreview: {
      width: '100%',
      height: moderateScale(180),
      borderRadius: moderateScale(14),
      backgroundColor: theme.colors.background.elevated,
    },
    removeReceiptBtn: {
      position: 'absolute',
      top: moderateScale(10),
      right: moderateScale(10),
      width: moderateScale(32),
      height: moderateScale(32),
      borderRadius: moderateScale(16),
      backgroundColor: 'rgba(0,0,0,0.55)',
      alignItems: 'center',
      justifyContent: 'center',
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
