import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          marginBottom: moderateScale(14),
        },
        title: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(17),
          color: theme.colors.text.primary,
          marginBottom: moderateScale(4),
        },
        subtitle: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(13),
          color: theme.colors.text.secondary,
          lineHeight: moderateScale(18),
        },
      }),
    [theme],
  );

  return (
    <View style={styles.wrap}>
      <TextComp text={title} style={styles.title} />
      {subtitle ? <TextComp text={subtitle} style={styles.subtitle} /> : null}
    </View>
  );
};

export default React.memo(SectionHeader);
