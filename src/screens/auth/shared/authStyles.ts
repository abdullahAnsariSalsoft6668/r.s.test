import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { height, moderateScale } from '@/styles/scaling';
import { borders, spaces } from '@/styles/sizes';
import { StyleSheet } from 'react-native';

export const AUTH_BG_BASE = '#000814';
export const AUTH_BG_GLOW = '#003380';
export const AUTH_BG_MID = '#002366';

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        backgroundColor: AUTH_BG_BASE,
    },
    gradientLayer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    container: {
        flex: 1,
        backgroundColor: AUTH_BG_BASE,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    headerSection: {
        paddingHorizontal: spaces.medium,
        paddingBottom: spaces.large,
        paddingTop: spaces.xxl,
    },
    backButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: Colors.onboardingGlass,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spaces.medium,
    },
    headerTitleContainer: {
        paddingHorizontal: 0,
        paddingBottom: spaces.small,
        gap: moderateScale(8),
    },
    welcomeTitle: {
        fontSize: moderateScale(28),
        fontFamily: plusJakarta.bold,
        color: Colors.white,
        letterSpacing: 0,
    },
    welcomeSubtitle: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
        color: Colors.gray200,
        opacity: 1,
        marginBottom: 0,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: borders.card,
        borderTopRightRadius: borders.card,
        overflow: 'hidden',
        minHeight: height * 0.62,
    },
    card: {
        flex: 1,
        paddingHorizontal: spaces.medium,
        paddingTop: spaces.large,
        paddingBottom: moderateScale(40),
    },
    inputContainer: {
        marginBottom: moderateScale(20),
    },
    inputLabel: {
        color: Colors.text,
        marginLeft: 0,
    },
    inputField: {
        backgroundColor: Colors.inputBackgroundApp,
        borderColor: Colors.gray100,
    },
    actionButton: {
        width: '100%',
        marginTop: moderateScale(8),
    },
    actionButtonText: {
        color: Colors.white,
        fontFamily: fontFamily.bold,
    },
    otpWrap: {
        alignItems: 'center',
        marginTop: moderateScale(8),
        marginBottom: moderateScale(8),
    },
    otpInputContainer: {
        justifyContent: 'center',
        gap: moderateScale(12),
        alignSelf: 'center',
        width: moderateScale(52 * 4 + 12 * 3),
    },
    otpError: {
        color: Colors.error,
        marginTop: moderateScale(10),
        fontSize: moderateScale(13),
        fontFamily: fontFamily.regular,
        alignSelf: 'center',
    },
    resendPressable: {
        alignSelf: 'center',
        marginTop: moderateScale(18),
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(12),
    },
    resendText: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.bold,
        color: Colors.secondary,
        textDecorationLine: 'underline',
    },
});

export default styles;
