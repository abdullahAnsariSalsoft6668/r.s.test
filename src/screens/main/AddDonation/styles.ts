import { StyleSheet } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import type { AppTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';

export const createAddDonationStyles = (theme: AppTheme) =>
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
    fieldLabel: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(14),
      color: theme.colors.text.primary,
      marginBottom: moderateScale(8),
    },
    typeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: moderateScale(8),
      marginBottom: moderateScale(16),
    },
    typeChip: {
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateScale(8),
      borderRadius: moderateScale(20),
      borderWidth: 1,
      borderColor: theme.colors.border.default,
      backgroundColor: theme.colors.card.background,
    },
    typeChipSelected: {
      borderColor: theme.colors.brand.primary,
      backgroundColor: theme.palette.emerald.surface,
    },
    typeChipText: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(13),
      color: theme.colors.text.secondary,
    },
    typeChipTextSelected: {
      color: theme.colors.brand.primary,
      fontFamily: plusJakarta.bold,
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
    pickerWrapper: {
      marginBottom: moderateScale(16),
    },
    pickerField: {
      borderWidth: 1,
      borderColor: theme.colors.border.default,
      borderRadius: moderateScale(12),
      backgroundColor: theme.colors.background.elevated,
      paddingHorizontal: moderateScale(14),
      height: moderateScale(50),
      justifyContent: 'center',
    },
    pickerFieldError: {
      borderColor: theme.colors.status.error,
    },
    pickerText: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(14),
      color: theme.colors.text.primary,
    },
    pickerPlaceholder: {
      color: theme.colors.text.muted,
    },
    errorText: {
      color: theme.colors.status.error,
      fontSize: moderateScale(12),
      marginTop: moderateScale(4),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'flex-end',
    },
    modalSheet: {
      backgroundColor: theme.colors.card.background,
      borderTopLeftRadius: moderateScale(24),
      borderTopRightRadius: moderateScale(24),
      padding: moderateScale(20),
      maxHeight: '70%',
    },
    modalTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(18),
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: moderateScale(16),
    },
    modalList: {
      maxHeight: moderateScale(280),
      marginBottom: moderateScale(12),
    },
    modalOption: {
      padding: moderateScale(14),
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
      marginBottom: moderateScale(8),
    },
    modalOptionSelected: {
      borderColor: theme.colors.brand.primary,
      backgroundColor: theme.palette.emerald.surface,
    },
    modalOptionText: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(15),
      color: theme.colors.text.primary,
    },
  });
