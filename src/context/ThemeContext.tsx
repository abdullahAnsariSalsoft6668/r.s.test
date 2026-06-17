import React, { createContext, useContext, useMemo } from 'react';

import { useSelector } from '@/redux/hooks';
import { createAppTheme, type AppTheme } from '@/styles/createAppTheme';
import type { ThemeMode } from '@/typings/global';

type ThemeContextValue = {
    theme: AppTheme;
    isDark: boolean;
    mode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedMode = useSelector((state) => state.settings.defaultTheme.myTheme);
    const mode: ThemeMode = storedMode === 'dark' ? 'dark' : 'light';

    const value = useMemo(() => {
        const theme = createAppTheme(mode);
        return { theme, isDark: theme.isDark, mode };
    }, [mode]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useAppTheme must be used within ThemeProvider');
    }
    return context;
};
