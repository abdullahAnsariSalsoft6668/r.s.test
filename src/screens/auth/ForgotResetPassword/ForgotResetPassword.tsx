// import { useResetPassMutation } from '@/api/resetPassApiSlice';
import AuthPromptRow from '@/components/AuthPromptRow';
import ButtonComp from '@/components/ButtonComp';
import routes from '@/constants/routes';
import type { AuthStackParamList } from '@/navigation/types';
import { Colors } from '@/styles/colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import * as Yup from 'yup';

import AuthScreenLayout from '../shared/AuthScreenLayout';
import AuthStaggerItem from '../shared/AuthStaggerItem';
import AuthTextInput from '../shared/AuthTextInput';
import styles from '../Forgot/styles';

const ACTION_GRADIENT = [Colors.secondary, '#8B0000'] as const;

const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'At least 6 characters').required('Required'),
    confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const ForgotResetPassword: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const route = useRoute<RouteProp<AuthStackParamList, 'ForgotResetPassword'>>();
    const email = String(route.params?.email ?? '').trim();
    const otp = String(route.params?.otp ?? '').trim();

    const isLoading = false;

    useEffect(() => {
        if (!email || !otp) {
            navigation.goBack();
        }
    }, [email, otp, navigation]);

    const handleReset = useCallback(
        async (_values: { password: string; confirmPassword: string }) => {
            navigation.reset({
                index: 0,
                routes: [{ name: routes.auth.login }],
            });
        },
        [navigation],
    );

    const handleBackToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: routes.auth.login }],
        });
    };

    return (
        <AuthScreenLayout
            title="Reset Password"
            subtitle="Enter a new password for your account."
            footerStaggerIndex={3}
            footer={
                <AuthPromptRow
                    promptText="Remember your password?"
                    linkText="Back to login"
                    onLinkPress={handleBackToLogin}
                    lightTheme
                />
            }
        >
            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleReset}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
                        <AuthTextInput
                            index={0}
                            label="New Password"
                            required
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                            isPassword
                            containerStyle={styles.inputContainer}
                            labelStyle={styles.inputLabel}
                            inputContainerStyle={styles.inputField}
                        />

                        <AuthTextInput
                            index={1}
                            label="Confirm Password"
                            required
                            placeholder="Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            isPassword
                            containerStyle={styles.inputContainer}
                            labelStyle={styles.inputLabel}
                            inputContainerStyle={styles.inputField}
                        />

                        <AuthStaggerItem index={2}>
                            <ButtonComp
                                variant="primary"
                                size="l"
                                title="Update Password"
                                onPress={() => handleSubmit()}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.actionButton}
                                gradientColors={ACTION_GRADIENT}
                                textStyle={styles.actionButtonText}
                            />
                        </AuthStaggerItem>
                    </>
                )}
            </Formik>
        </AuthScreenLayout>
    );
};

export default ForgotResetPassword;
