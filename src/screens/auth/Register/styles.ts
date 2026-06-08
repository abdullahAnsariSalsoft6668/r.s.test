import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { height, moderateScale } from '@/styles/scaling';
import { borders, spaces } from '@/styles/sizes';
import { I18nManager, StyleSheet } from 'react-native';

export { LOGIN_BG_BASE, LOGIN_BG_GLOW, LOGIN_BG_MID } from '../Login/styles';

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        backgroundColor: '#000814',
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
        backgroundColor: '#000814',
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
    cardContainerTall: {
        minHeight: height * 0.72,
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
    termsRow: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        marginBottom: moderateScale(20),
    },
    checkboxOuter: {
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: moderateScale(4),
        borderWidth: 1.5,
        borderColor: Colors.gray300,
        marginTop: moderateScale(2),
        marginEnd: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    checkboxInner: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(2),
        backgroundColor: Colors.secondary,
    },
    termsTextBlock: {
        flex: 1,
    },
    termsText: {
        fontSize: moderateScale(13),
        fontFamily: fontFamily.regular,
        color: Colors.gray500,
        lineHeight: moderateScale(20),
    },
    termsLink: {
        fontSize: moderateScale(13),
        fontFamily: fontFamily.bold,
        color: Colors.secondary,
        textDecorationLine: 'underline',
    },
    termsError: {
        fontSize: moderateScale(12),
        fontFamily: fontFamily.regular,
        color: Colors.error,
        marginBottom: moderateScale(8),
    },
    registerButton: {
        width: '100%',
        marginTop: moderateScale(8),
    },
    registerButtonText: {
        color: Colors.white,
        fontFamily: fontFamily.bold,
    },
});

export default styles;
