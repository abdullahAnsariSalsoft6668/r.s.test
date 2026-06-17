import { StyleSheet } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import type { AppTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

export const createProfileTabStyles = (theme: AppTheme) =>
  StyleSheet.create({
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: moderateScale(110),
    },
    profileBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radius.lg,
      padding: spaces.medium,
      marginBottom: spaces.large,
      gap: moderateScale(14),
    },
    avatarRing: {
      width: moderateScale(56),
      height: moderateScale(56),
      borderRadius: moderateScale(28),
      backgroundColor: 'rgba(255, 255, 255, 0.35)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    avatarEmoji: {
      fontSize: moderateScale(26),
    },
    bannerText: {
      flex: 1,
    },
    bannerTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(18),
      color: theme.colors.brand.primaryDark,
      marginBottom: moderateScale(2),
    },
    bannerSubtitle: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(13),
      color: theme.colors.brand.primaryDark,
      opacity: 0.75,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.card.background,
      borderRadius: theme.radius.md,
      padding: moderateScale(16),
      marginBottom: moderateScale(10),
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
      ...theme.shadows.soft,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(12),
      flex: 1,
    },
    rowText: {
      flex: 1,
    },
    sectionLabel: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(11),
      color: theme.colors.text.muted,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: moderateScale(12),
      marginTop: moderateScale(4),
    },
    emojiIcon: {
      fontSize: moderateScale(18),
    },
    currencySymbol: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(18),
      color: theme.colors.brand.primary,
    },
    iconWrap: {
      width: moderateScale(44),
      height: moderateScale(44),
      borderRadius: moderateScale(12),
      backgroundColor: theme.palette.emerald.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowTitle: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(15),
      color: theme.colors.text.primary,
      marginBottom: moderateScale(2),
    },
    rowSubtitle: {
      fontFamily: plusJakarta.regular,
      fontSize: moderateScale(12),
      color: theme.colors.text.secondary,
    },
  });
