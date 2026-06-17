import { palette } from '@/styles/palette';

export const Colors = {
    // Brand Colors (Ultimate Grocery homepage palette)
    primary: palette.purple.main,
    pink: '#FCE7F3',
    secondary: palette.magenta.stat,
    darkBlue: '#101f35',
    brandPurple: palette.purple.main,

    brandSalmon: '#FF8C69',
    glassSurface: 'rgba(255, 255, 255, 0.2)',
    glassBorder: 'rgba(255, 255, 255, 0.3)',
    yellow: palette.yellow.main,
    statMagenta: palette.magenta.stat,
    cream: palette.neutral.cream,

    // Onboarding / auth header surfaces
    onboardingNavy: palette.purple.dark,
    onboardingNavyLight: palette.purple.main,
    onboardingSalmon: palette.yellow.main,
    onboardingGlass: palette.purple.gridOverlay,
    onboardingGlassBorder: 'rgba(255, 255, 255, 0.2)',
    onboardingDotInactive: 'rgba(255, 255, 255, 0.35)',

    // Tabs — white bar, purple active (homepage design)
    tabPrimary: palette.neutral.white,
    tabSecondary: palette.neutral.white,
    tabActive: palette.purple.main,
    tabInactive: palette.neutral.textMuted,

    // Status Colors
    success: palette.green.main,
    error: '#FF0000',
    warning: '#FFA500',
    info: '#0077FF',

    // Grayscale
    black: palette.neutral.black,
    white: palette.neutral.white,
    gray50: palette.neutral.gray50,
    gray100: palette.neutral.gray100,
    gray200: palette.neutral.gray200,
    gray300: palette.neutral.gray300,
    gray400: palette.neutral.gray400,
    gray500: palette.neutral.gray500,
    gray600: '#2C2C2C',
    gray700: palette.neutral.text,

    // Base
    background: palette.neutral.background,
    surface: palette.neutral.white,
    text: palette.neutral.text,
    textSecondary: palette.neutral.textSecondary,

    // Components
    inputBackground: palette.neutral.white,
    inputBorder: palette.neutral.border,
    inputPlaceholder: '#4E4D60',
    inputText: palette.neutral.text,
    statusBar: 'dark-content' as const,
    inputBackgroundApp: palette.neutral.gray50,

    // Buttons — yellow primary CTA from homepage
    buttonBorder: palette.yellow.dark,
    buttonDisabled: palette.neutral.gray200,
    buttonSplitFillStart: palette.yellow.highlight,
    buttonSplitFillMid: palette.yellow.main,
    buttonSplitFillEnd: palette.yellow.dark,
    buttonSplitBorderGradient: ['#FFFFFF', palette.yellow.main, palette.yellow.dark] as readonly [
        string,
        string,
        string,
    ],
    buttonSplitLabel: palette.neutral.text,
    buttonSplitDivider: palette.neutral.white,
    buttonSplitIconBackground: palette.neutral.text,
    buttonSplitIconStroke: palette.neutral.white,
    gradientPrimary: [palette.neutral.cream, palette.neutral.white] as readonly [string, string],
    gradientButtonPrimary: [palette.yellow.main, palette.yellow.dark] as readonly [string, string],
    gradientSecondary: [palette.purple.dark, palette.purple.main, palette.purple.dark] as readonly [
        string,
        string,
        string,
    ],
    gradientNew: ['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.8)'] as readonly [string, string],
    gradientFooter: [palette.green.dark, palette.green.footer] as readonly [string, string],

    // Icons
    iconPrimary: palette.neutral.gray500,
    iconSecondary: palette.neutral.textMuted,

    /** Shimmer gradients [light, mid, light] for `react-native-shimmer-placeholder` */
    shimmerChildProfile: ['#F3E8FF', '#E9D5FF', '#F3E8FF'] as readonly [string, string, string],
    shimmerOnWhite: ['#F2F2F2', '#E0E0E0', '#F2F2F2'] as readonly [string, string, string],

    // Opacity
    blackOpacity60: 'rgba(0, 0, 0, 0.6)',
    whiteOpacity60: 'rgba(255, 255, 255, 0.6)',

    // Transparent
    transparent: 'transparent',

    // Text
    orange: '#bf6457',

    // Support / Contact
    supportEmail: '#D9534F',

    // Action item icons (Manage Subscriptions)
    actionIconBlue: '#2196F3',
    actionIconOrange: '#FF9800',
    actionIconRed: '#F44336',
    actionIconGrey: '#616161',

    // Sessions
    sessionBannerBg: '#FFEBEE',
    sessionBannerText: '#C62828',
    sessionDetailIconBg: '#8D6E63',

    // Insurance plan card gradients
    insuranceBronze: ['#5D4037', '#8D6E63'] as readonly [string, string],
    insuranceSilver: ['#455A64', '#90A4AE'] as readonly [string, string],
    insuranceGold: ['#F9A825', '#FFD54F'] as readonly [string, string],
    insurancePlatinum: ['#37474F', '#78909C'] as readonly [string, string],
} as const;

export type AppColors = typeof Colors;
export const commonColors = Colors;
