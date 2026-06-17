import { StyleSheet } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import type { AppTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';

export const createTransactionsStyles = (theme: AppTheme) =>
  StyleSheet.create({
    bodySheet: {
      flex: 1,
    },
    filtersRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: moderateScale(8),
      marginBottom: moderateScale(16),
    },
    filterPill: {
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateScale(8),
      borderRadius: moderateScale(20),
      backgroundColor: theme.colors.background.elevated,
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
    },
    filterPillActive: {
      backgroundColor: theme.palette.emerald.surface,
      borderColor: theme.colors.brand.primary,
    },
    filterText: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(13),
      color: theme.colors.text.secondary,
    },
    filterTextActive: {
      fontFamily: plusJakarta.bold,
      color: theme.colors.brand.primary,
    },
    loader: {
      marginTop: moderateScale(40),
    },
    listContent: {
      paddingBottom: moderateScale(160),
      flexGrow: 1,
    },
    emptyActions: {
      gap: moderateScale(10),
    },
    emptyBtn: {
      width: '100%',
    },
  });
