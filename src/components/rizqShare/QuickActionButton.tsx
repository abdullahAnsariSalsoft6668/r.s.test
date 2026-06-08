import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import type { RizqThemeColors } from '@/styles/rizqTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface QuickActionButtonProps {
    colors: RizqThemeColors;
    label: string;
    icon: React.ReactNode;
    accentColor: string;
    onPress?: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
    colors,
    label,
    icon,
    accentColor,
    onPress,
}) => (
    <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
        onPress={onPress}
        activeOpacity={0.75}
    >
        <View style={[styles.iconWrap, { backgroundColor: `${accentColor}18` }]}>{icon}</View>
        <TextComp text={label} style={[styles.label, { color: colors.text }]} numberOfLines={2} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        borderRadius: moderateScale(14),
        borderWidth: 1,
        paddingVertical: moderateScale(14),
        paddingHorizontal: moderateScale(6),
        gap: moderateScale(8),
    },
    iconWrap: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: moderateScale(11),
        fontFamily: plusJakarta.bold,
        textAlign: 'center',
    },
});

export default React.memo(QuickActionButton);
