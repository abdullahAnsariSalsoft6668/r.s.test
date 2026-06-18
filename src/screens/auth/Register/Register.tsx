import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Linking, Pressable, Text, View } from 'react-native';
import * as Yup from 'yup';

import { signUpWithEmail } from '@/api/supabase/authService';
import AuthPromptRow from '@/components/AuthPromptRow';
import TextComp from '@/components/TextComp';
import { USE_MOCK_FINANCE_API } from '@/config/supabase';
import routes from '@/constants/routeNames';
import { AuthStackParamList } from '@/navigation/types';
import { loginSessionAction } from '@/redux/actions/auth';

import AuthScreenLayout from '../shared/AuthScreenLayout';
import AuthStaggerItem from '../shared/AuthStaggerItem';
import AuthTextInput from '../shared/AuthTextInput';
import AuthYellowButton from '../shared/AuthYellowButton';
import authStyles from '../shared/authStyles';
import styles from './styles';

const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().trim().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password too short').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
        acceptedTerms: Yup.boolean().oneOf([true], 'Please accept the terms to continue'),
    });

    const handleRegister = async (values: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
        acceptedTerms: boolean;
    }) => {
        setIsLoading(true);
        try {
            if (USE_MOCK_FINANCE_API) {
                await loginSessionAction({
                    user: {
                        email: values.email.trim(),
                        fullName: values.fullName.trim(),
                    },
                    accessToken: 'alpha-static-token',
                    refreshToken: 'alpha-static-refresh',
                    setFirstTime: false,
                });
                return;
            }

            const data = await signUpWithEmail(
                values.fullName,
                values.email,
                values.password,
            );

            if (data.session) {
                return;
            }

            Alert.alert(
                'Check your email',
                'We sent a confirmation link. Sign in after confirming your account.',
                [{ text: 'OK', onPress: () => navigation.navigate(routes.auth.login) }],
            );
        } catch (error) {
            Alert.alert(
                'Sign up failed',
                error instanceof Error ? error.message : 'Could not create account',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const openTermsPlaceholder = () => {
        Linking.openURL('https://example.com/terms').catch(() => {});
    };

    const openPrivacyPlaceholder = () => {
        Linking.openURL('https://example.com/privacy').catch(() => {});
    };

    return (
        <AuthScreenLayout
            title="Start Saving Today"
            subtitle="Create your free account and unlock stacked grocery discounts."
            badgeText="2,847 active deals right now"
            headerNote="No credit card • Free forever • 100% free"
            cardStyle={styles.cardContainerTall}
            footerStaggerIndex={6}
            footer={
                <AuthPromptRow
                    promptText="Already have an account?"
                    linkText="Sign in"
                    onLinkPress={() => navigation.navigate(routes.auth.login)}
                    lightTheme
                />
            }
        >
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    acceptedTerms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    values,
                    errors,
                    touched,
                    submitCount,
                }) => (
                    <>
                        <AuthTextInput
                            index={0}
                            label="Full Name"
                            required
                            placeholder="James Anderson"
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                            error={errors.fullName}
                            touched={touched.fullName}
                            autoCapitalize="words"
                            containerStyle={authStyles.inputContainer}
                            labelStyle={authStyles.inputLabel}
                            inputContainerStyle={authStyles.inputField}
                        />

                        <AuthTextInput
                            index={1}
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
                            containerStyle={authStyles.inputContainer}
                            labelStyle={authStyles.inputLabel}
                            inputContainerStyle={authStyles.inputField}
                        />

                        <AuthTextInput
                            index={2}
                            label="Password"
                            required
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                            isPassword
                            containerStyle={authStyles.inputContainer}
                            labelStyle={authStyles.inputLabel}
                            inputContainerStyle={authStyles.inputField}
                        />

                        <AuthTextInput
                            index={3}
                            label="Confirm Password"
                            required
                            placeholder="Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            isPassword
                            containerStyle={authStyles.inputContainer}
                            labelStyle={authStyles.inputLabel}
                            inputContainerStyle={authStyles.inputField}
                        />

                        <AuthStaggerItem index={4}>
                            <Pressable
                                onPress={() => setFieldValue('acceptedTerms', !values.acceptedTerms)}
                                style={styles.termsRow}
                                hitSlop={8}
                            >
                                <View style={styles.checkboxOuter}>
                                    {values.acceptedTerms && <View style={styles.checkboxInner} />}
                                </View>
                                <View style={styles.termsTextBlock}>
                                    <Text style={styles.termsText}>
                                        I agree to the{' '}
                                        <Text
                                            style={styles.termsLink}
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                openTermsPlaceholder();
                                            }}
                                        >
                                            Terms of Service
                                        </Text>{' '}
                                        and{' '}
                                        <Text
                                            style={styles.termsLink}
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                openPrivacyPlaceholder();
                                            }}
                                        >
                                            Privacy Policy
                                        </Text>
                                        . I am 18+ years old.
                                    </Text>
                                </View>
                            </Pressable>
                            {errors.acceptedTerms && (touched.acceptedTerms || submitCount > 0) ? (
                                <TextComp text={errors.acceptedTerms} style={styles.termsError} />
                            ) : null}
                        </AuthStaggerItem>

                        <AuthStaggerItem index={5}>
                            <AuthYellowButton
                                title="Create Account"
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

export default Register;
