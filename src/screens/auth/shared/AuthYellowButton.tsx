import React from 'react';
import {
    I18nManager,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { plusJakarta } from '@/assets/fonts';
import TextComp from '@/components/TextComp';
import { ButtonShimmer } from '@/components/shimmer';
import { palette } from '@/styles/palette';
import { moderateScale } from '@/styles/scaling';

type AuthYellowButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    helperText?: string;
    showBarcodeIcon?: boolean;
    leftIcon?: React.ReactNode;
};

const BARCODE_LINES = [
    { x: 1, width: 1.5, height: 14 },
    { x: 4.5, width: 2.5, height: 14 },
    { x: 9, width: 1.5, height: 14 },
    { x: 12.5, width: 2, height: 14 },
] as const;

const BarcodeIcon = () => (
    <Svg width={moderateScale(16)} height={moderateScale(16)} viewBox="0 0 16 16" fill="none">
        {BARCODE_LINES.map((line, index) => (
            <Rect
                key={index}
                x={line.x}
                y={(16 - line.height) / 2}
                width={line.width}
                height={line.height}
                rx={0.5}
                fill={palette.neutral.text}
            />
        ))}
    </Svg>
);

const AuthYellowButton: React.FC<AuthYellowButtonProps> = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    textStyle,
    helperText,
    showBarcodeIcon = true,
    leftIcon,
}) => (
    <View style={styles.wrap}>
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                disabled && !loading && styles.buttonDisabled,
                loading && styles.buttonLoading,
                style,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: disabled || loading, busy: loading }}
        >
            {loading ? (
                <ButtonShimmer inverse={false} />
            ) : (
                <View style={styles.content}>
                    {leftIcon ? (
                        <View style={styles.iconSlot}>{leftIcon}</View>
                    ) : showBarcodeIcon ? (
                        <View style={styles.iconSlot}>
                            <BarcodeIcon />
                        </View>
                    ) : null}
                    <TextComp text={title} style={[styles.label, textStyle]} />
                    <Text style={styles.arrow}>{I18nManager.isRTL ? '←' : '→'}</Text>
                </View>
            )}
        </Pressable>
        {helperText ? <TextComp text={helperText} style={styles.helperText} /> : null}
    </View>
);

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
    },
    button: {
        minHeight: moderateScale(52),
        borderRadius: moderateScale(14),
        backgroundColor: palette.yellow.main,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        paddingVertical: moderateScale(14),
        paddingHorizontal: moderateScale(20),
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
            default: {},
        }),
    },
    buttonDisabled: {
        opacity: 0.65,
    },
    buttonLoading: {
        opacity: 0.92,
    },
    content: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(8),
    },
    iconSlot: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontFamily: plusJakarta.bold,
        fontSize: moderateScale(15),
        color: palette.neutral.text,
        textAlign: 'center',
    },
    arrow: {
        fontFamily: plusJakarta.bold,
        fontSize: moderateScale(18),
        color: palette.neutral.text,
        lineHeight: moderateScale(20),
        marginTop: -1,
    },
    helperText: {
        marginTop: moderateScale(10),
        textAlign: 'center',
        fontFamily: plusJakarta.regular,
        fontSize: moderateScale(12),
        color: palette.neutral.textSecondary,
        lineHeight: moderateScale(18),
    },
});

export default AuthYellowButton;
