import { nasalization } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';
import { StyleSheet } from 'react-native';

export const PROFILE_BG = '#0A1210';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PROFILE_BG,
    },
    background: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spaces.medium,
        paddingBottom: moderateScale(40),
    },
    heroCard: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(24),
        paddingHorizontal: spaces.medium,
        paddingBottom: spaces.medium,
        paddingTop: moderateScale(56),
        marginTop: moderateScale(36),
        marginBottom: spaces.medium,
        alignItems: 'center',
    },
    avatarWrap: {
        position: 'absolute',
        top: moderateScale(-36),
        alignSelf: 'center',
    },
    avatarBorder: {
        padding: moderateScale(2),
        borderRadius: moderateScale(100),
    },
    avatarInner: {
        borderRadius: moderateScale(100),
        overflow: 'hidden',
        borderWidth: moderateScale(4),
        borderColor: Colors.primary,
    },
    avatar: {
        width: moderateScale(72),
        height: moderateScale(72),
        borderRadius: moderateScale(36),
        backgroundColor: Colors.gray100,
    },
    name: {
        fontSize: moderateScale(18),
        fontFamily: nasalization.regular,
        color: Colors.black,
        letterSpacing: moderateScale(0.8),
        marginBottom: moderateScale(16),
        textAlign: 'center',
    },
    editButton: {
        width: '100%',
        marginBottom: moderateScale(12),
    },
    addAvatarButton: {
        paddingVertical: moderateScale(4),
    },
    addAvatarText: {
        fontSize: moderateScale(12),
        fontFamily: fontFamily.bold,
        color: Colors.error,
        letterSpacing: moderateScale(0.8),
        textAlign: 'center',
    },
    detailsCard: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(24),
        padding: spaces.medium,
        gap: moderateScale(18),
    },
    detailBlock: {
        gap: moderateScale(6),
    },
    detailLabel: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.bold,
        color: Colors.black,
    },
    detailValue: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.regular,
        color: Colors.gray500,
    },
    logoutButton: {
        width: '100%',
        marginTop: spaces.medium,
    },
});

export default styles;
