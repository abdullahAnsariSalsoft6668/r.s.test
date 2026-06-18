import MyIcons, { IconName } from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import routes from '@/constants/routeNames';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScalePressable from '@/components/rizqShare/ScalePressable';
import { useTabBarStyles, TAB_ICON_SIZE, TAB_BAR_BOTTOM_GAP } from '@/hooks/useTabBarStyles';
import { useAppTheme } from '@/context/ThemeContext';

type TabConfig = {
    labelKey: string;
    icon: IconName;
    iconActive: IconName;
    isDonate?: boolean;
};

const TAB_CONFIG: Record<string, TabConfig> = {
    [routes.tab.home]: {
        labelKey: 'tabs.home',
        icon: 'rizqTabHome',
        iconActive: 'rizqTabHomeActive',
    },
    [routes.tab.transactions]: {
        labelKey: 'tabs.transactions',
        icon: 'rizqTabList',
        iconActive: 'rizqTabListActive',
    },
    [routes.tab.donate]: {
        labelKey: 'tabs.donate',
        icon: 'rizqTabHeartFab',
        iconActive: 'rizqTabHeartFab',
        isDonate: true,
    },
    [routes.tab.analytics]: {
        labelKey: 'tabs.analytics',
        icon: 'rizqTabChart',
        iconActive: 'rizqTabChartActive',
    },
    [routes.tab.profileTab]: {
        labelKey: 'tabs.profile',
        icon: 'rizqTabUser',
        iconActive: 'rizqTabUserActive',
    },
};

function getTabConfig(routeName: string): TabConfig {
    return (
        TAB_CONFIG[routeName] ?? {
            labelKey: routeName,
            icon: 'rizqTabHome',
            iconActive: 'rizqTabHomeActive',
        }
    );
}

interface TabItemProps {
    route: { name: string; key: string };
    isFocused: boolean;
    onPress: () => void;
    options: Record<string, unknown>;
    label: string;
}

const TabItem = React.memo(({ route, isFocused, onPress, options, label }: TabItemProps) => {
    const config = getTabConfig(route.name);
    const iconName = isFocused ? config.iconActive : config.icon;
    const scale = useSharedValue(1);
    const { tabBarStyles } = useTabBarStyles();
    const { theme } = useAppTheme();

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1.04 : 1, { damping: 16, stiffness: 260 });
    }, [isFocused, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    if (config.isDonate) {
        return (
            <ScalePressable
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={(options.tabBarAccessibilityLabel as string) ?? label}
                testID={options.tabBarTestID as string | undefined}
                onPress={onPress}
                style={[tabBarStyles.tabItem, tabBarStyles.donateTabItem]}
            >
                <Animated.View style={animatedStyle}>
                    <View
                        style={[
                            tabBarStyles.donateCircle,
                            isFocused && { backgroundColor: theme.colors.brand.primaryDark },
                        ]}
                    >
                        <MyIcons name={iconName} size={TAB_ICON_SIZE} />
                    </View>
                </Animated.View>
                <TextComp
                    text={label}
                    style={[
                        tabBarStyles.tabLabel,
                        isFocused ? tabBarStyles.tabLabelActive : tabBarStyles.tabLabelInactive,
                    ]}
                    numberOfLines={1}
                />
            </ScalePressable>
        );
    }

    return (
        <ScalePressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={(options.tabBarAccessibilityLabel as string) ?? label}
            testID={options.tabBarTestID as string | undefined}
            onPress={onPress}
            style={[tabBarStyles.tabItem, isFocused && tabBarStyles.tabItemActive]}
        >
            <Animated.View style={[animatedStyle, { alignItems: 'center' }]}>
                {isFocused ? <View style={tabBarStyles.activeDot} /> : null}
                <MyIcons name={iconName} size={TAB_ICON_SIZE} />
            </Animated.View>
            <TextComp
                text={label}
                style={[
                    tabBarStyles.tabLabel,
                    isFocused ? tabBarStyles.tabLabelActive : tabBarStyles.tabLabelInactive,
                ]}
                numberOfLines={1}
            />
        </ScalePressable>
    );
});

const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const { tabBarStyles } = useTabBarStyles();
    const onHeightChange = useContext(BottomTabBarHeightCallbackContext);

    return (
        <View
            style={[tabBarStyles.outer, { paddingBottom: Math.max(insets.bottom, 10) }]}
            pointerEvents="box-none"
            onLayout={(event) => {
                onHeightChange?.(event.nativeEvent.layout.height + TAB_BAR_BOTTOM_GAP);
            }}
        >
            <View style={tabBarStyles.bar}>
                <View style={tabBarStyles.tabsRow}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;
                        const config = getTabConfig(route.name);
                        const label = t(config.labelKey);

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate({
                                    name: route.name,
                                    params: undefined,
                                    merge: true,
                                });
                            }
                        };

                        return (
                            <TabItem
                                key={route.key}
                                route={route}
                                isFocused={isFocused}
                                onPress={onPress}
                                options={options as Record<string, unknown>}
                                label={label}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default React.memo(MyTabBar);
