import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthStack from './AuthStack';
import { MainStack } from './MainStack';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import routes from '@/constants/routes';
const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
    const { auth_token } = useSelector((state: RootState) => state.auth);
    // Static theme since dark mode is removed
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: '#FFFFFF', // Set background to white to match our main background color
        },
    };

    const isAuthenticated = useMemo(() => Boolean(auth_token?.trim()), [auth_token]);

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
                key={isAuthenticated ? 'root-main' : 'root-auth'}
                screenOptions={{
                    headerShown: false,
                    contentStyle: { flex: 1, backgroundColor: '#fff' },
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


export default Routes;
