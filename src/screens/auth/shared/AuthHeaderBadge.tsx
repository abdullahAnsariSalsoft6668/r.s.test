import React from 'react';
import { StyleSheet, View } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import TextComp from '@/components/TextComp';
import { palette } from '@/styles/palette';
import { moderateScale } from '@/styles/scaling';

type AuthHeaderBadgeProps = {
    text: string;
};

const AuthHeaderBadge: React.FC<AuthHeaderBadgeProps> = ({ text }) => (
    <View style={styles.wrap}>
        <View style={styles.dot} />
        <TextComp text={text} style={styles.text} />
    </View>
);

const styles = StyleSheet.create({
    wrap: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(12),
        marginBottom: moderateScale(14),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.18)',
    },
    dot: {
        width: moderateScale(8),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: palette.yellow.main,
    },
    text: {
        fontFamily: plusJakarta.bold,
        fontSize: moderateScale(12),
        color: palette.neutral.white,
    },
});

export default AuthHeaderBadge;
