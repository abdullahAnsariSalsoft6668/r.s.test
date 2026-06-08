import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useAuthCardEntrance } from '@/hooks/animations/useAuthCardEntrance';
import { useAuthStagger } from '@/hooks/animations/useAuthStagger';
import { usePressScale } from '@/hooks/animations/usePressScale';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StatusBar, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import AuthStaggerItem from './AuthStaggerItem';
import {
    AUTH_BACK_DELAY,
    AUTH_HEADER_SUBTITLE_DELAY,
    AUTH_HEADER_TITLE_DELAY,
} from './authAnimationConfig';
import authStyles, { AUTH_BG_BASE, AUTH_BG_GLOW, AUTH_BG_MID } from './authStyles';

const BackIcon = () => (
    <Svg width={moderateScale(22)} height={moderateScale(22)} viewBox="0 0 24 24" fill="none">
        <Path
            d="M15 6l-6 6 6 6"
            stroke={Colors.white}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

type AuthScreenLayoutProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    footerStaggerIndex?: number;
    cardStyle?: ViewStyle;
    onBack?: () => void;
};

const AuthScreenLayout: React.FC<AuthScreenLayoutProps> = ({
    title,
    subtitle,
    children,
    footer,
    footerStaggerIndex = 8,
    cardStyle,
    onBack,
}) => {
    const navigation = useNavigation();
    const cardAnimation = useAuthCardEntrance();
    const backEntrance = useAuthStagger({ index: 0, baseDelay: AUTH_BACK_DELAY, step: 0, translateY: 14 });
    const titleEntrance = useAuthStagger({
        index: 0,
        baseDelay: AUTH_HEADER_TITLE_DELAY,
        step: 0,
        translateY: 18,
    });
    const subtitleEntrance = useAuthStagger({
        index: 0,
        baseDelay: AUTH_HEADER_SUBTITLE_DELAY,
        step: 0,
        translateY: 16,
    });
    const { animatedStyle: backPressStyle, onPressIn, onPressOut } = usePressScale();

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <WrapperContainer
            style={authStyles.container}
            edges={['left', 'right', 'bottom']}
            innerBackgroundColor={AUTH_BG_BASE}
        >
            <StatusBar barStyle="light-content" backgroundColor={AUTH_BG_BASE} />
            <View style={authStyles.gradientBackground}>
                <LinearGradient
                    colors={['#00050a', AUTH_BG_BASE, '#00081a']}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={authStyles.gradientLayer}
                    pointerEvents="none"
                />
                <LinearGradient
                    colors={[AUTH_BG_GLOW, AUTH_BG_MID, 'transparent']}
                    locations={[0, 0.45, 1]}
                    start={{ x: 0.62, y: 0 }}
                    end={{ x: 0.2, y: 0.9 }}
                    style={authStyles.gradientLayer}
                    pointerEvents="none"
                />
                <LinearGradient
                    colors={['transparent', '#001f4d', 'transparent']}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0, y: 0.15 }}
                    end={{ x: 1, y: 0.55 }}
                    style={authStyles.gradientLayer}
                    pointerEvents="none"
                />
                <ScrollView
                    style={authStyles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={authStyles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={authStyles.headerSection}>
                        {navigation.canGoBack() ? (
                            <Animated.View style={backEntrance}>
                                <Animated.View style={backPressStyle}>
                                    <Pressable
                                        onPress={handleBack}
                                        onPressIn={onPressIn}
                                        onPressOut={onPressOut}
                                        hitSlop={8}
                                        style={authStyles.backButton}
                                        accessibilityRole="button"
                                        accessibilityLabel="Go back"
                                    >
                                        <BackIcon />
                                    </Pressable>
                                </Animated.View>
                            </Animated.View>
                        ) : null}

                        <View style={authStyles.headerTitleContainer}>
                            <Animated.View style={titleEntrance}>
                                <TextComp text={title} style={authStyles.welcomeTitle} />
                            </Animated.View>
                            <Animated.View style={subtitleEntrance}>
                                <TextComp text={subtitle} style={authStyles.welcomeSubtitle} />
                            </Animated.View>
                        </View>
                    </View>

                    <Animated.View style={[cardAnimation, authStyles.cardContainer, cardStyle]}>
                        <View style={authStyles.card}>
                            {children}
                            {footer ? (
                                <AuthStaggerItem index={footerStaggerIndex}>{footer}</AuthStaggerItem>
                            ) : null}
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        </WrapperContainer>
    );
};

export default AuthScreenLayout;
