import { createAppTheme } from '@/styles/createAppTheme';

/** Default light theme — used by legacy static StyleSheet modules. Prefer `useAppTheme()` in components. */
export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');
export const theme = lightTheme;

export const getAppTheme = (mode: 'light' | 'dark') =>
    mode === 'dark' ? darkTheme : lightTheme;

export type { AppTheme } from '@/styles/createAppTheme';
