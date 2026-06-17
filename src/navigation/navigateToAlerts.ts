import routes from '@/constants/routeNames';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

export const navigateToAlertsTab = (navigation: NavigationProp<ParamListBase>) => {
    navigation.navigate(routes.navigator.tab as never, {
        screen: routes.tab.analytics,
    } as never);
};
