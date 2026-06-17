import React, { useMemo } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './AuthStack';
import { MainStack } from './MainStack';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppTheme } from '@/context/ThemeContext';

import routes from '@/constants/routeNames';
const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationRoot = () => {
    const { auth_token } = useSelector((state: RootState) => state.auth);
    const { theme, isDark } = useAppTheme();

    const navigationTheme = useMemo(() => {
        const base = isDark ? DarkTheme : DefaultTheme;
        return {
            ...base,
            dark: isDark,
            colors: {
                ...base.colors,
                primary: theme.colors.brand.primary,
                background: theme.colors.background.primary,
                card: theme.colors.card.background,
                text: theme.colors.text.primary,
                border: theme.colors.border.default,
                notification: theme.colors.brand.accent,
            },
        };
    }, [isDark, theme]);

    const isAuthenticated = useMemo(() => Boolean(auth_token?.trim()), [auth_token]);

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator
                key={isAuthenticated ? 'root-main' : 'root-auth'}
                screenOptions={{
                    headerShown: false,
                    contentStyle: { flex: 1, backgroundColor: theme.colors.background.primary },
                }}
                id={undefined}
            >
                {true ? (
                    <Stack.Screen name={routes.navigator.main} component={MainStack} />
                ) : (
                    <Stack.Screen name={routes.navigator.auth} component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export const Routes = () => <NavigationRoot />;

export default Routes;
