import { Platform } from 'react-native';
import { palette } from '@/styles/palette';
import { moderateScale } from '@/styles/scaling';
import { borders, spaces } from '@/styles/sizes';
import { typography } from '@/styles/typography';

const cardShadow = Platform.select({
    ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    android: {
        elevation: 4,
    },
    default: {},
});

/** App-wide theme derived from the Ultimate Grocery homepage design. */
export const theme = {
    palette,
    colors: {
        brand: {
            primary: palette.purple.main,
            primaryDark: palette.purple.dark,
            accent: palette.yellow.main,
            success: palette.green.main,
            stat: palette.magenta.stat,
        },
        background: {
            primary: palette.neutral.background,
            secondary: palette.neutral.screen,
            header: palette.purple.main,
            step: palette.neutral.cream,
            footer: palette.green.footer,
        },
        text: {
            primary: palette.neutral.text,
            secondary: palette.neutral.textSecondary,
            muted: palette.neutral.textMuted,
            inverse: palette.neutral.white,
            accent: palette.yellow.main,
            stat: palette.magenta.stat,
            onAccent: palette.neutral.text,
        },
        border: {
            default: palette.neutral.border,
            focus: palette.purple.main,
        },
        tab: {
            background: palette.neutral.white,
            active: palette.purple.main,
            inactive: '#7C889D',
        },
        button: {
            primaryBackground: palette.yellow.main,
            primaryText: palette.neutral.text,
            secondaryBackground: palette.purple.main,
            secondaryText: palette.neutral.white,
            disabledBackground: palette.neutral.gray200,
            disabledText: palette.neutral.textMuted,
        },
        card: {
            background: palette.neutral.white,
            stepBackground: palette.neutral.cream,
        },
        badge: {
            background: palette.yellow.badge,
            text: palette.neutral.text,
        },
        status: {
            success: palette.green.main,
            error: '#FF0000',
            warning: '#FFA500',
            info: '#0077FF',
        },
    },
    typography,
    spacing: spaces,
    radius: {
        sm: moderateScale(8),
        md: moderateScale(12),
        lg: moderateScale(20),
        xl: moderateScale(24),
        pill: borders.cricle,
        button: moderateScale(12),
        card: moderateScale(20),
        input: borders.input,
    },
    shadows: {
        card: cardShadow,
        button: Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
            },
            android: { elevation: 3 },
            default: {},
        }),
    },
    gradients: {
        header: [palette.purple.dark, palette.purple.main] as const,
        footer: [palette.green.dark, palette.green.footer] as const,
        highlight: [palette.yellow.highlight, palette.yellow.main] as const,
    },
    components: {
        header: {
            backgroundColor: palette.purple.main,
            titleColor: palette.neutral.white,
            subtitleColor: 'rgba(255, 255, 255, 0.85)',
        },
        primaryButton: {
            backgroundColor: palette.yellow.main,
            textColor: palette.neutral.text,
            borderRadius: moderateScale(12),
        },
        card: {
            backgroundColor: palette.neutral.white,
            borderRadius: moderateScale(20),
            ...cardShadow,
        },
        stepCard: {
            backgroundColor: palette.neutral.cream,
            borderRadius: moderateScale(12),
            stepIndicatorColor: palette.yellow.main,
        },
        tabBar: {
            backgroundColor: palette.neutral.white,
            activeTint: palette.purple.main,
            inactiveTint: palette.neutral.textMuted,
        },
    },
} as const;

export type AppTheme = typeof theme;
