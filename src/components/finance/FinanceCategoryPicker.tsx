import React, { useCallback, useState } from 'react';
import {
  I18nManager,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import ButtonComp from '@/components/ButtonComp';
import MyIcons from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { theme } from '@/styles/theme';

export type CategoryOption = {
  id: string;
  name: string;
};

type FinanceCategoryPickerProps = {
  label: string;
  placeholder: string;
  categories: CategoryOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddCategory: (name: string) => Promise<CategoryOption | void>;
  accentColor?: string;
  error?: string | boolean;
  touched?: boolean;
};

const FinanceCategoryPicker: React.FC<FinanceCategoryPickerProps> = ({
  label,
  placeholder,
  categories,
  selectedId,
  onSelect,
  onAddCategory,
  accentColor = theme.colors.brand.success,
  error,
  touched,
}) => {
  const { t } = useTranslation();
  const [pickerVisible, setPickerVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [customName, setCustomName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const selected = categories.find((c) => c.id === selectedId);

  const handleOpenPicker = useCallback(() => {
    setPickerVisible(true);
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
      setPickerVisible(false);
    },
    [onSelect],
  );

  const handleAddCategory = useCallback(async () => {
    const trimmed = customName.trim();
    if (!trimmed) return;
    setIsAdding(true);
    try {
      const created = await onAddCategory(trimmed);
      if (created) {
        onSelect(created.id);
      }
      setCustomName('');
      setAddModalVisible(false);
      setPickerVisible(false);
    } finally {
      setIsAdding(false);
    }
  }, [customName, onAddCategory, onSelect]);

  return (
    <View style={styles.wrapper}>
      <TextComp text={label} style={styles.label} />
      <Pressable
        style={[
          styles.field,
          error && touched && styles.fieldError,
        ]}
        onPress={handleOpenPicker}
        accessibilityRole="button"
      >
        <TextComp
          text={selected?.name ?? placeholder}
          style={[styles.fieldText, !selected && styles.placeholder]}
        />
        <MyIcons name="arrowChevron" size={moderateScale(18)} />
      </Pressable>
      {error && touched ? (
        <TextComp
          text={typeof error === 'string' ? error : t('common.required')}
          style={styles.errorText}
        />
      ) : null}

      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setPickerVisible(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />
            <TextComp text={label} style={styles.sheetTitle} />
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
              {categories.map((category) => {
                const isSelected = category.id === selectedId;
                return (
                  <Pressable
                    key={category.id}
                    style={[styles.option, isSelected && { borderColor: accentColor }]}
                    onPress={() => handleSelect(category.id)}
                  >
                    <TextComp text={category.name} style={styles.optionLabel} />
                    {isSelected ? (
                      <View style={[styles.check, { backgroundColor: accentColor }]} />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
            <ButtonComp
              title={t('common.addCustomCategory')}
              onPress={() => setAddModalVisible(true)}
              variant="outline"
              size="m"
              style={styles.addButton}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={addModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <Pressable style={styles.overlayCenter} onPress={() => setAddModalVisible(false)}>
          <Pressable style={styles.addCard} onPress={(e) => e.stopPropagation()}>
            <TextComp text={t('common.customCategoryTitle')} style={styles.addTitle} />
            <TextInputComp
              label={t('common.customCategoryName')}
              placeholder={t('common.customCategoryPlaceholder')}
              value={customName}
              onChangeText={setCustomName}
              autoFocus
            />
            <View style={styles.addActions}>
              <ButtonComp
                title={t('common.cancel')}
                onPress={() => {
                  setCustomName('');
                  setAddModalVisible(false);
                }}
                variant="outline"
                size="m"
                style={styles.addActionBtn}
              />
              <ButtonComp
                title={t('common.save')}
                onPress={handleAddCategory}
                loading={isAdding}
                size="m"
                style={styles.addActionBtn}
                gradientColors={[accentColor, accentColor]}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: moderateScale(16),
  },
  label: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(14),
    color: Colors.text,
    marginBottom: moderateScale(8),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  field: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: moderateScale(12),
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: moderateScale(14),
    height: moderateScale(50),
  },
  fieldError: {
    borderColor: Colors.error,
  },
  fieldText: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(14),
    color: Colors.text,
    flex: 1,
  },
  placeholder: {
    color: Colors.inputPlaceholder,
  },
  errorText: {
    color: Colors.error,
    fontSize: moderateScale(12),
    marginTop: moderateScale(4),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  overlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(28),
    maxHeight: '70%',
  },
  handle: {
    width: moderateScale(48),
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: Colors.gray200,
    alignSelf: 'center',
    marginTop: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  sheetTitle: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(18),
    color: Colors.text,
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  list: {
    maxHeight: moderateScale(280),
    marginBottom: moderateScale(12),
  },
  option: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.gray100,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    marginBottom: moderateScale(8),
  },
  optionLabel: {
    fontFamily: plusJakarta.regular,
    fontSize: moderateScale(15),
    color: Colors.text,
  },
  check: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    marginTop: moderateScale(4),
  },
  addCard: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
  },
  addTitle: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(18),
    color: Colors.text,
    marginBottom: moderateScale(16),
    textAlign: 'center',
  },
  addActions: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    gap: moderateScale(12),
    marginTop: moderateScale(16),
  },
  addActionBtn: {
    flex: 1,
  },
});

export default FinanceCategoryPicker;
