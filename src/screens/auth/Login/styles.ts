import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { height, moderateScale } from '@/styles/scaling';
import { borders, spaces } from '@/styles/sizes';
import { StyleSheet, I18nManager } from 'react-native';

/** Login header background — sampled from design mockup */
export const LOGIN_BG_BASE = '#000814';
export const LOGIN_BG_GLOW = '#003380';
export const LOGIN_BG_MID = '#002366';

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        backgroundColor: LOGIN_BG_BASE,
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
        backgroundColor: LOGIN_BG_BASE,
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
        height: moderateScale(96),
        paddingHorizontal: 0,
        paddingBottom: spaces.small,
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
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(25),
    },
    rememberMeRow: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    checkbox: {
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: moderateScale(4),
        borderWidth: 1.5,
        borderColor: Colors.gray300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    checkboxFill: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(2),
        backgroundColor: Colors.secondary,
    },
    rememberMeText: {
        fontSize: moderateScale(13),
        fontFamily: fontFamily.regular,
        color: Colors.gray500,
    },
    forgotPasswordText: {
        fontSize: moderateScale(13),
        fontFamily: fontFamily.regular,
        color: Colors.gray500,
    },
    loginButton: {
        width: '100%',
        marginTop: moderateScale(8),
    },
    loginButtonText: {
        color: Colors.white,
        fontFamily: fontFamily.bold,
    },
});

export default styles;
