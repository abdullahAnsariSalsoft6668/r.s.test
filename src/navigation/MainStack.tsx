import React, { useMemo } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import routes from '@/constants/routeNames';
import { mainRoutes } from '@/constants/routes';
import BottomTabs from './TabStack';
import { MainStackParamList } from './types';
import { useAppTheme } from '@/context/ThemeContext';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
    const { theme } = useAppTheme();

    const screenOptions = useMemo<NativeStackNavigationOptions>(
        () => ({
            headerShown: false,
            contentStyle: { flex: 1, backgroundColor: theme.colors.background.primary },
        }),
        [theme.colors.background.primary],
    );

    return (
        <Stack.Navigator screenOptions={screenOptions} id={undefined}>
            <Stack.Screen
                name={routes.navigator.tab as any}
                component={BottomTabs}
                options={{
                    animation: 'none',
                    contentStyle: { flex: 1, backgroundColor: theme.colors.background.primary },
                }}
            />
            <Stack.Screen name={routes.main.settings} component={mainRoutes[routes.main.settings]} />
            <Stack.Screen name={routes.main.editProfile} component={mainRoutes[routes.main.editProfile]} />
            <Stack.Screen name={routes.main.changePassword} component={mainRoutes[routes.main.changePassword]} />
            <Stack.Screen name={routes.main.privacySettings} component={mainRoutes[routes.main.privacySettings]} />
            <Stack.Screen name={routes.main.privacyFirst} component={mainRoutes[routes.main.privacyFirst]} />
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
            <Stack.Screen name={routes.main.helpHowItWorks} component={mainRoutes[routes.main.helpHowItWorks]} />
            <Stack.Screen name={routes.main.routeDetails} component={mainRoutes[routes.main.routeDetails]} />
            <Stack.Screen name={routes.main.supportedStores} component={mainRoutes[routes.main.supportedStores]} />
            <Stack.Screen name={routes.main.productDetails} component={mainRoutes[routes.main.productDetails]} />
            <Stack.Screen name={routes.main.savingBarcode} component={mainRoutes[routes.main.savingBarcode]} />
            <Stack.Screen name={routes.main.savingBarcodeRedeemed} component={mainRoutes[routes.main.savingBarcodeRedeemed]} />
            <Stack.Screen name={routes.main.languageSettings} component={mainRoutes[routes.main.languageSettings]} />
            <Stack.Screen name={routes.main.currencySettings} component={mainRoutes[routes.main.currencySettings]} />
            <Stack.Screen name={routes.main.givingSettings} component={mainRoutes[routes.main.givingSettings]} />
            <Stack.Screen name={routes.main.recipientsList} component={mainRoutes[routes.main.recipientsList]} />
            <Stack.Screen name={routes.main.addRecipient} component={mainRoutes[routes.main.addRecipient]} />
            <Stack.Screen name={routes.main.addDonation} component={mainRoutes[routes.main.addDonation]} />
            <Stack.Screen name={routes.main.zakatHub} component={mainRoutes[routes.main.zakatHub]} />
            <Stack.Screen name={routes.main.addIncome} component={mainRoutes[routes.main.addIncome]} />
            <Stack.Screen name={routes.main.addExpense} component={mainRoutes[routes.main.addExpense]} />
        </Stack.Navigator>
    );
};

export const MainStack = () => {
    return <MainStackNavigator />;
};

export default MainStack;
