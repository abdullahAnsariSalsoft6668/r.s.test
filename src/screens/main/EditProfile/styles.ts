import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale, width } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';
import { StyleSheet } from 'react-native';

export const EDIT_PROFILE_BG = '#0A1210';

const AVATAR_COLUMNS = 8;
const AVATAR_GAP = moderateScale(8);
const HORIZONTAL_PADDING = spaces.medium * 2;
export const AVATAR_SIZE = Math.floor(
    (width - HORIZONTAL_PADDING - AVATAR_GAP * (AVATAR_COLUMNS - 1)) / AVATAR_COLUMNS,
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: EDIT_PROFILE_BG,
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
    photoSection: {
        alignItems: 'center',
        marginTop: moderateScale(12),
        marginBottom: moderateScale(20),
    },
    photoWrap: {
        position: 'relative',
    },
    photoBorder: {
        padding: moderateScale(2),
        borderRadius: moderateScale(100),
    },
    photoInner: {
        borderRadius: moderateScale(100),
        overflow: 'hidden',
        borderWidth: moderateScale(4),
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoImage: {
        width: moderateScale(96),
        height: moderateScale(96),
        borderRadius: moderateScale(48),
    },
    photoAvatarIcon: {
        width: moderateScale(96),
        height: moderateScale(96),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    addPhotoButton: {
        position: 'absolute',
        right: moderateScale(2),
        bottom: moderateScale(2),
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.gray100,
    },
    addPhotoText: {
        fontSize: moderateScale(18),
        fontFamily: fontFamily.bold,
        color: Colors.success,
        marginTop: moderateScale(-2),
    },
    avatarHint: {
        marginTop: moderateScale(18),
        fontSize: moderateScale(11),
        fontFamily: fontFamily.bold,
        color: Colors.white,
        textAlign: 'center',
        letterSpacing: moderateScale(0.6),
        lineHeight: moderateScale(16),
        paddingHorizontal: moderateScale(12),
    },
    avatarGrid: {
        marginBottom: moderateScale(24),
        gap: AVATAR_GAP,
    },
    avatarRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: AVATAR_GAP,
    },
    avatarOption: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatarOptionSelectedBorder: {
        padding: moderateScale(2),
        borderRadius: moderateScale(100),
    },
    avatarOptionInner: {
        width: AVATAR_SIZE - moderateScale(4),
        height: AVATAR_SIZE - moderateScale(4),
        borderRadius: (AVATAR_SIZE - moderateScale(4)) / 2,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    formSection: {
        marginBottom: moderateScale(24),
    },
    updateButton: {
        width: '100%',
        marginTop: moderateScale(8),
    },
});

export default styles;
