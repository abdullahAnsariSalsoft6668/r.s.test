import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextComp from '@/components/TextComp';
import MyIcons, { IconName } from '@/components/MyIcons';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/styles/createAppTheme';
import { moderateScale } from '@/styles/scaling';

import ScalePressable from './ScalePressable';

export type ActionCardVariant = 'income' | 'expense' | 'donate';

type ActionCardProps = {
  title: string;
  subtitle: string;
  icon: IconName;
  variant: ActionCardVariant;
  onPress: () => void;
};

const getVariants = (
  theme: AppTheme,
  isDark: boolean,
): Record<
  ActionCardVariant,
  { colors: readonly [string, string]; iconBg: string; titleColor: string; borderColor: string }
> => ({
  income: isDark
    ? {
        colors: ['#1A3329', '#234A38'],
        iconBg: 'rgba(34, 160, 107, 0.28)',
        titleColor: '#86EFAC',
        borderColor: 'rgba(34, 160, 107, 0.35)',
      }
    : {
        colors: ['#ECFDF5', '#D1FAE5'],
        iconBg: 'rgba(34, 160, 107, 0.18)',
        titleColor: '#166534',
        borderColor: 'rgba(34, 160, 107, 0.22)',
      },
  expense: isDark
    ? {
        colors: ['#3B2020', '#4A2828'],
        iconBg: 'rgba(220, 76, 76, 0.22)',
        titleColor: '#FCA5A5',
        borderColor: 'rgba(220, 76, 76, 0.32)',
      }
    : {
        colors: ['#FEF2F2', '#FEE2E2'],
        iconBg: 'rgba(220, 76, 76, 0.12)',
        titleColor: '#991B1B',
        borderColor: 'rgba(220, 76, 76, 0.2)',
      },
  donate: isDark
    ? {
        colors: [theme.palette.emerald.muted, '#1A3329'],
        iconBg: theme.palette.emerald.surface,
        titleColor: theme.colors.brand.primaryLight,
        borderColor: 'rgba(21, 150, 110, 0.3)',
      }
    : {
        colors: [theme.palette.emerald.muted, '#D1FAE5'],
        iconBg: theme.palette.emerald.surface,
        titleColor: theme.palette.emerald.dark,
        borderColor: 'rgba(13, 107, 79, 0.2)',
      },
});

const ActionCard: React.FC<ActionCardProps> = ({ title, subtitle, icon, variant, onPress }) => {
  const { theme, isDark } = useAppTheme();
  const config = useMemo(() => getVariants(theme, isDark)[variant], [theme, isDark, variant]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          flex: 1,
          minWidth: moderateScale(100),
        },
        card: {
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          padding: moderateScale(14),
          minHeight: moderateScale(118),
          ...theme.shadows.soft,
        },
        iconWrap: {
          width: moderateScale(40),
          height: moderateScale(40),
          borderRadius: moderateScale(12),
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: moderateScale(10),
        },
        title: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(14),
          marginBottom: moderateScale(4),
        },
        subtitle: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(11),
          color: theme.colors.text.secondary,
          lineHeight: moderateScale(15),
        },
      }),
    [theme],
  );

  return (
    <ScalePressable onPress={onPress} style={styles.wrap}>
      <LinearGradient
        colors={[...config.colors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { borderColor: config.borderColor }]}
      >
        <View style={[styles.iconWrap, { backgroundColor: config.iconBg }]}>
          <MyIcons name={icon} size={moderateScale(22)} />
        </View>
        <TextComp text={title} style={[styles.title, { color: config.titleColor }]} />
        <TextComp text={subtitle} style={styles.subtitle} />
      </LinearGradient>
    </ScalePressable>
  );
};

export default React.memo(ActionCard);
