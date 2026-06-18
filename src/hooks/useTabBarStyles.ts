import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';

export const TAB_ICON_SIZE = moderateScale(22);
export const TAB_BAR_BOTTOM_GAP = moderateScale(8);

export const useTabBarStyles = () => {
    const { theme } = useAppTheme();

    return useMemo(
        () => ({
            tabActiveColor: theme.colors.tab.active,
            tabInactiveColor: theme.colors.tab.inactive,
            tabBarStyles: StyleSheet.create({
                outer: {
                    position: 'absolute',
                    left: moderateScale(12),
                    right: moderateScale(12),
                    bottom: moderateScale(8),
                    backgroundColor: 'transparent',
                },
                bar: {
                    backgroundColor: theme.colors.tab.background,
                    borderRadius: moderateScale(22),
                    paddingTop: moderateScale(8),
                    paddingBottom: moderateScale(6),
                    borderWidth: 1,
                    borderColor: theme.colors.border.subtle,
                    ...Platform.select({
                        ios: {
                            shadowColor: theme.palette.emerald.dark,
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: theme.isDark ? 0.35 : 0.12,
                            shadowRadius: 20,
                        },
                        android: { elevation: 12 },
                        default: {},
                    }),
                },
                tabsRow: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(6),
                },
                tabItem: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: moderateScale(6),
                    minWidth: moderateScale(52),
                    gap: moderateScale(4),
                    borderRadius: moderateScale(16),
                },
                tabItemActive: {
                    backgroundColor: theme.colors.tab.pill,
                },
                activeDot: {
                    width: moderateScale(4),
                    height: moderateScale(4),
                    borderRadius: moderateScale(2),
                    backgroundColor: theme.colors.brand.accent,
                    marginBottom: moderateScale(2),
                },
                tabLabel: {
                    fontSize: moderateScale(10),
                    fontFamily: plusJakarta.regular,
                    textAlign: 'center',
                },
                tabLabelActive: {
                    color: theme.colors.tab.active,
                    fontFamily: plusJakarta.bold,
                },
                tabLabelInactive: {
                    color: theme.colors.tab.inactive,
                },
                donateTabItem: {
                    marginTop: -moderateScale(6),
                },
                donateCircle: {
                    width: moderateScale(44),
                    height: moderateScale(44),
                    borderRadius: moderateScale(22),
                    backgroundColor: theme.colors.brand.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: moderateScale(2),
                    ...Platform.select({
                        ios: {
                            shadowColor: theme.palette.emerald.dark,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: theme.isDark ? 0.35 : 0.25,
                            shadowRadius: 8,
                        },
                        android: { elevation: 6 },
                        default: {},
                    }),
                },
            }),
        }),
        [theme],
    );
};
