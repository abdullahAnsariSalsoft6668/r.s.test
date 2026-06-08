import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import routes from '@/constants/routes';
import { mainRoutes } from '@/navigation/screenRoutes';
import BottomTabs from './TabStack';
import { MainStackParamList } from './types';
import { DrawerProvider } from '@/context/DrawerContext';
import AnimatedDrawer from '@/components/AnimatedDrawer';
import { Colors } from '@/styles/colors';

const Stack = createNativeStackNavigator<MainStackParamList>();

const NavigationOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: '#000' },
};

export const MainStack = () => {
  return (
    <DrawerProvider>
      <AnimatedDrawer>
        <Stack.Navigator screenOptions={NavigationOptions} id={undefined}>
          <Stack.Screen
            name={routes.navigator.tab as any}
            component={BottomTabs}
            options={{ animation: 'none', contentStyle: { backgroundColor: Colors.background } }}
          />
          <Stack.Screen name={routes.main.settings} component={mainRoutes[routes.main.settings]} />
          <Stack.Screen name={routes.main.editProfile} component={mainRoutes[routes.main.editProfile]} />
          <Stack.Screen name={routes.main.changePassword} component={mainRoutes[routes.main.changePassword]} />
          <Stack.Screen name={routes.main.subscription} component={mainRoutes[routes.main.subscription]} />
          <Stack.Screen name={routes.main.manageSubscriptions} component={mainRoutes[routes.main.manageSubscriptions]} />
          <Stack.Screen name={routes.main.paymentMethod} component={mainRoutes[routes.main.paymentMethod]} />
          <Stack.Screen name={routes.main.help} component={mainRoutes[routes.main.help]} />
          <Stack.Screen name={routes.main.support} component={mainRoutes[routes.main.support]} />
          <Stack.Screen name={routes.main.cardDetails} component={mainRoutes[routes.main.cardDetails]} />
          <Stack.Screen name={routes.main.helpAndCenter} component={mainRoutes[routes.main.helpAndCenter]} />
          <Stack.Screen name={routes.main.profileDetails} component={mainRoutes[routes.main.profileDetails]} />
          <Stack.Screen name={routes.main.profile} component={mainRoutes[routes.main.profile]} />
          <Stack.Screen name={routes.main.notification} component={mainRoutes[routes.main.notification]} />
          <Stack.Screen name={routes.main.checkout} component={mainRoutes[routes.main.checkout]} />
          <Stack.Screen name={routes.main.mybets} component={mainRoutes[routes.main.mybets]} />
          <Stack.Screen name={routes.main.workHistory} component={mainRoutes[routes.main.workHistory]} />
          <Stack.Screen name={routes.main.wageOverview} component={mainRoutes[routes.main.wageOverview]} />
          <Stack.Screen name={routes.main.myProfile} component={mainRoutes[routes.main.myProfile]} />
          <Stack.Screen name={routes.main.setting} component={mainRoutes[routes.main.setting]} />
          <Stack.Screen name={routes.main.helpSupport} component={mainRoutes[routes.main.helpSupport]} />
        </Stack.Navigator>
      </AnimatedDrawer>
    </DrawerProvider>
  );
};

export default MainStack;
