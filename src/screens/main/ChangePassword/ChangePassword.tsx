import HeaderComp from '@/components/HeaderComp';
import TitleContainer from '@/components/Auth/TitleContainer';
import ButtonComp from '@/components/ButtonComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import { Colors } from '@/styles/colors';
import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';

const ChangePassword: React.FC = () => {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    return (
        <WrapperContainer style={styles.container}>
            <View style={styles.darkBackground}>
                <HeaderComp
                    leftIcon="back"
                    iconColor={Colors.white}
                    customStyle={styles.header}
                />

                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <TitleContainer
                        title="CHANGE PASSWORD"
                        subtitle="Update your password"
                        darkTheme
                    />

                    <TextInputComp
                        label="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="•••••••••"
                        isPassword
                        containerStyle={styles.inputWrap}
                        labelStyle={styles.inputLabel}
                        leftIcon="key"
                    />

                    <TextInputComp
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="•••••••••"
                        isPassword
                        containerStyle={styles.inputWrap}
                        labelStyle={styles.inputLabel}
                        leftIcon="key"
                    />

                    <TextInputComp
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="•••••••••"
                        isPassword
                        containerStyle={styles.inputWrap}
                        labelStyle={styles.inputLabel}
                        leftIcon="key"
                    />

                    <ButtonComp
                        variant="primary"
                        size="l"
                        title="UPDATE PASSWORD"
                        onPress={() => {}}
                        style={styles.actionButton}
                        rightIcon
                    />
                </ScrollView>
            </View>
        </WrapperContainer>
    );
};

export default ChangePassword;
