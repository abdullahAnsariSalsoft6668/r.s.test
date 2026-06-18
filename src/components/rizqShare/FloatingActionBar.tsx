import React, { useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/styles/createAppTheme';
import { moderateScale } from '@/styles/scaling';

import ScalePressable from './ScalePressable';

export type FloatingAction = {
  label: string;
  onPress: () => void;
  variant?: 'income' | 'expense' | 'donate';
};

type FloatingActionBarProps = {
  title?: string;
  actions: FloatingAction[];
};

const getVariantColors = (
  theme: AppTheme,
  isDark: boolean,
): Record<
  NonNullable<FloatingAction['variant']>,
  { bg: string; text: string; border: string }
> => ({
  income: isDark
    ? {
        bg: 'rgba(34, 160, 107, 0.2)',
        text: theme.colors.semantic.income,
        border: 'rgba(34, 160, 107, 0.35)',
      }
    : {
        bg: 'rgba(34, 160, 107, 0.12)',
        text: theme.colors.semantic.income,
        border: 'rgba(34, 160, 107, 0.25)',
      },
  expense: isDark
    ? {
        bg: 'rgba(220, 76, 76, 0.18)',
        text: theme.colors.semantic.expense,
        border: 'rgba(220, 76, 76, 0.32)',
      }
    : {
        bg: 'rgba(220, 76, 76, 0.1)',
        text: theme.colors.semantic.expense,
        border: 'rgba(220, 76, 76, 0.22)',
      },
  donate: isDark
    ? {
        bg: theme.palette.emerald.surface,
        text: theme.colors.brand.primary,
        border: 'rgba(21, 150, 110, 0.3)',
      }
    : {
        bg: theme.palette.emerald.surface,
        text: theme.colors.brand.primary,
        border: 'rgba(13, 107, 79, 0.22)',
      },
});

const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ title, actions }) => {
  const { theme, isDark } = useAppTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const bottomOffset = tabBarHeight + moderateScale(8);
  const variantColors = useMemo(() => getVariantColors(theme, isDark), [theme, isDark]);
  const styles = useMemo(
    () =>
      StyleSheet.create({
        outer: {
          position: 'absolute',
          left: 0,
          right: 0,
          zIndex: 20,
          backgroundColor: theme.colors.card.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.subtle,
          paddingHorizontal: moderateScale(12),
          paddingTop: moderateScale(12),
          paddingBottom: moderateScale(10),
          ...theme.shadows.card,
          ...Platform.select({
            android: { elevation: 12 },
            default: {},
          }),
        },
        title: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(12),
          color: theme.colors.text.secondary,
          marginBottom: moderateScale(8),
          textAlign: 'center',
        },
        row: {
          flexDirection: 'row',
          gap: moderateScale(8),
        },
        btn: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: moderateScale(12),
          borderRadius: moderateScale(12),
          borderWidth: 1,
          minHeight: moderateScale(44),
        },
        btnText: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(11),
          textAlign: 'center',
        },
      }),
    [theme],
  );

  return (
    <View style={[styles.outer, { bottom: bottomOffset }]} pointerEvents="box-none">
      {title ? <TextComp text={title} style={styles.title} /> : null}
      <View style={styles.row}>
        {actions.map((action) => {
          const colors = action.variant ? variantColors[action.variant] : variantColors.donate;
          return (
            <ScalePressable
              key={action.label}
              onPress={action.onPress}
              style={[styles.btn, { backgroundColor: colors.bg, borderColor: colors.border }]}
            >
              <TextComp text={action.label} style={[styles.btnText, { color: colors.text }]} />
            </ScalePressable>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(FloatingActionBar);
