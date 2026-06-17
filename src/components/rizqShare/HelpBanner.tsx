import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

type HelpBannerProps = {
  message: string;
};

const HelpBanner: React.FC<HelpBannerProps> = ({ message }) => {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        banner: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: theme.palette.emerald.surface,
          borderRadius: theme.radius.md,
          padding: spaces.medium,
          marginBottom: spaces.medium,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(21, 150, 110, 0.25)' : 'rgba(13, 107, 79, 0.15)',
          gap: moderateScale(10),
        },
        icon: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(16),
          color: theme.colors.brand.primary,
          marginTop: moderateScale(1),
        },
        message: {
          flex: 1,
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(13),
          color: theme.colors.brand.primaryDark,
          lineHeight: moderateScale(19),
        },
      }),
    [theme, isDark],
  );

  return (
    <View style={styles.banner}>
      <TextComp text="ℹ" style={styles.icon} />
      <TextComp text={message} style={styles.message} />
    </View>
  );
};

export default React.memo(HelpBanner);
