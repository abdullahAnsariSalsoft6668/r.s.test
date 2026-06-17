/** RizqShare design tokens — emerald (trust & giving) + warm gold (premium accent). */
export const palette = {
    emerald: {
        main: '#0D6B4F',
        dark: '#084A37',
        light: '#15966E',
        surface: 'rgba(13, 107, 79, 0.10)',
        gridOverlay: 'rgba(255, 255, 255, 0.07)',
        muted: '#E8F5F0',
    },
    gold: {
        main: '#C9A227',
        dark: '#A8861E',
        light: '#E8C547',
        surface: 'rgba(201, 162, 39, 0.14)',
        badge: '#F5E6B8',
    },
    teal: {
        main: '#0E7490',
        light: '#22A6C3',
    },
    /** Legacy grocery tokens — kept for older screens still in the repo */
    purple: {
        main: '#A913C7',
        dark: '#7A00AD',
        light: '#A855F7',
        surface: 'rgba(146, 0, 211, 0.12)',
        gridOverlay: 'rgba(255, 255, 255, 0.08)',
    },
    yellow: {
        main: '#FFC107',
        dark: '#EAB308',
        highlight: '#FEF08A',
        badge: '#FFEB3B',
    },
    green: {
        main: '#22A06B',
        dark: '#168554',
        footer: '#0D6B4F',
    },
    magenta: {
        main: '#EC4899',
        stat: '#C0392B',
    },
    neutral: {
        white: '#FFFFFF',
        black: '#000000',
        text: '#1C2B26',
        textSecondary: '#5C6B65',
        textMuted: '#8A9690',
        border: '#E4EBE8',
        background: '#FFFFFF',
        screen: '#F4F7F6',
        cream: '#FBF8F0',
        gray50: '#F7FAF9',
        gray100: '#EEF2F0',
        gray200: '#D5DDD9',
        gray300: '#A8B5AF',
        gray400: '#6B7872',
        gray500: '#454545',
    },
} as const;

export type Palette = typeof palette;
