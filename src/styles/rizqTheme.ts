export type ThemeMode = 'light' | 'dark';

export interface RizqThemeColors {
    background: string;
    card: string;
    cardBorder: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    income: string;
    expense: string;
    donation: string;
    warning: string;
    tabBar: string;
    tabBarBorder: string;
    tabInactive: string;
    balanceGradient: readonly [string, string];
    progressTrack: string;
    pillActive: string;
    pillInactive: string;
    pillActiveText: string;
    pillInactiveText: string;
    statusBar: 'light-content' | 'dark-content';
}

export const lightTheme: RizqThemeColors = {
    background: '#F4F6F4',
    card: '#FFFFFF',
    cardBorder: '#E5EBE5',
    text: '#1A1F1A',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    primary: '#2D5A27',
    primaryDark: '#1E3D1A',
    primaryLight: '#3D7A35',
    income: '#2D5A27',
    expense: '#DC2626',
    donation: '#CA8A04',
    warning: '#EAB308',
    tabBar: '#FFFFFF',
    tabBarBorder: '#E5EBE5',
    tabInactive: '#9CA3AF',
    balanceGradient: ['#2D5A27', '#3D7A35'],
    progressTrack: '#E5EBE5',
    pillActive: '#2D5A27',
    pillInactive: '#F3F4F6',
    pillActiveText: '#FFFFFF',
    pillInactiveText: '#6B7280',
    statusBar: 'dark-content',
};

export const darkTheme: RizqThemeColors = {
    background: '#121212',
    card: '#1E1E1E',
    cardBorder: '#2D2D2D',
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textMuted: '#9CA3AF',
    primary: '#4ADE80',
    primaryDark: '#2D5A27',
    primaryLight: '#86EFAC',
    income: '#4ADE80',
    expense: '#F87171',
    donation: '#FBBF24',
    warning: '#FBBF24',
    tabBar: '#1A1A1A',
    tabBarBorder: '#2D2D2D',
    tabInactive: '#6B7280',
    balanceGradient: ['#1E3D1A', '#2D5A27'],
    progressTrack: '#2D2D2D',
    pillActive: '#2D5A27',
    pillInactive: '#2D2D2D',
    pillActiveText: '#FFFFFF',
    pillInactiveText: '#9CA3AF',
    statusBar: 'light-content',
};

export const getThemeColors = (mode: ThemeMode): RizqThemeColors =>
    mode === 'dark' ? darkTheme : lightTheme;
