import MyIcons, { IconName } from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import routes from '@/constants/routes';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/hooks/useAppTheme';
import { moderateScale } from '@/styles/scaling';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DonateIcon } from '@/components/rizqShare/RizqIcons';

const ICON_SIZE = moderateScale(24);

function getTabIcon(routeName: string, focused: boolean): IconName | 'donate' {
    switch (routeName) {
        case routes.tab.home:
            return focused ? 'tabHomeActive' : 'tabHome';
        case routes.tab.transactions:
            return focused ? 'transactionActive' : 'transaction';
        case routes.tab.donate:
            return 'donate';
        case routes.tab.analytics:
            return focused ? 'dashboardActive' : 'dashboard';
        case routes.tab.profile:
            return focused ? 'user1' : 'user2';
        default:
            return focused ? 'tabHomeActive' : 'tabHome';
    }
}

function getTabLabel(routeName: string): string {
    switch (routeName) {
        case routes.tab.home:
            return 'Home';
        case routes.tab.transactions:
            return 'Transactions';
        case routes.tab.donate:
            return 'Donate';
        case routes.tab.analytics:
            return 'Analytics';
        case routes.tab.profile:
            return 'Profile';
        default:
            return '';
    }
}

interface TabItemProps {
    route: { name: string; key: string };
    isFocused: boolean;
    onPress: () => void;
    options: Record<string, unknown>;
    activeColor: string;
    inactiveColor: string;
}

const TabItem = React.memo(({ route, isFocused, onPress, options, activeColor, inactiveColor }: TabItemProps) => {
    const iconName = getTabIcon(route.name, isFocused);
    const label = getTabLabel(route.name);
    const color = isFocused ? activeColor : inactiveColor;

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={(options.tabBarAccessibilityLabel as string) ?? label}
            testID={options.tabBarTestID as string | undefined}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
        >
            {iconName === 'donate' ? (
                <DonateIcon size={ICON_SIZE} color={color} />
            ) : (
                <MyIcons name={iconName as IconName} size={ICON_SIZE} stroke={color} />
            )}
            <TextComp
                text={label}
                style={[styles.tabLabel, { color }, isFocused && styles.tabLabelActive]}
                numberOfLines={1}
            />
        </TouchableOpacity>
    );
});

const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
    const { colors } = useAppTheme();

    return (
        <View
            style={[
                styles.outer,
                {
                    backgroundColor: colors.background,
                    borderTopColor: colors.tabBarBorder,
                },
                { paddingBottom: Math.max(insets.bottom, moderateScale(8)) },
            ]}
            pointerEvents="box-none"
        >
            <View style={[styles.bar, { backgroundColor: colors.tabBar, borderColor: colors.tabBarBorder }]}>
                <View style={styles.tabsRow}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;

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
                                activeColor={colors.primary}
                                inactiveColor={colors.tabInactive}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    bar: {
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        paddingTop: moderateScale(10),
        paddingBottom: moderateScale(4),
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
    },
    tabsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: moderateScale(8),
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(4),
        minWidth: moderateScale(56),
        gap: moderateScale(4),
    },
    tabLabel: {
        fontSize: moderateScale(10),
        fontFamily: plusJakarta.regular,
        textAlign: 'center',
    },
    tabLabelActive: {
        fontFamily: plusJakarta.bold,
    },
});

export default React.memo(MyTabBar);
