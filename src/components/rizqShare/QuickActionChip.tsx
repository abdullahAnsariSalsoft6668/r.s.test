import React, { useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/styles/createAppTheme';
import { moderateScale } from '@/styles/scaling';

import ScalePressable from './ScalePressable';

type QuickActionVariant = 'income' | 'expense' | 'donate';

type QuickActionChipProps = {
  label: string;
  variant: QuickActionVariant;
  onPress: () => void;
  style?: ViewStyle;
};

const getVariants = (
  theme: AppTheme,
  isDark: boolean,
): Record<
  QuickActionVariant,
  { colors: readonly [string, string]; textColor: string; borderColor: string }
> => ({
  income: isDark
    ? {
        colors: ['#1A3329', '#234A38'],
        textColor: '#86EFAC',
        borderColor: 'rgba(34, 160, 107, 0.35)',
      }
    : {
        colors: ['#DCFCE7', '#BBF7D0'],
        textColor: '#166534',
        borderColor: 'rgba(34, 160, 107, 0.25)',
      },
  expense: isDark
    ? {
        colors: ['#3B2020', '#4A2828'],
        textColor: '#FCA5A5',
        borderColor: 'rgba(220, 76, 76, 0.32)',
      }
    : {
        colors: ['#FEE2E2', '#FECACA'],
        textColor: '#991B1B',
        borderColor: 'rgba(220, 76, 76, 0.22)',
      },
  donate: isDark
    ? {
        colors: [theme.palette.emerald.muted, '#1A3329'],
        textColor: theme.colors.brand.primaryLight,
        borderColor: 'rgba(21, 150, 110, 0.3)',
      }
    : {
        colors: [theme.palette.emerald.muted, '#D1FAE5'],
        textColor: theme.palette.emerald.dark,
        borderColor: 'rgba(13, 107, 79, 0.22)',
      },
});

const QuickActionChip: React.FC<QuickActionChipProps> = ({
  label,
  variant,
  onPress,
  style,
}) => {
  const { theme, isDark } = useAppTheme();
  const config = useMemo(() => getVariants(theme, isDark)[variant], [theme, isDark, variant]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          flexGrow: 1,
          flexBasis: '30%',
        },
        chip: {
          paddingHorizontal: moderateScale(12),
          paddingVertical: moderateScale(12),
          borderRadius: moderateScale(14),
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: moderateScale(46),
        },
        label: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(12),
          textAlign: 'center',
        },
      }),
    [theme],
  );

  return (
    <ScalePressable onPress={onPress} style={[styles.wrap, style]}>
      <LinearGradient
        colors={[...config.colors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.chip, { borderColor: config.borderColor }]}
      >
        <TextComp text={label} style={[styles.label, { color: config.textColor }]} />
      </LinearGradient>
    </ScalePressable>
  );
};

export default React.memo(QuickActionChip);
