import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from '@/constants/routeNames';
import { tabRoutes } from '@/constants/routes';
import { theme } from '@/styles/theme';
import MyTabBar from './MyTabBar';

const Tab = createBottomTabNavigator();

/** Bottom tab navigator: Home, Transactions, Donate, Analytics, Profile */
export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          flex: 1,
          backgroundColor: theme.colors.background.primary,
        },
      }}
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName={routes.tab.home}
    >
      <Tab.Screen name={routes.tab.home} component={tabRoutes[routes.tab.home]} />
      <Tab.Screen name={routes.tab.transactions} component={tabRoutes[routes.tab.transactions]} />
      <Tab.Screen name={routes.tab.donate} component={tabRoutes[routes.tab.donate]} />
      <Tab.Screen name={routes.tab.analytics} component={tabRoutes[routes.tab.analytics]} />
      <Tab.Screen name={routes.tab.profileTab} component={tabRoutes[routes.tab.profileTab]} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
