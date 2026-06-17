import { StyleSheet } from 'react-native';

import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { theme } from '@/styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  headerTitle: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(18),
    color: Colors.text,
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(8),
  },
  subtitle: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(15),
    color: Colors.text,
    marginBottom: moderateScale(8),
  },
  rtlNote: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(12),
    color: Colors.gray500,
    marginBottom: moderateScale(24),
    lineHeight: moderateScale(18),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: theme.colors.brand.primary,
    backgroundColor: '#F0FAF4',
  },
  radio: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    borderWidth: 2,
    borderColor: Colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: theme.colors.brand.primary,
  },
  radioDot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: theme.colors.brand.primary,
  },
  optionLabel: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(15),
    color: Colors.text,
  },
});

export default styles;
