import TextComp from '@/components/TextComp';
import MyIcons from '@/components/MyIcons';
import routes from '@/constants/routes';
import { navigateToAlertsTab } from '@/navigation/navigateToAlerts';
import { useDrawerSafe } from '@/context/DrawerContext';
import { useEntranceAnimation } from '@/hooks/animations/useEntranceAnimation';
import { usePressScale } from '@/hooks/animations/usePressScale';
import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { MenuIcon } from './SettingsIcons';

type SettingsHeaderProps = {
    avatarSource: ImageSourcePropType;
};

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ avatarSource }) => {
    const navigation = useNavigation();
    const drawer = useDrawerSafe();
    const topStyle = useEntranceAnimation({ baseDelay: 30, translateY: 12 });
    const heroStyle = useEntranceAnimation({ baseDelay: 100, translateY: 14 });
    const { animatedStyle: menuScale, onPressIn, onPressOut } = usePressScale();

    const openDrawer = useCallback(() => {
        drawer?.open();
    }, [drawer]);

    const openNotifications = useCallback(() => {
        navigateToAlertsTab(navigation);
    }, [navigation]);

    const openProfile = useCallback(() => {
        navigation.navigate(routes.main.profile as never);
    }, [navigation]);

    return (
        <View style={styles.wrapper}>
            <Animated.View style={topStyle}>
                <View style={styles.topRow}>
                    <Animated.View style={menuScale}>
                        <Pressable
                            onPress={openDrawer}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            style={styles.iconButton}
                            accessibilityRole="button"
                            accessibilityLabel="Open menu"
                        >
                            <MenuIcon />
                        </Pressable>
                    </Animated.View>

                    <View style={styles.actions}>
                        <Pressable
                            onPress={openNotifications}
                            style={styles.iconButton}
                            accessibilityRole="button"
                            accessibilityLabel="Notifications"
                        >
                            <MyIcons name="notification" size={moderateScale(18)} stroke={Colors.white} />
                            <View style={styles.badge} />
                        </Pressable>
                        <Pressable onPress={openProfile} accessibilityRole="button" accessibilityLabel="Profile">
                            <Image source={avatarSource} style={styles.avatar} resizeMode="cover" />
                        </Pressable>
                    </View>
                </View>
            </Animated.View>

            <Animated.View style={heroStyle}>
                <TextComp text="Settings" style={styles.title} />
                <TextComp text="Customize your app preferences." style={styles.subtitle} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom: moderateScale(24),
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: moderateScale(20),
    },
    iconButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    badge: {
        position: 'absolute',
        top: moderateScale(9),
        right: moderateScale(9),
        width: moderateScale(8),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: Colors.error,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    avatar: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        backgroundColor: Colors.gray600,
    },
    title: {
        fontSize: moderateScale(28),
        fontFamily: plusJakarta.bold,
        color: Colors.white,
        marginBottom: moderateScale(6),
    },
    subtitle: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
        color: 'rgba(255, 255, 255, 0.78)',
    },
});

export default React.memo(SettingsHeader);
