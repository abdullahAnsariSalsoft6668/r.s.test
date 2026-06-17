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
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(8),
  },
  searchInput: {
    marginBottom: moderateScale(16),
  },
  list: {
    paddingBottom: moderateScale(100),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.gray100,
  },
  cardLeft: {
    flex: 1,
    marginRight: moderateScale(12),
  },
  name: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(15),
    color: Colors.text,
    marginBottom: moderateScale(4),
  },
  relationship: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(13),
    color: theme.colors.brand.success,
    marginBottom: moderateScale(2),
  },
  note: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(12),
    color: Colors.gray500,
  },
  deleteButton: {
    padding: moderateScale(8),
  },
  empty: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(15),
    color: Colors.gray500,
    textAlign: 'center',
    paddingVertical: moderateScale(40),
  },
  fab: {
    position: 'absolute',
    right: moderateScale(20),
    bottom: moderateScale(24),
  },
});

export default styles;
