import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { localImages } from '@/assets/images';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useFadeSlide } from '@/hooks/animations/useFadeSlide';
import { useStagger } from '@/hooks/animations/useStagger';
import { AuthStackParamList } from '@/navigation/types';
import { BlurView } from '@sbaiahmed1/react-native-blur';

import styles from './styles';
import { heights } from '@/styles/sizes';

export type PreferenceItem = {
    title: string;
    isSelected: boolean;
};

const STAGGER_DELAY = 80;

const DEFAULT_PREFERENCES: PreferenceItem[] = [
    { title: 'Weddings', isSelected: true },
    { title: 'Birthdays', isSelected: true },
    { title: 'Corporate', isSelected: true },
    { title: 'Gala Events', isSelected: true },
    { title: 'Concerts', isSelected: false },
    { title: 'Private Parties', isSelected: false },
];

const CompleteProfile: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [contactNumber, setContactNumber] = useState('');
    const [defaultCity, setDefaultCity] = useState('');
    const [preferences, setPreferences] = useState<PreferenceItem[]>(DEFAULT_PREFERENCES);
    const [isLoading, setIsLoading] = useState(false);

    const cardAnimation = useFadeSlide({ duration: 450, translateY: 35 });
    const titleStyle = useStagger(0, STAGGER_DELAY).animatedStyle;
    const subtitleStyle = useStagger(1, STAGGER_DELAY).animatedStyle;
    const formStyle = useStagger(2, STAGGER_DELAY).animatedStyle;

    const togglePreference = (index: number) => {
        setPreferences((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, isSelected: !item.isSelected } : item
            )
        );
    };

    const handleFinishSetup = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Login');
        }, 1000);
    };

    return (
        <WrapperContainer style={styles.container}>
            <ImageBackground
                source={localImages.bg}
                style={styles.bgImage}
                resizeMode="cover"
            >
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.titleContainer}>
                        <Animated.View style={titleStyle}>
                            <View style={styles.titleRow}>
                                <TextComp text="Complete " style={styles.titleAccent} />
                                <TextComp text="your Profile" style={styles.titleMain} />
                            </View>
                        </Animated.View>
                        <Animated.View style={subtitleStyle}>
                            <TextComp
                                text="Tell us a bit about yourself to get started."
                                style={styles.subtitle}
                            />
                        </Animated.View>
                    </View>
                    <Animated.View style={[cardAnimation.animatedStyle, styles.cardContainer]}>
                        <BlurView
                            blurType="light"
                            blurAmount={30}
                            style={styles.card}
                            overlayColor="rgba(0, 0, 0, 0.2)"
                        >


                            <Animated.View style={formStyle}>
                                <TextInputComp
                                    label="Contact Number"
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    value={contactNumber}
                                    onChangeText={setContactNumber}
                                    keyboardType="phone-pad"
                                    containerStyle={styles.inputContainer}
                                />

                                <TextComp text="Event Preferences" style={styles.sectionLabel} />
                                <View style={styles.preferenceGrid}>
                                    {preferences.map((item, index) => (
                                        <Pressable
                                            key={`${item.title}-${index}`}
                                            onPress={() => togglePreference(index)}
                                            style={[
                                                styles.preferenceBox,
                                                item.isSelected && styles.preferenceBoxSelected,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.preferenceCheck,
                                                    item.isSelected && styles.preferenceCheckSelected,
                                                ]}
                                            >
                                                {item.isSelected && (
                                                    <Text style={styles.preferenceCheckMark}>✓</Text>
                                                )}
                                            </View>
                                            <TextComp text={item.title} style={styles.preferenceLabel} />
                                        </Pressable>
                                    ))}
                                </View>

                                <TextInputComp
                                    label="Default City"
                                    required
                                    placeholder="NYC"
                                    value={defaultCity}
                                    onChangeText={setDefaultCity}
                                    containerStyle={styles.inputContainer}
                                />

                                <ButtonComp
                                    type="animated"
                                    variant="primary"
                                    size="m"
                                    title="Finish Setup"
                                    onPress={handleFinishSetup}
                                    loading={isLoading}
                                    style={styles.finishButton}
                                    textStyle={styles.finishButtonText}
                                />
                            </Animated.View>
                        </BlurView>
                    </Animated.View>
                </ScrollView>
            </ImageBackground>
        </WrapperContainer>
    );
};

export default CompleteProfile;
