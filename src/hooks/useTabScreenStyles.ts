import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { theme as staticTheme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

export const useTabScreenStyles = () => {
    const { theme } = useAppTheme();

    return useMemo(
        () =>
            StyleSheet.create({
                screen: {
                    flex: 1,
                    backgroundColor: theme.colors.background.secondary,
                },
                scrollView: {
                    flex: 1,
                    backgroundColor: theme.colors.background.secondary,
                },
                scrollContent: {
                    flexGrow: 1,
                    paddingBottom: moderateScale(120),
                },
                hero: {
                    paddingHorizontal: spaces.medium,
                    paddingBottom: moderateScale(32),
                    overflow: 'hidden',
                    position: 'relative',
                },
                heroPattern: {
                    ...StyleSheet.absoluteFillObject,
                    zIndex: 0,
                },
                heroOrbLarge: {
                    position: 'absolute',
                    top: -moderateScale(40),
                    right: -moderateScale(30),
                    width: moderateScale(160),
                    height: moderateScale(160),
                    borderRadius: moderateScale(80),
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                },
                heroOrbSmall: {
                    position: 'absolute',
                    bottom: moderateScale(20),
                    left: -moderateScale(20),
                    width: moderateScale(90),
                    height: moderateScale(90),
                    borderRadius: moderateScale(45),
                    backgroundColor: 'rgba(201, 162, 39, 0.12)',
                },
                heroContent: {
                    position: 'relative',
                    zIndex: 2,
                    ...Platform.select({
                        android: { elevation: 2 },
                        default: {},
                    }),
                },
                heroTitleRow: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: moderateScale(6),
                },
                heroTitleBlock: {
                    flex: 1,
                    paddingRight: spaces.small,
                },
                pageTitle: {
                    ...staticTheme.typography.h1,
                    color: theme.colors.text.inverse,
                    fontSize: moderateScale(24),
                    lineHeight: moderateScale(30),
                    letterSpacing: -0.3,
                },
                pageSubtitle: {
                    ...staticTheme.typography.body,
                    color: 'rgba(255, 255, 255, 0.78)',
                    marginTop: moderateScale(6),
                    fontSize: moderateScale(14),
                    lineHeight: moderateScale(20),
                },
                heroAction: {
                    width: moderateScale(40),
                    height: moderateScale(40),
                    borderRadius: moderateScale(20),
                    backgroundColor: 'rgba(255, 255, 255, 0.14)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                bodySheet: {
                    backgroundColor: theme.colors.background.secondary,
                    borderTopLeftRadius: moderateScale(28),
                    borderTopRightRadius: moderateScale(28),
                    marginTop: -moderateScale(24),
                    paddingHorizontal: spaces.medium,
                    paddingTop: spaces.large,
                    paddingBottom: spaces.medium,
                },
                card: {
                    backgroundColor: theme.colors.card.background,
                    borderRadius: theme.radius.lg,
                    padding: spaces.medium,
                    marginBottom: spaces.medium,
                    borderWidth: 1,
                    borderColor: theme.colors.border.subtle,
                    ...theme.shadows.card,
                },
                sectionBlock: {
                    marginBottom: spaces.large,
                },
            }),
        [theme],
    );
};
