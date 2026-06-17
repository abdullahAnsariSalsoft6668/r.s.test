import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';

import ScalePressable from './ScalePressable';

type TransactionRowActionsProps = {
  editLabel: string;
  onEdit: () => void;
};

const TransactionRowActions: React.FC<TransactionRowActionsProps> = ({ editLabel, onEdit }) => {
  const { theme } = useAppTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        editBtn: {
          paddingHorizontal: moderateScale(12),
          paddingVertical: moderateScale(6),
          borderRadius: moderateScale(20),
          backgroundColor: theme.palette.emerald.surface,
          borderWidth: 1,
          borderColor: theme.colors.brand.primary,
          marginLeft: moderateScale(8),
        },
        editText: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(11),
          color: theme.colors.brand.primary,
        },
      }),
    [theme],
  );

  return (
    <ScalePressable
      onPress={onEdit}
      style={styles.editBtn}
      accessibilityRole="button"
      accessibilityLabel={editLabel}
    >
      <TextComp text={editLabel} style={styles.editText} />
    </ScalePressable>
  );
};

export default React.memo(TransactionRowActions);
