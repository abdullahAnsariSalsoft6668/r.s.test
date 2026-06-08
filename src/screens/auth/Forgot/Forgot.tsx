// import { useVerifyEmailMutation } from '@/api/resetPassApiSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import AuthPromptRow from '@/components/AuthPromptRow';
import ButtonComp from '@/components/ButtonComp';
import routes from '@/constants/routes';
import { AuthStackParamList } from '@/navigation/types';
import { Colors } from '@/styles/colors';

import AuthScreenLayout from '../shared/AuthScreenLayout';
import AuthStaggerItem from '../shared/AuthStaggerItem';
import AuthTextInput from '../shared/AuthTextInput';
import styles from './styles';

const ACTION_GRADIENT = [Colors.secondary, '#8B0000'] as const;

const Forgot = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    // const [forgotPassword, { isLoading }] = useVerifyEmailMutation();
    const isLoading = false;

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const handleForgotPassword = async (values: { email: string }) => {
        const email = values.email.trim();
        navigation.navigate(routes.auth.forgotVerifyOtp, { email });
    };

    return (
        <AuthScreenLayout
            title="Forgot Password?"
            subtitle="Enter your email to receive a verification code."
            footerStaggerIndex={2}
            footer={
                <AuthPromptRow
                    promptText="Remember your password?"
                    linkText="Back to login"
                    onLinkPress={() => navigation.goBack()}
                    lightTheme
                />
            }
        >
            <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleForgotPassword}
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
                            label="Email"
                            required
                            placeholder="Phone or Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            containerStyle={styles.inputContainer}
                            labelStyle={styles.inputLabel}
                            inputContainerStyle={styles.inputField}
                        />

                        <AuthStaggerItem index={1}>
                            <ButtonComp
                                variant="primary"
                                size="l"
                                title="Send Code"
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

export default Forgot;
