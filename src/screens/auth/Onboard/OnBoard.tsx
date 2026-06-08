import React, { useMemo } from 'react';
import { I18nManager, StatusBar, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { localImages as onboardingImages } from '@/assets/onboarding';
import ButtonComp from '@/components/ButtonComp';
import MyIcons from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import { usePressScale } from '@/hooks/animations/usePressScale';
import { useStagger } from '@/hooks/animations/useStagger';
import { AuthStackParamList } from '@/navigation/types';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { consumeFirstOnBoardAfterLaunch } from '@/utils/splashState';

import OnboardingCollageOrb from './OnboardingCollageOrb';
import {
    COLLAGE_ORB_CONFIG,
    CollageOrbConfig,
    ORB_ANIMATION_DURATION_MS,
    STAGGER_STEP_MS,
} from './onboardingCollageConfig';
import styles, {
    COLLAGE_HEIGHT_RATIO,
    ONBOARD_GRADIENT_BOTTOM,
    ONBOARD_GRADIENT_TOP,
    ORB_SIZE_LG,
    ORB_SIZE_MD,
    ORB_SIZE_SM,
} from './styles';
import { borders } from '@/styles/sizes';

const ANIMATION_DELAY_AFTER_SPLASH = 550;
/** Start footer stagger after the last orb animation has largely finished */
const FOOTER_DELAY_AFTER_ORBS_MS = 120;
const FOOTER_STAGGER_MS = 75;

function orbDiameter(size: CollageOrbConfig['size']): number {
    switch (size) {
        case 'lg':
            return ORB_SIZE_LG;
        case 'md':
            return ORB_SIZE_MD;
        case 'sm':
            return ORB_SIZE_SM;
        default:
            return ORB_SIZE_MD;
    }
}

const OnBoard = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const { height: windowHeight } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const initialDelay = useMemo(
        () => (consumeFirstOnBoardAfterLaunch() ? ANIMATION_DELAY_AFTER_SPLASH : 0),
        [],
    );

    const collageHeight = windowHeight * COLLAGE_HEIGHT_RATIO;

    const maxStaggerIndex = Math.max(...COLLAGE_ORB_CONFIG.map((c) => c.staggerIndex));
    const lastOrbStartDelay = initialDelay + maxStaggerIndex * STAGGER_STEP_MS;
    const footerBaseDelay =
        lastOrbStartDelay + ORB_ANIMATION_DURATION_MS + FOOTER_DELAY_AFTER_ORBS_MS;

    const titleStyle = useStagger(0, FOOTER_STAGGER_MS, footerBaseDelay).animatedStyle;
    const descriptionStyle = useStagger(1, FOOTER_STAGGER_MS, footerBaseDelay).animatedStyle;
    const ctaStyle = useStagger(2, FOOTER_STAGGER_MS, footerBaseDelay).animatedStyle;
    const dotsStyle = useStagger(3, FOOTER_STAGGER_MS, footerBaseDelay).animatedStyle;

    const { animatedStyle: skipStyle, onPressIn: skipPressIn, onPressOut: skipPressOut } =
        usePressScale();

    const goLogin = () => {
        navigation.navigate('Login');
    };

    const gradientColors = [ONBOARD_GRADIENT_TOP, ONBOARD_GRADIENT_BOTTOM] as [string, string];

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={ONBOARD_GRADIENT_TOP} />
            <LinearGradient
                colors={gradientColors}
                style={styles.gradientRoot}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>

                    <View style={[styles.collageContainer, { height: collageHeight }]}>
                        {COLLAGE_ORB_CONFIG.map((cfg) => (
                            <OnboardingCollageOrb
                                key={cfg.id}
                                source={onboardingImages[cfg.sourceKey]}
                                diameter={orbDiameter(cfg.size)}
                                leftPct={cfg.leftPct}
                                topPct={cfg.topPct}
                                zIndex={cfg.zIndex}
                                from={cfg.from}
                                delayMs={initialDelay + cfg.staggerIndex * STAGGER_STEP_MS}
                                containerStyle={styles.orbShadow}
                            />
                        ))}
                    </View>

                    <View style={[styles.bottomBlock, { paddingBottom: Math.max(insets.bottom, 70) }]}>
                        <Animated.View style={titleStyle}>
                            <TextComp text="Discover Amazing Stories" style={styles.title} />
                        </Animated.View>
                        <Animated.View style={descriptionStyle}>
                            <TextComp
                                text="Explore children's books and audiobooks"
                                style={styles.description}
                            />
                        </Animated.View>
                        <Animated.View style={ctaStyle}>
                            <ButtonComp
                                title="GET STARTED"
                                onPress={goLogin}
                                size="l"
                                height={moderateScale(56)}
                                iconSize={moderateScale(44)}
                                rightIcon={true}
                            />
                        </Animated.View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
};

export default OnBoard;
