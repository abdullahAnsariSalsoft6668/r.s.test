import { localImages } from '@/assets/images';
import AppModal from '@/components/AppModal';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routes';
import type { AuthUser } from '@/models/auth.types';
import { clearDataAction } from '@/redux/actions/auth';
import { RootState } from '@/redux/store';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StatusBar,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import ProfileScreenHeader from './ProfileScreenHeader';
import styles, { PROFILE_BG } from './styles';

type DetailRowProps = {
    label: string;
    value: string;
};

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
    <View style={styles.detailBlock}>
        <TextComp text={label} style={styles.detailLabel} />
        <TextComp text={value} style={styles.detailValue} />
    </View>
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

const Profile: React.FC = () => {
    const navigation = useNavigation();
    const userData = useSelector((state: RootState) => state.auth.userData);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const profile = useMemo(
        () => ({
            fullName: readUserField(userData, 'fullName', 'name') || 'James Wilson',
            email: readUserField(userData, 'email') || 'myleswilson@email.com',
            phone: readUserField(userData, 'phone', 'phoneNumber', 'mobile') || '12345678',
        }),
        [userData],
    );

    const displayName = profile.fullName.toUpperCase();

    const confirmLogout = useCallback(() => {
        setIsLogoutModalVisible(false);
        clearDataAction();
    }, []);

    return (
        <WrapperContainer style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={PROFILE_BG} />
            <ImageBackground
                source={localImages.homeBg}
                style={styles.background}
                resizeMode="cover"
            >
                <ProfileScreenHeader />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.heroCard}>
                        <View style={styles.avatarWrap}>
                            <LinearGradient
                                colors={[...Colors.buttonSplitBorderGradient]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.avatarBorder}
                            >
                                <View style={styles.avatarInner}>
                                    <Image
                                        source={localImages.user}
                                        style={styles.avatar}
                                        resizeMode="cover"
                                    />
                                </View>
                            </LinearGradient>
                        </View>

                        <TextComp text={displayName} style={styles.name} />

                        <ButtonComp
                            title="EDIT PROFILE"
                            onPress={() => navigation.navigate(routes.main.editProfile as never)}
                            variant="premium"
                            height={moderateScale(48)}
                            style={styles.editButton}
                            rightIcon
                        />

                        <Pressable
                            style={styles.addAvatarButton}
                            accessibilityRole="button"
                            accessibilityLabel="Add avatar"
                        >
                            <TextComp text="ADD AVATAR" style={styles.addAvatarText} />
                        </Pressable>
                    </View>

                    <View style={styles.detailsCard}>
                        <DetailRow label="Full Name" value={profile.fullName} />
                        <DetailRow label="Email" value={profile.email} />
                        <DetailRow label="Phone Number" value={profile.phone} />
                    </View>

                    <ButtonComp
                        title="LOGOUT"
                        onPress={() => setIsLogoutModalVisible(true)}
                        variant="premium"
                        height={moderateScale(48)}
                        style={styles.logoutButton}
                        rightIcon
                    />
                </ScrollView>
            </ImageBackground>

            <AppModal
                isVisible={isLogoutModalVisible}
                onClose={() => setIsLogoutModalVisible(false)}
                type="logout"
                title="Sign out?"
                message="Are you sure you want to sign out of your account?"
                primaryButtonText="Yes"
                secondaryButtonText="No"
                onPrimaryPress={confirmLogout}
                onSecondaryPress={() => setIsLogoutModalVisible(false)}
            />
        </WrapperContainer>
    );
};

export default Profile;
