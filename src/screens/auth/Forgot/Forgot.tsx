// import { useVerifyEmailMutation } from '@/api/resetPassApiSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import AuthPromptRow from '@/components/AuthPromptRow';
import routes from '@/constants/routeNames';
import { AuthStackParamList } from '@/navigation/types';

import AuthScreenLayout from '../shared/AuthScreenLayout';
import AuthStaggerItem from '../shared/AuthStaggerItem';
import AuthTextInput from '../shared/AuthTextInput';
import AuthYellowButton from '../shared/AuthYellowButton';
import authStyles from '../shared/authStyles';

const Forgot = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
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
            title="Reset Your Password"
            subtitle="Enter your email and we'll send you a verification code."
            headerNote="We'll help you get back to saving"
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
                            placeholder="Enter your email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            containerStyle={authStyles.inputContainer}
                            labelStyle={authStyles.inputLabel}
                            inputContainerStyle={authStyles.inputField}
                        />

                        <AuthStaggerItem index={1}>
                            <AuthYellowButton
                                title="Send Code"
                                onPress={() => handleSubmit()}
                                loading={isLoading}
                                disabled={isLoading}
                                style={authStyles.actionButton}
                            />
                        </AuthStaggerItem>
                    </>
                )}
            </Formik>
        </AuthScreenLayout>
    );
};

export default Forgot;
