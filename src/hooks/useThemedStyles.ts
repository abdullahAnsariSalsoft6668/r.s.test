import { useMemo } from 'react';

import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/styles/theme';

export const useThemedStyles = <T,>(factory: (theme: AppTheme) => T): T => {
    const { theme } = useAppTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => factory(theme), [theme]);
};
