import MyIcons from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import type { RizqThemeColors } from '@/styles/rizqTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RizqLeafIcon } from './RizqIcons';

interface ScreenHeaderProps {
    colors: RizqThemeColors;
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showNotification?: boolean;
    onNotificationPress?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
    colors,
    title,
    subtitle,
    showLogo = false,
    showNotification = true,
    onNotificationPress,
}) => (
    <View style={styles.container}>
        <View style={styles.left}>
            {showLogo && (
                <View style={styles.logoRow}>
                    <RizqLeafIcon size={moderateScale(28)} color={colors.primaryDark} />
                    <View>
                        <TextComp text="RizqShare" style={[styles.brand, { color: colors.primary }]} />
                        <TextComp
                            text="Share your Rizq, earn infinite reward."
                            style={[styles.tagline, { color: colors.textMuted }]}
                            numberOfLines={1}
                        />
                    </View>
                </View>
            )}
            {title && (
                <TextComp text={title} style={[styles.title, { color: colors.text }]} />
            )}
            {subtitle && (
                <TextComp text={subtitle} style={[styles.subtitle, { color: colors.textSecondary }]} />
            )}
        </View>
        {showNotification && (
            <TouchableOpacity
                style={[styles.bell, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
                onPress={onNotificationPress}
                activeOpacity={0.8}
            >
                <MyIcons name="bell" size={moderateScale(20)} stroke={colors.text} />
            </TouchableOpacity>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: moderateScale(20),
    },
    left: { flex: 1, marginRight: moderateScale(12) },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(10),
    },
    brand: {
        fontSize: moderateScale(20),
        fontFamily: plusJakarta.bold,
    },
    tagline: {
        fontSize: moderateScale(11),
        fontFamily: plusJakarta.regular,
        maxWidth: moderateScale(220),
    },
    title: {
        fontSize: moderateScale(22),
        fontFamily: plusJakarta.bold,
    },
    subtitle: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
        marginTop: moderateScale(4),
    },
    bell: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(12),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(ScreenHeader);
