import { StyleSheet } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import type { AppTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

export const createHomeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: moderateScale(110),
    },
    loader: {
      marginVertical: moderateScale(48),
    },
    progressCard: {
      backgroundColor: theme.colors.card.background,
      borderRadius: theme.radius.lg,
      padding: spaces.medium,
      marginBottom: spaces.medium,
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
      ...theme.shadows.card,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: moderateScale(12),
    },
    progressTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(16),
      color: theme.colors.text.primary,
    },
    percentBadge: {
      backgroundColor: theme.palette.emerald.surface,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(4),
      borderRadius: moderateScale(20),
    },
    progressPercent: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(14),
      color: theme.colors.brand.primary,
    },
    progressSubtext: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(13),
      color: theme.colors.text.secondary,
      marginTop: moderateScale(12),
      lineHeight: moderateScale(18),
    },
    remainingBanner: {
      marginTop: moderateScale(12),
      backgroundColor: theme.palette.gold.surface,
      borderRadius: moderateScale(12),
      padding: moderateScale(12),
      borderWidth: 1,
      borderColor: 'rgba(201, 162, 39, 0.2)',
    },
    remainingText: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(14),
      color: theme.colors.brand.primaryDark,
      lineHeight: moderateScale(20),
    },
    goalMet: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(14),
      color: theme.colors.brand.success,
      marginTop: moderateScale(12),
    },
    sectionTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(16),
      color: theme.colors.text.primary,
      marginBottom: moderateScale(12),
    },
    actionsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: moderateScale(8),
      marginBottom: spaces.large,
    },
    recentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: moderateScale(4),
    },
    viewAllBtn: {
      paddingTop: moderateScale(2),
    },
    viewAll: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(13),
      color: theme.colors.brand.primary,
    },
    emptyText: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(14),
      color: theme.colors.text.secondary,
      textAlign: 'center',
      paddingVertical: moderateScale(24),
    },
  });
