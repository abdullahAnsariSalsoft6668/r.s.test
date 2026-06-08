import { getThemeColors, ThemeMode } from '@/styles/rizqTheme';
import { useSelector, useDispatch } from '@/redux/hooks';
import { saveDefaultTheme } from '@/redux/reducers/settings';
import { useCallback } from 'react';

export const useAppTheme = () => {
    const dispatch = useDispatch();
    const themeMode = useSelector(
        state => (state.settings.defaultTheme.myTheme as ThemeMode) ?? 'light',
    );
    const colors = getThemeColors(themeMode);
    const isDark = themeMode === 'dark';

    const setTheme = useCallback(
        (mode: ThemeMode) => {
            dispatch(saveDefaultTheme({ myTheme: mode }));
        },
        [dispatch],
    );

    const toggleTheme = useCallback(() => {
        setTheme(isDark ? 'light' : 'dark');
    }, [isDark, setTheme]);

    return { themeMode, colors, isDark, setTheme, toggleTheme };
};
