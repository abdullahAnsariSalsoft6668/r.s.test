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
  scroll: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(8),
    paddingBottom: moderateScale(32),
  },
  field: {
    marginBottom: moderateScale(16),
  },
  label: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(13),
    color: Colors.text,
    marginBottom: moderateScale(8),
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
  },
  chip: {
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  chipSelected: {
    backgroundColor: '#F0FAF4',
    borderColor: theme.colors.brand.success,
  },
  chipText: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(13),
    color: Colors.text,
  },
  chipTextSelected: {
    fontFamily: plusJakarta.bold,
    color: theme.colors.brand.success,
  },
  error: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(12),
    color: theme.colors.status.error,
    marginTop: moderateScale(4),
  },
  saveButton: {
    marginTop: moderateScale(12),
  },
});

export default styles;
