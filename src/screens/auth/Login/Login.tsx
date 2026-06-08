import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

// import { useLoginMutation } from '@/api/authApiSlice';
import AuthPromptRow from '@/components/AuthPromptRow';
import ButtonComp from '@/components/ButtonComp';
import TextComp from '@/components/TextComp';
import routes from '@/constants/routes';
import { AuthStackParamList } from '@/navigation/types';
import { loginSessionAction } from '@/redux/actions/auth';
import { Colors } from '@/styles/colors';

import AuthScreenLayout from '../shared/AuthScreenLayout';
import AuthStaggerItem from '../shared/AuthStaggerItem';
import AuthTextInput from '../shared/AuthTextInput';
import styles from './styles';

const LOGIN_GRADIENT = [Colors.secondary, '#8B0000'] as const;

const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const [rememberMe, setRememberMe] = useState(false);
    // const [login, { isLoading }] = useLoginMutation();
    const isLoading = false;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Required')
            .test('email-or-phone', 'Invalid email or phone', (value) => {
                if (!value?.trim()) {
                    return false;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^[+]?[\d\s()-]{7,}$/;
                return emailRegex.test(value.trim()) || phoneRegex.test(value.trim());
            }),
        password: Yup.string().required('Required'),
    });

    const handleLogin = async (values: { email: string; password: string }) => {
        await loginSessionAction({
            user: {
                email: values.email.trim(),
                fullName: 'Demo User',
            },
            accessToken: 'alpha-static-token',
            refreshToken: 'alpha-static-refresh',
            setFirstTime: false,
        });
    };

    return (
        <AuthScreenLayout
            title="Hi! Welcome Back 👋"
            subtitle="Enter your email address below to login."
            footerStaggerIndex={4}
            footer={
                <AuthPromptRow
                    promptText="Don't have an account?"
                    linkText="Signup"
                    onLinkPress={() => navigation.navigate(routes.auth.register)}
                    lightTheme
                />
            }
        >
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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

                        <AuthTextInput
                            index={1}
                            label="Password"
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

                        <AuthStaggerItem index={2}>
                            <View style={styles.footerRow}>
                                <Pressable
                                    style={styles.rememberMeRow}
                                    onPress={() => setRememberMe(!rememberMe)}
                                    hitSlop={8}
                                >
                                    <View style={styles.checkbox}>
                                        {rememberMe && <View style={styles.checkboxFill} />}
                                    </View>
                                    <TextComp text="Remember me" style={styles.rememberMeText} />
                                </Pressable>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate(routes.auth.forgot)}
                                >
                                    <TextComp
                                        text="Forgot Password ?"
                                        style={styles.forgotPasswordText}
                                    />
                                </TouchableOpacity>
                            </View>
                        </AuthStaggerItem>

                        <AuthStaggerItem index={3}>
                            <ButtonComp
                                variant="primary"
                                size="l"
                                title="Login"
                                onPress={() => handleSubmit()}
                                loading={isLoading}
                                disabled={isLoading}
                                style={styles.loginButton}
                                gradientColors={LOGIN_GRADIENT}
                                textStyle={styles.loginButtonText}
                            />
                        </AuthStaggerItem>
                    </>
                )}
            </Formik>
        </AuthScreenLayout>
    );
};

export default Login;
