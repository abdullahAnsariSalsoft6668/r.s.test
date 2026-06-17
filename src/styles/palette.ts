/** Raw color tokens sampled from the Ultimate Grocery homepage design. */
export const palette = {
    purple: {
        /** Homepage / auth header primary */
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
        main: '#22C55E',
        dark: '#16A34A',
        footer: '#00A859',
    },
    magenta: {
        main: '#EC4899',
        stat: '#E11D48',
    },
    neutral: {
        white: '#FFFFFF',
        black: '#000000',
        text: '#1A1A1A',
        textSecondary: '#666666',
        textMuted: '#9E9E9E',
        border: '#EFF0F6',
        background: '#FFFFFF',
        screen: '#F5F5F5',
        cream: '#FFF9E5',
        gray50: '#F9FAFB',
        gray100: '#EFF0F6',
        gray200: '#CCCCCC',
        gray300: '#9E9E9E',
        gray400: '#666666',
        gray500: '#454545',
    },
} as const;

export type Palette = typeof palette;
