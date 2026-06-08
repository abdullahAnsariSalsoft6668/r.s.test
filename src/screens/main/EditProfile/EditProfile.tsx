import { localImages } from '@/assets/images';
import ButtonComp from '@/components/ButtonComp';
import MyIcons, { IconName } from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import CheckoutFormInput from '@/screens/main/Checkout/CheckoutFormInput';
import type { AuthUser } from '@/models/auth.types';
import { RootState } from '@/redux/store';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StatusBar,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

import EditProfileScreenHeader from './EditProfileScreenHeader';
import styles, { AVATAR_SIZE, EDIT_PROFILE_BG } from './styles';

const AVATAR_ROWS = [8, 8, 4] as const;

const AVATAR_OPTIONS: IconName[] = Array.from({ length: 20 }, (_, index) =>
    index % 2 === 0 ? 'user1' : 'user2',
);

const EmailIcon = () => (
    <Svg width={moderateScale(20)} height={moderateScale(20)} viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="5" width="18" height="14" rx="2" stroke={Colors.gray400} strokeWidth={1.8} />
        <Path
            d="M3 7l9 6 9-6"
            stroke={Colors.gray400}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const PhoneIcon = () => (
    <Svg width={moderateScale(20)} height={moderateScale(20)} viewBox="0 0 24 24" fill="none">
        <Path
            d="M6.5 4h3l1.5 5-2 1.5a11 11 0 005 5l1.5-2 5 1.5v3a2 2 0 01-2 2C10.8 20 4 13.2 4 5.5A2 2 0 016 3.5z"
            stroke={Colors.gray400}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

function readUserField(user: AuthUser, ...keys: string[]): string {
    for (const key of keys) {
        const value = user[key];
        if (value != null && value !== '') {
            return String(value).trim();
        }
    }
    return '';
}

const EditProfile: React.FC = () => {
    const userData = useSelector((state: RootState) => state.auth.userData);

    const profileFromRedux = useMemo(
        () => ({
            fullName: readUserField(userData, 'fullName', 'name') || 'James Anderson',
            email: readUserField(userData, 'email') || 'James.25john@gmail.com',
            phone: readUserField(userData, 'phone', 'phoneNumber', 'mobile') || '12345678',
        }),
        [userData],
    );

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number | null>(null);
    const [usePhotoImage, setUsePhotoImage] = useState(true);

    useEffect(() => {
        setFullName(profileFromRedux.fullName);
        setEmail(profileFromRedux.email);
        setPhone(profileFromRedux.phone);
    }, [profileFromRedux.email, profileFromRedux.fullName, profileFromRedux.phone]);

    const selectedAvatar = selectedAvatarIndex != null ? AVATAR_OPTIONS[selectedAvatarIndex] : null;

    const avatarRows = useMemo(() => {
        let cursor = 0;
        return AVATAR_ROWS.map(count => {
            const row = AVATAR_OPTIONS.slice(cursor, cursor + count);
            cursor += count;
            return row;
        });
    }, []);

    return (
        <WrapperContainer style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={EDIT_PROFILE_BG} />
            <ImageBackground
                source={localImages.homeBg}
                style={styles.background}
                resizeMode="cover"
            >
                <EditProfileScreenHeader />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <View style={styles.photoSection}>
                        <View style={styles.photoWrap}>
                            <LinearGradient
                                colors={[...Colors.buttonSplitBorderGradient]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.photoBorder}
                            >
                                <View style={styles.photoInner}>
                                    {usePhotoImage && selectedAvatar == null ? (
                                        <Image
                                            source={localImages.user}
                                            style={styles.photoImage}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <View style={styles.photoAvatarIcon}>
                                            <MyIcons
                                                name={selectedAvatar ?? 'user1'}
                                                size={moderateScale(56)}
                                            />
                                        </View>
                                    )}
                                </View>
                            </LinearGradient>

                            <Pressable
                                style={styles.addPhotoButton}
                                accessibilityRole="button"
                                accessibilityLabel="Add profile photo"
                                onPress={() => {
                                    setUsePhotoImage(true);
                                    setSelectedAvatarIndex(null);
                                }}
                            >
                                <TextComp text="+" style={styles.addPhotoText} />
                            </Pressable>
                        </View>

                        <TextComp
                            text="OR CHOOSE AN AVATAR FROM THE OPTIONS BELOW"
                            style={styles.avatarHint}
                        />
                    </View>

                    <View style={styles.avatarGrid}>
                        {avatarRows.map((row, rowIndex) => (
                            <View key={`avatar-row-${rowIndex}`} style={styles.avatarRow}>
                                {row.map((avatarName, columnIndex) => {
                                    const avatarIndex =
                                        AVATAR_ROWS.slice(0, rowIndex).reduce(
                                            (sum, count) => sum + count,
                                            0,
                                        ) + columnIndex;
                                    const isSelected = selectedAvatarIndex === avatarIndex;

                                    const handleSelect = () => {
                                        setSelectedAvatarIndex(avatarIndex);
                                        setUsePhotoImage(false);
                                    };

                                    const iconSize = moderateScale(
                                        Math.min(AVATAR_SIZE * (isSelected ? 0.68 : 0.72), isSelected ? 26 : 28),
                                    );

                                    if (isSelected) {
                                        return (
                                            <LinearGradient
                                                key={`avatar-${avatarIndex}`}
                                                colors={[...Colors.buttonSplitBorderGradient]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                style={styles.avatarOptionSelectedBorder}
                                            >
                                                <Pressable
                                                    style={styles.avatarOptionInner}
                                                    onPress={handleSelect}
                                                    accessibilityRole="button"
                                                    accessibilityLabel={`Select avatar ${avatarIndex + 1}`}
                                                >
                                                    <MyIcons name={avatarName} size={iconSize} />
                                                </Pressable>
                                            </LinearGradient>
                                        );
                                    }

                                    return (
                                        <Pressable
                                            key={`avatar-${avatarIndex}`}
                                            style={styles.avatarOption}
                                            onPress={handleSelect}
                                            accessibilityRole="button"
                                            accessibilityLabel={`Select avatar ${avatarIndex + 1}`}
                                        >
                                            <MyIcons name={avatarName} size={40} />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        ))}
                    </View>

                    <View style={styles.formSection}>
                        <CheckoutFormInput
                            label="Full Name"
                            icon={<MyIcons name="userIcon" size={moderateScale(20)} />}
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="James Anderson"
                        />
                        <CheckoutFormInput
                            label="Email Address"
                            icon={<EmailIcon />}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="James.25john@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <CheckoutFormInput
                            label="Phone Number"
                            icon={<PhoneIcon />}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="12345678"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <ButtonComp
                        title="UPDATE NOW"
                        onPress={() => {}}
                        variant="premium"
                        height={moderateScale(52)}
                        style={styles.updateButton}
                        rightIcon
                    />
                </ScrollView>
            </ImageBackground>
        </WrapperContainer>
    );
};

export default EditProfile;
