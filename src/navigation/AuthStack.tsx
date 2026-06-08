import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from '@/constants/routes';
import { authRoutes } from '@/navigation/screenRoutes';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fff' } }} initialRouteName={routes.auth.login} id={undefined}>
      <Stack.Screen name={routes.auth.login} component={authRoutes[routes.auth.login]} />
      <Stack.Screen name={routes.auth.forgot} component={authRoutes[routes.auth.forgot]} />
      <Stack.Screen name={routes.auth.forgotVerifyOtp} component={authRoutes[routes.auth.forgotVerifyOtp]} />
      <Stack.Screen name={routes.auth.forgotResetPassword} component={authRoutes[routes.auth.forgotResetPassword]} />
      <Stack.Screen name={routes.auth.register} component={authRoutes[routes.auth.register]} />
      <Stack.Screen name={routes.auth.completeProfile} component={authRoutes[routes.auth.completeProfile]} />
    </Stack.Navigator>
  );
};

export default AuthStack;
