import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes, { tabRoutes } from '@/constants/routes';
import { theme } from '@/styles/theme';
import MyTabBar from './MyTabBar';

const Tab = createBottomTabNavigator();

/** Bottom tab navigator: Home, Deals, Cashback, Insights, Menu */
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
      <Tab.Screen name={routes.tab.deals} component={tabRoutes[routes.tab.deals]} />
      <Tab.Screen name={routes.tab.cashback} component={tabRoutes[routes.tab.cashback]} />
      <Tab.Screen name={routes.tab.insights} component={tabRoutes[routes.tab.insights]} />
      <Tab.Screen name={routes.tab.menu} component={tabRoutes[routes.tab.menu]} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
