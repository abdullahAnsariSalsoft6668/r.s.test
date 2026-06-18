import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import {
  useGetGivingSettingsQuery,
  useUpdateGivingSettingsMutation,
} from '@/api/settingsApiSlice';
import { useGetIncomesQuery } from '@/api/incomeApiSlice';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import { GivingSettingsShimmer } from '@/components/shimmer';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useNavigation } from '@react-navigation/native';
import { useCurrency } from '@/hooks/useCurrency';
import { donationTarget, formatCurrency, monthlyIncome } from '@/utils/donationCalculations';
import { Colors } from '@/styles/colors';

import styles from './styles';

const MIN_PERCENT = 1;
const MAX_PERCENT = 30;

const GivingSettings: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data: settings, isLoading } = useGetGivingSettingsQuery();
  const { data: incomes = [] } = useGetIncomesQuery();
  const { currentCurrency } = useCurrency();
  const [updateSettings, { isLoading: isSaving }] = useUpdateGivingSettingsMutation();
  const [localPercent, setLocalPercent] = useState<number | null>(null);

  const donationPercent = localPercent ?? settings?.donationPercent ?? 10;

  const monthlyIncomeTotal = useMemo(() => monthlyIncome(incomes), [incomes]);

  const previewTarget = useMemo(
    () => donationTarget(monthlyIncomeTotal, donationPercent),
    [monthlyIncomeTotal, donationPercent],
  );

  const handleDecrease = useCallback(() => {
    setLocalPercent((current) => {
      const value = current ?? settings?.donationPercent ?? 10;
      return Math.max(MIN_PERCENT, value - 1);
    });
  }, [settings?.donationPercent]);

  const handleIncrease = useCallback(() => {
    setLocalPercent((current) => {
      const value = current ?? settings?.donationPercent ?? 10;
      return Math.min(MAX_PERCENT, value + 1);
    });
  }, [settings?.donationPercent]);

  const handleSave = useCallback(async () => {
    try {
      await updateSettings({
        donationPercent,
        calculationBasis: 'all_income',
      }).unwrap();
      setLocalPercent(null);
      Toast.show({
        type: 'success',
        text1: t('settings.savedSuccess'),
      });
      navigation.goBack();
    } catch {
      Toast.show({
        type: 'error',
        text1: t('common.errorGeneric'),
      });
    }
  }, [donationPercent, navigation, t, updateSettings]);

  const sliderFillPercent = ((donationPercent - MIN_PERCENT) / (MAX_PERCENT - MIN_PERCENT)) * 100;

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={t('settings.givingSettingsTitle')}
        leftIcon="arrowChevron"
        iconColor={Colors.text}
        titleStyle={styles.headerTitle}
      />
      <View style={styles.content}>
        {isLoading ? (
          <GivingSettingsShimmer />
        ) : (
          <>
        <TextComp text={t('settings.givingSettingsSubtitle')} style={styles.subtitle} />

        <View style={styles.card}>
          <View style={styles.percentRow}>
            <TextComp text={t('settings.donationPercentLabel')} style={styles.percentLabel} />
            <TextComp text={`${donationPercent}%`} style={styles.percentValue} />
          </View>

          <View style={styles.sliderTrack}>
            <View style={[styles.sliderFill, { width: `${sliderFillPercent}%` }]} />
          </View>
          <View style={styles.rangeLabels}>
            <TextComp text={`${MIN_PERCENT}%`} style={styles.rangeLabel} />
            <TextComp text={`${MAX_PERCENT}%`} style={styles.rangeLabel} />
          </View>

          <View style={styles.stepper}>
            <Pressable
              style={[styles.stepButton, donationPercent <= MIN_PERCENT && styles.stepButtonDisabled]}
              onPress={handleDecrease}
              disabled={donationPercent <= MIN_PERCENT}
              accessibilityRole="button"
              accessibilityLabel={t('settings.decreasePercent')}
            >
              <TextComp text="−" style={styles.stepButtonText} />
            </Pressable>
            <Pressable
              style={[styles.stepButton, donationPercent >= MAX_PERCENT && styles.stepButtonDisabled]}
              onPress={handleIncrease}
              disabled={donationPercent >= MAX_PERCENT}
              accessibilityRole="button"
              accessibilityLabel={t('settings.increasePercent')}
            >
              <TextComp text="+" style={styles.stepButtonText} />
            </Pressable>
          </View>

          <TextComp text={t('settings.calculationBasisLabel')} style={styles.basisLabel} />
          <TextComp text={t('settings.calculationBasisAllIncome')} style={styles.basisValue} />
        </View>

        <View style={styles.previewCard}>
          <TextComp text={t('settings.previewTitle')} style={styles.previewTitle} />
          <TextComp
            text={t('settings.previewTarget', {
              income: formatCurrency(monthlyIncomeTotal, currentCurrency),
              percent: donationPercent,
              target: formatCurrency(previewTarget, currentCurrency),
            })}
            style={styles.previewText}
          />
        </View>

        <ButtonComp
          title={t('common.save')}
          onPress={handleSave}
          loading={isSaving}
          disabled={isSaving}
          style={styles.saveButton}
        />
          </>
        )}
      </View>
    </WrapperContainer>
  );
};

export default GivingSettings;
