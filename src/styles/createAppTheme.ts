import { Platform } from 'react-native';

import { palette } from '@/styles/palette';
import { moderateScale } from '@/styles/scaling';
import { borders, spaces } from '@/styles/sizes';
import { typography } from '@/styles/typography';
import type { ThemeMode } from '@/typings/global';

const darkNeutral = {
    white: '#1E2A26',
    black: '#000000',
    text: '#F0F4F2',
    textSecondary: '#A8B5AF',
    textMuted: '#7A8781',
    border: '#2E3A36',
    background: '#0F1614',
    screen: '#141C19',
    cream: '#1A2420',
    gray50: '#1A2420',
    gray100: '#242E2A',
    gray200: '#2E3A36',
    gray300: '#4A5652',
    gray400: '#8A9690',
    gray500: '#B0BAB5',
} as const;

const darkEmerald = {
    ...palette.emerald,
    surface: 'rgba(21, 150, 110, 0.18)',
    muted: '#1A2E28',
    gridOverlay: 'rgba(255, 255, 255, 0.05)',
} as const;

const darkGold = {
    ...palette.gold,
    surface: 'rgba(201, 162, 39, 0.14)',
    badge: '#3D3520',
} as const;

export const createAppTheme = (mode: ThemeMode) => {
    const isDark = mode === 'dark';
    const neutral = isDark ? darkNeutral : palette.neutral;
    const emerald = isDark ? darkEmerald : palette.emerald;
    const gold = isDark ? darkGold : palette.gold;

    const cardShadow = Platform.select({
        ios: {
            shadowColor: isDark ? '#000000' : '#084A37',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: isDark ? 0.35 : 0.08,
            shadowRadius: 16,
        },
        android: { elevation: isDark ? 6 : 4 },
        default: {},
    });

    const softShadow = Platform.select({
        ios: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDark ? 0.25 : 0.06,
            shadowRadius: 10,
        },
        android: { elevation: isDark ? 3 : 2 },
        default: {},
    });

    return {
        mode,
        isDark,
        palette: {
            ...palette,
            emerald,
            gold,
            neutral: isDark ? { ...palette.neutral, ...darkNeutral } : palette.neutral,
        },
        colors: {
            brand: {
                primary: emerald.main,
                primaryDark: emerald.dark,
                primaryLight: emerald.light,
                accent: gold.main,
                accentDark: gold.dark,
                success: palette.green.main,
                stat: palette.teal.main,
            },
            background: {
                primary: neutral.background,
                secondary: neutral.screen,
                header: emerald.dark,
                step: neutral.cream,
                footer: emerald.main,
                elevated: neutral.gray50,
            },
            text: {
                primary: neutral.text,
                secondary: neutral.textSecondary,
                muted: neutral.textMuted,
                inverse: isDark ? '#F0F4F2' : palette.neutral.white,
                accent: gold.light,
                stat: palette.teal.light,
                onAccent: emerald.dark,
            },
            border: {
                default: neutral.border,
                focus: emerald.main,
                subtle: neutral.gray100,
            },
            tab: {
                background: isDark ? '#1A2420' : palette.neutral.white,
                active: emerald.main,
                inactive: neutral.textMuted,
                pill: emerald.surface,
            },
            button: {
                primaryBackground: emerald.main,
                primaryText: isDark ? '#F0F4F2' : palette.neutral.white,
                secondaryBackground: gold.main,
                secondaryText: emerald.dark,
                disabledBackground: neutral.gray200,
                disabledText: neutral.textMuted,
            },
            card: {
                background: isDark ? '#1E2A26' : palette.neutral.white,
                stepBackground: neutral.cream,
                highlight: emerald.muted,
            },
            badge: {
                background: gold.surface,
                text: isDark ? gold.light : emerald.dark,
            },
            status: {
                success: palette.green.main,
                error: '#DC4C4C',
                warning: '#D97706',
                info: palette.teal.main,
            },
            semantic: {
                income: palette.green.main,
                expense: '#DC4C4C',
                donation: emerald.main,
                savings: palette.teal.main,
            },
        },
        typography,
        spacing: spaces,
        radius: {
            sm: moderateScale(8),
            md: moderateScale(12),
            lg: moderateScale(16),
            xl: moderateScale(24),
            pill: borders.cricle,
            button: moderateScale(14),
            card: moderateScale(18),
            input: borders.input,
        },
        shadows: {
            card: cardShadow,
            soft: softShadow,
            button: Platform.select({
                ios: {
                    shadowColor: emerald.dark,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: isDark ? 0.35 : 0.18,
                    shadowRadius: 10,
                },
                android: { elevation: 4 },
                default: {},
            }),
        },
        gradients: {
            header: [emerald.dark, emerald.main, emerald.light] as const,
            headerSoft: [emerald.main, '#128564'] as const,
            gold: [gold.light, gold.main] as const,
            progress: [emerald.light, palette.green.main] as const,
            cardAccent: isDark
                ? ([emerald.muted, '#1E2A26'] as const)
                : ([emerald.muted, palette.neutral.white] as const),
            footer: [emerald.dark, emerald.main] as const,
            highlight: [gold.light, gold.main] as const,
        },
        components: {
            header: {
                backgroundColor: emerald.dark,
                titleColor: isDark ? '#F0F4F2' : palette.neutral.white,
                subtitleColor: 'rgba(255, 255, 255, 0.82)',
            },
            primaryButton: {
                backgroundColor: emerald.main,
                textColor: isDark ? '#F0F4F2' : palette.neutral.white,
                borderRadius: moderateScale(14),
            },
            card: {
                backgroundColor: isDark ? '#1E2A26' : palette.neutral.white,
                borderRadius: moderateScale(18),
                ...cardShadow,
            },
            stepCard: {
                backgroundColor: neutral.cream,
                borderRadius: moderateScale(12),
                stepIndicatorColor: gold.main,
            },
            tabBar: {
                backgroundColor: isDark ? '#1A2420' : palette.neutral.white,
                activeTint: emerald.main,
                inactiveTint: neutral.textMuted,
            },
        },
    } as const;
};

export type AppTheme = ReturnType<typeof createAppTheme>;
