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
    paddingBottom: moderateScale(32),
  },
  subtitle: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(14),
    color: Colors.gray500,
    marginBottom: moderateScale(24),
    lineHeight: moderateScale(20),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginBottom: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  percentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(16),
  },
  percentLabel: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(15),
    color: Colors.text,
  },
  percentValue: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(28),
    color: theme.colors.brand.success,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  stepButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#F0FAF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.brand.success,
  },
  stepButtonDisabled: {
    opacity: 0.4,
  },
  stepButtonText: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(22),
    color: theme.colors.brand.success,
  },
  sliderTrack: {
    height: moderateScale(6),
    borderRadius: moderateScale(6),
    backgroundColor: Colors.gray100,
    marginBottom: moderateScale(8),
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: theme.colors.brand.success,
    borderRadius: moderateScale(6),
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
  },
  rangeLabel: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(12),
    color: Colors.gray500,
  },
  basisLabel: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(13),
    color: Colors.gray500,
    marginBottom: moderateScale(6),
  },
  basisValue: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(14),
    color: Colors.text,
    lineHeight: moderateScale(20),
  },
  previewCard: {
    backgroundColor: '#F0FAF4',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginBottom: moderateScale(24),
    borderWidth: 1,
    borderColor: '#C8E6D4',
  },
  previewTitle: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(14),
    color: theme.colors.brand.success,
    marginBottom: moderateScale(8),
  },
  previewText: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(15),
    color: Colors.text,
    lineHeight: moderateScale(22),
  },
  saveButton: {
    marginTop: moderateScale(8),
  },
});

export default styles;
