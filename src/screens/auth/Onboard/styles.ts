import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';
import { Platform, StyleSheet } from 'react-native';

export const ONBOARD_GRADIENT_TOP = '#F4F6F4';
export const ONBOARD_GRADIENT_BOTTOM = '#E8F5E6';

/** Base diameters (scaled) — large / medium / small orbs */
export const ORB_SIZE_LG = moderateScale(180);
export const ORB_SIZE_MD = moderateScale(120);
export const ORB_SIZE_SM = moderateScale(80);

/** Collage occupies ~58% of screen height */
export const COLLAGE_HEIGHT_RATIO = 0.58;

const styles = StyleSheet.create({
  gradientRoot: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  brandRow: {
    alignItems: 'center',
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(4),
  },
  brand: {
    fontSize: moderateScale(22),
    fontFamily: plusJakarta.bold,
    color: Colors.rizqGreen,
  },
  tagline: {
    fontSize: moderateScale(12),
    fontFamily: plusJakarta.regular,
    color: Colors.gray400,
    marginTop: moderateScale(4),
    textAlign: 'center',
  },
  collageContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(8),
  },
  heroCenter: {
    position: 'absolute',
    alignSelf: 'center',
    top: '18%',
  },
  orbShadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: moderateScale(4) },
        shadowOpacity: 0.12,
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
    fontFamily: plusJakarta.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  description: {
    fontSize: moderateScale(15),
    fontFamily: plusJakarta.regular,
    color: Colors.gray400,
    lineHeight: moderateScale(22),
    textAlign: 'center',
    marginBottom: moderateScale(24),
    paddingHorizontal: moderateScale(8),
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
    backgroundColor: Colors.rizqGreen,
  },
});

export default styles;
