import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import routes from '@/constants/routeNames';
import { AuthStackParamList } from '@/navigation/types';

import AuthScreenLayout from '../shared/AuthScreenLayout';
import AuthStaggerItem from '../shared/AuthStaggerItem';
import AuthYellowButton from '../shared/AuthYellowButton';
import authStyles from '../shared/authStyles';
import styles from './styles';

export type PreferenceItem = {
    title: string;
    isSelected: boolean;
};

const DEFAULT_PREFERENCES: PreferenceItem[] = [
    { title: 'Weekly Deals', isSelected: true },
    { title: 'Cashback Offers', isSelected: true },
    { title: 'Store Alerts', isSelected: true },
    { title: 'Price Drops', isSelected: false },
    { title: 'Organic Savings', isSelected: false },
    { title: 'Bulk Discounts', isSelected: false },
];

const CompleteProfile: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [contactNumber, setContactNumber] = useState('');
    const [defaultCity, setDefaultCity] = useState('');
    const [preferences, setPreferences] = useState<PreferenceItem[]>(DEFAULT_PREFERENCES);
    const [isLoading, setIsLoading] = useState(false);

    const togglePreference = (index: number) => {
        setPreferences((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, isSelected: !item.isSelected } : item,
            ),
        );
    };

    const handleFinishSetup = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate(routes.auth.login);
        }, 1000);
    };

    return (
        <AuthScreenLayout
            title="Personalize Your Savings"
            subtitle="Tell us what deals matter most to you."
            headerNote="Quick setup • Skip anytime"
            cardStyle={styles.cardContainerTall}
            footerStaggerIndex={4}
        >
            <AuthStaggerItem index={0}>
                <TextInputComp
                    label="Contact Number"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    keyboardType="phone-pad"
                    enableFocusAnimation
                    containerStyle={authStyles.inputContainer}
                    labelStyle={authStyles.inputLabel}
                    inputContainerStyle={authStyles.inputField}
                />
            </AuthStaggerItem>

            <AuthStaggerItem index={1}>
                <TextComp text="Savings Preferences" style={styles.sectionLabel} />
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
            </AuthStaggerItem>

            <AuthStaggerItem index={2}>
                <TextInputComp
                    label="Default City"
                    required
                    placeholder="e.g. New York"
                    value={defaultCity}
                    onChangeText={setDefaultCity}
                    enableFocusAnimation
                    containerStyle={authStyles.inputContainer}
                    labelStyle={authStyles.inputLabel}
                    inputContainerStyle={authStyles.inputField}
                />
            </AuthStaggerItem>

            <AuthStaggerItem index={3}>
                <AuthYellowButton
                    title="Finish Setup"
                    onPress={handleFinishSetup}
                    loading={isLoading}
                    disabled={isLoading}
                    style={authStyles.actionButton}
                />
            </AuthStaggerItem>
        </AuthScreenLayout>
    );
};

export default CompleteProfile;
