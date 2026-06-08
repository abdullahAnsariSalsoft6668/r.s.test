import { lifeSavers } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';
import { Platform, StyleSheet } from 'react-native';

export const ONBOARD_GRADIENT_TOP = Colors.onboardingSalmon;
export const ONBOARD_GRADIENT_BOTTOM = '#FFF8F0';

/** Base diameters (scaled) — large / medium / small orbs */
export const ORB_SIZE_LG = moderateScale(180);
export const ORB_SIZE_MD = moderateScale(120);
export const ORB_SIZE_SM = moderateScale(80);

/** Collage occupies ~64% of screen height (plan: 62–68%) */
export const COLLAGE_HEIGHT_RATIO = 0.64;

const styles = StyleSheet.create({
    gradientRoot: {
        flex: 1,
    },
    safe: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: spaces.medium,
        paddingTop: moderateScale(8),
        paddingBottom: moderateScale(4),
    },
    skipButton: {
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(8),
    },
    skipRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(6),
    },
    skipText: {
        fontSize: moderateScale(16),
        fontFamily: fontFamily.regular,
        color: Colors.textSecondary,
    },
    collageContainer: {
        width: '100%',
        // overflow: 'hidden',
        position: 'relative',
        marginTop: moderateScale(12),
    },
    orbShadow: {
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: { width: 0, height: moderateScale(4) },
                shadowOpacity: 0.1,
                shadowRadius: moderateScale(8),
            },
            android: {
                elevation: 4,
            },
        }),
    },
    bottomBlock: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: spaces.medium,
        paddingTop: moderateScale(12),
        paddingBottom: moderateScale(8),
    },
    title: {
        fontSize: moderateScale(26),
        fontFamily: lifeSavers.bold,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: moderateScale(10),
    },
    description: {
        fontSize: moderateScale(15),
        fontFamily: fontFamily.regular,
        color: Colors.gray400,
        lineHeight: moderateScale(22),
        textAlign: 'center',
        marginBottom: moderateScale(24),
        paddingHorizontal: moderateScale(8),
    },
    ctaLabel: {
        fontSize: moderateScale(14),
        fontFamily: fontFamily.bold,
        color: Colors.white,
        letterSpacing: moderateScale(0.8),
    },
    ctaArrowCircle: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        backgroundColor: 'rgba(255,255,255,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(8),
        marginTop: moderateScale(22),
        marginBottom: moderateScale(8),
    },
    dot: {
        width: moderateScale(8),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: Colors.gray200,
    },
    activeDot: {
        width: moderateScale(22),
        height: moderateScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: Colors.primary,
    },
});

export default styles;
