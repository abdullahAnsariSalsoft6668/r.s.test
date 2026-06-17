import React, { useCallback, useMemo, useState } from 'react';
import { I18nManager, Pressable, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import CalendarComp, { DateData } from '@/components/CalendarComp';
import MyIcons from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

type FinanceDateFieldProps = {
  label: string;
  value: string;
  onChange: (isoDate: string) => void;
  error?: boolean | string;
  touched?: boolean;
  required?: boolean;
  placeholder?: string;
};

const formatDisplayDate = (isoDate: string): string => {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return '';
  }
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const FinanceDateField: React.FC<FinanceDateFieldProps> = ({
  label,
  value,
  onChange,
  error,
  touched,
  required,
  placeholder = '',
}) => {
  const { theme } = useAppTheme();
  const [visible, setVisible] = useState(false);
  const hasError = Boolean(error && touched);
  const displayValue = useMemo(() => formatDisplayDate(value), [value]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginBottom: spaces.medium,
        },
        labelRow: {
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          marginBottom: moderateScale(8),
        },
        label: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(14),
          color: theme.colors.text.primary,
        },
        required: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(14),
          color: theme.colors.status.error,
        },
        field: {
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          alignItems: 'center',
          gap: moderateScale(10),
          backgroundColor: theme.colors.card.background,
          borderWidth: 1,
          borderColor: theme.colors.border.default,
          borderRadius: theme.radius.md,
          paddingHorizontal: moderateScale(14),
          paddingVertical: moderateScale(14),
          minHeight: moderateScale(52),
        },
        fieldError: {
          borderColor: theme.colors.status.error,
        },
        valueText: {
          flex: 1,
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(15),
          color: theme.colors.text.primary,
        },
        placeholderText: {
          color: theme.colors.text.muted,
        },
        errorText: {
          fontFamily: plusJakarta.regular,
          fontSize: moderateScale(12),
          color: theme.colors.status.error,
          marginTop: moderateScale(6),
        },
        modal: {
          justifyContent: 'flex-end',
          margin: 0,
        },
        sheet: {
          backgroundColor: theme.colors.card.background,
          borderTopLeftRadius: moderateScale(20),
          borderTopRightRadius: moderateScale(20),
          padding: spaces.medium,
          paddingBottom: moderateScale(32),
        },
        sheetTitle: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(16),
          color: theme.colors.text.primary,
          marginBottom: moderateScale(12),
          textAlign: 'center',
        },
        calendar: {
          borderRadius: theme.radius.md,
        },
        closeBtn: {
          marginTop: moderateScale(12),
          alignItems: 'center',
          paddingVertical: moderateScale(12),
          backgroundColor: theme.palette.emerald.surface,
          borderRadius: theme.radius.md,
        },
        closeBtnText: {
          fontFamily: plusJakarta.bold,
          fontSize: moderateScale(14),
          color: theme.colors.brand.primary,
        },
      }),
    [theme],
  );

  const calendarTheme = useMemo(
    () => ({
      selectedDayBackgroundColor: theme.colors.brand.primary,
      todayTextColor: theme.colors.brand.primary,
      arrowColor: theme.colors.brand.primary,
    }),
    [theme],
  );

  const handleDayPress = useCallback(
    (day: DateData) => {
      onChange(day.dateString);
      setVisible(false);
    },
    [onChange],
  );

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <TextComp text={label} style={styles.label} />
        {required ? <TextComp text=" *" style={styles.required} /> : null}
      </View>

      <Pressable
        style={[styles.field, hasError && styles.fieldError]}
        onPress={() => setVisible(true)}
        accessibilityRole="button"
      >
        <MyIcons name="calendar" size={moderateScale(18)} />
        <TextComp
          text={displayValue || placeholder}
          style={[styles.valueText, !displayValue && styles.placeholderText]}
        />
      </Pressable>

      {hasError && typeof error === 'string' ? (
        <TextComp text={error} style={styles.errorText} />
      ) : null}

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        style={styles.modal}
        backdropOpacity={0.45}
      >
        <View style={styles.sheet}>
          <TextComp text={label} style={styles.sheetTitle} />
          <CalendarComp
            selected={value || undefined}
            onDayPress={handleDayPress}
            theme={calendarTheme}
            style={styles.calendar}
          />
          <Pressable style={styles.closeBtn} onPress={() => setVisible(false)}>
            <TextComp text="OK" style={styles.closeBtnText} />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(FinanceDateField);
