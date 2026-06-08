export const Colors = {
    // RizqShare Brand
    rizqGreen: '#2D5A27',
    rizqGreenLight: '#3D7A35',
    rizqGreenDark: '#1E3D1A',

    // Brand Colors
    primary: '#2D5A27',
    pink: '#f0e4f0',
    secondary: '#CD0105',
    darkBlue: '#101f35',
    brandPurple: '#5C2B7E',

    brandSalmon: '#FF8C69',
    glassSurface: 'rgba(255, 255, 255, 0.2)',
    glassBorder: 'rgba(255, 255, 255, 0.3)',
    yellow: '#EAB308',
    // Onboarding (deep navy + salmon accent, matches onboarding UI)
    onboardingNavy: '#0f1729',
    onboardingNavyLight: '#1a2744',
    onboardingSalmon: '#FF8C69',
    onboardingGlass: 'rgba(255, 255, 255, 0.08)',
    onboardingGlassBorder: 'rgba(255, 255, 255, 0.15)',
    onboardingDotInactive: 'rgba(255, 255, 255, 0.35)',

    // Tabs
    tabPrimary: '#F4F6F4',
    tabSecondary: '#F4F6F4',
    tabActive: '#2D5A27',

    // Status Colors
    success: '#00A13A',
    error: '#FF0000',
    warning: '#FFA500',
    info: '#0077FF',

    // Grayscale
    black: '#000000',
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#EFF0F6',
    gray200: '#CCCCCC',
    gray300: '#9E9E9E',
    gray400: '#666666',
    gray500: '#454545',
    gray600: '#2C2C2C',
    gray700: '#1A1A1A',
    

    // Base
    background: '#f5f5f5',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#454545',

    // Components
    inputBackground: '#FFFFFF',
    inputBorder: '#EFF0F6',
    inputPlaceholder: '#4E4D60',
    inputText: '#000000',
    statusBar: 'dark-content' as const,
    inputBackgroundApp: '#f7f7f7',

    // Buttons
    buttonBorder: '#AC8145',
    buttonDisabled: '#CCCCCC',
    /** Split CTA — mint → lime → gold fill (auth / primary actions) */
    buttonSplitFillStart: '#80E0A0',
    buttonSplitFillMid: '#B5E050',
    buttonSplitFillEnd: '#E6C845',
    /** Split CTA — gradient stroke around the button */
    buttonSplitBorderGradient: ['#FFFFFF', '#80E0A0', '#E6C845'] as readonly [
        string,
        string,
        string,
    ],
    buttonSplitLabel: '#000000',
    buttonSplitDivider: '#FFFFFF',
    buttonSplitIconBackground: '#000000',
    buttonSplitIconStroke: '#FFFFFF',
    gradientPrimary: ['#f5e3ce', '#fdf2e5'] as readonly [string, string],
    gradientButtonPrimary: ['#AC8145', '#B98134'] as readonly [string, string],
    gradientSecondary: ['#36194b', "#6b3296", '#36194b'] as readonly [string, string, string],
    gradientNew: ['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.8)'] as readonly [string, string],
    // Icons
    iconPrimary: '#454545',
    iconSecondary: '#9E9E9E',

    /** Shimmer gradients [light, mid, light] for `react-native-shimmer-placeholder` */
    shimmerChildProfile: ['#EFE8DC', '#D4CBC0', '#EFE8DC'] as readonly [string, string, string],
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
