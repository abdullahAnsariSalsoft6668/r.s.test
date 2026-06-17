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
    paddingBottom: moderateScale(40),
  },
  disclaimerCard: {
    backgroundColor: '#FFF9E5',
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
    marginBottom: moderateScale(20),
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  disclaimerText: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(13),
    color: Colors.text,
    lineHeight: moderateScale(20),
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    padding: moderateScale(18),
    marginBottom: moderateScale(14),
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  cardTitle: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(16),
    color: Colors.text,
    marginBottom: moderateScale(8),
  },
  cardBody: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(14),
    color: Colors.gray500,
    lineHeight: moderateScale(21),
  },
  sectionTitle: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(16),
    color: Colors.text,
    marginTop: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  actionButton: {
    marginBottom: moderateScale(12),
  },
});

export default styles;
