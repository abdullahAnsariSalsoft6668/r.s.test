import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

type EmptyStateProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, action }) => {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          paddingVertical: spaces.xl,
          paddingHorizontal: spaces.medium,
        },
        iconRing: {
          width: moderateScale(64),
          height: moderateScale(64),
          borderRadius: moderateScale(32),
          backgroundColor: theme.palette.emerald.surface,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: moderateScale(16),
          borderWidth: 1,
          borderColor: isDark ? 'rgba(21, 150, 110, 0.25)' : 'rgba(13, 107, 79, 0.15)',
        },
        iconGlyph: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(24),
          color: theme.colors.brand.primary,
        },
        title: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(16),
          color: theme.colors.text.primary,
          textAlign: 'center',
          marginBottom: moderateScale(8),
        },
        subtitle: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(14),
          color: theme.colors.text.secondary,
          textAlign: 'center',
          lineHeight: moderateScale(20),
        },
        action: {
          marginTop: moderateScale(20),
          width: '100%',
        },
      }),
    [theme, isDark],
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconRing}>
        <TextComp text="✦" style={styles.iconGlyph} />
      </View>
      <TextComp text={title} style={styles.title} />
      {subtitle ? <TextComp text={subtitle} style={styles.subtitle} /> : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
};

export default EmptyState;
