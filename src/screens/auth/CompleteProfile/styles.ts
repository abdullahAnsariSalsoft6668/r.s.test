import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { height, moderateScale, width } from '@/styles/scaling';
import { borders, heights, spaces } from '@/styles/sizes';
import { StyleSheet, I18nManager } from 'react-native';

const PREFERENCE_GAP = spaces.small;
const PREFERENCE_BOX_MIN_WIDTH = (width - moderateScale(48) - PREFERENCE_GAP) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        height: heights.loginCard,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingLeft: spaces.medium,
        paddingBottom: spaces.small,
    },
    bgImage: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    card: {
        flex: 1,
        padding: moderateScale(24),
        paddingBottom: moderateScale(32),
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        width: width * 1,
    },
    cardContainer: {
        flex: 1,
        maxHeight: height * 0.88,
        borderTopRightRadius: borders.card,
        borderTopLeftRadius: borders.card,
        overflow: 'hidden',
    },
    titleRow: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        flexWrap: 'wrap',
        marginBottom: spaces.small,
    },
    titleAccent: {
        fontSize: moderateScale(32),
        fontFamily: fontFamily.light,
        color: Colors.primary,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    titleMain: {
        fontSize: moderateScale(32),
        fontFamily: fontFamily.bold,
        color: Colors.white,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    subtitle: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.regular,
        color: Colors.white,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        marginBottom: moderateScale(24),
        opacity: 0.9,
    },
    inputContainer: {
        marginBottom: spaces.medium,
    },
    sectionLabel: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.regular,
        color: Colors.white,
        marginBottom: spaces.small,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    preferenceGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -PREFERENCE_GAP / 2,
        marginBottom: spaces.medium,
    },
    preferenceBox: {
        width: PREFERENCE_BOX_MIN_WIDTH,
        minHeight: moderateScale(48),
        margin: PREFERENCE_GAP / 2,
        paddingVertical: spaces.small,
        paddingHorizontal: spaces.medium,
        borderRadius: borders.preferenceBox,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: spaces.small,
    },
    preferenceBoxSelected: {
        backgroundColor: Colors.onboardingNavy,
        // borderColor: Colors.primary,
    },
    preferenceCheck: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(4),
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preferenceCheckSelected: {
        backgroundColor: Colors.primary,
    },
    preferenceCheckMark: {
        fontSize: moderateScale(12),
        color: Colors.white,
        fontWeight: 'bold',
    },
    preferenceLabel: {
        flex: 1,
        fontSize: moderateScale(14),
        fontFamily: fontFamily.regular,
        color: Colors.white,
    },
    finishButton: {},
    finishButtonText: {
        fontSize: moderateScale(18),
        fontFamily: fontFamily.bold,
    },
});

export default styles;
