import TextComp from '@/components/TextComp';
import { useAuthCardEntrance } from '@/hooks/animations/useAuthCardEntrance';
import { useAuthStagger } from '@/hooks/animations/useAuthStagger';
import { usePressScale } from '@/hooks/animations/usePressScale';
import { palette } from '@/styles/palette';
import { moderateScale, verticalScale } from '@/styles/scaling';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StatusBar, View, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import AuthGridOverlay from './AuthGridOverlay';
import AuthHeaderBadge from './AuthHeaderBadge';
import AuthStaggerItem from './AuthStaggerItem';
import {
    AUTH_BACK_DELAY,
    AUTH_HEADER_SUBTITLE_DELAY,
    AUTH_HEADER_TITLE_DELAY,
} from './authAnimationConfig';
import authStyles, { AUTH_BG_BASE } from './authStyles';

const BackIcon = () => (
    <Svg width={moderateScale(22)} height={moderateScale(22)} viewBox="0 0 24 24" fill="none">
        <Path
            d="M15 6l-6 6 6 6"
            stroke={palette.neutral.white}
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
    badgeText?: string;
    headerNote?: string;
};

const AuthScreenLayout: React.FC<AuthScreenLayoutProps> = ({
    title,
    subtitle,
    children,
    footer,
    footerStaggerIndex = 8,
    cardStyle,
    onBack,
    badgeText,
    headerNote,
}) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const canGoBack = navigation.canGoBack();
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

    const headerHeight = insets.top + verticalScale(canGoBack ? 230 : 210);

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }
        if (canGoBack) {
            navigation.goBack();
        }
    };

    return (
        <View style={authStyles.screen}>
            <StatusBar barStyle="light-content" backgroundColor={AUTH_BG_BASE} />

            <View style={[authStyles.headerBand, { height: headerHeight }]}>
                <AuthGridOverlay />

                <View
                    style={[
                        authStyles.headerContent,
                        { paddingTop: insets.top + moderateScale(8) },
                    ]}
                >
                    {canGoBack ? (
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

                    {!canGoBack && badgeText ? (
                        <AuthHeaderBadge text={badgeText} />
                    ) : null}

                    <View style={authStyles.headerTitleContainer}>
                        <Animated.View style={titleEntrance}>
                            <TextComp text={title} style={authStyles.welcomeTitle} />
                        </Animated.View>
                        <Animated.View style={subtitleEntrance}>
                            <TextComp text={subtitle} style={authStyles.welcomeSubtitle} />
                        </Animated.View>
                        {headerNote ? (
                            <TextComp text={headerNote} style={authStyles.headerNote} />
                        ) : null}
                    </View>
                </View>
            </View>

            <Animated.View style={[cardAnimation, authStyles.formArea, cardStyle]}>
                <ScrollView
                    style={authStyles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={authStyles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {children}
                    {footer ? (
                        <AuthStaggerItem index={footerStaggerIndex}>{footer}</AuthStaggerItem>
                    ) : null}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

export default AuthScreenLayout;
