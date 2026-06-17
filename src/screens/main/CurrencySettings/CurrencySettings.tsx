import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import type { AppCurrency } from '@/constants/currency';
import { useCurrency } from '@/hooks/useCurrency';
import { Colors } from '@/styles/colors';

import styles from './styles';

const CurrencySettings: React.FC = () => {
  const { t } = useTranslation();
  const { currentCurrency, currencies, changeCurrency } = useCurrency();

  const handleSelect = useCallback(
    (code: AppCurrency) => {
      changeCurrency(code);
    },
    [changeCurrency],
  );

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={t('settings.currencyTitle')}
        leftIcon="arrowChevron"
        iconColor={Colors.text}
        titleStyle={styles.headerTitle}
      />
      <View style={styles.content}>
        <TextComp text={t('settings.currencySubtitle')} style={styles.subtitle} />

        {currencies.map((currency) => {
          const isSelected = currency.code === currentCurrency;

          return (
            <Pressable
              key={currency.code}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleSelect(currency.code)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected ? <View style={styles.radioDot} /> : null}
              </View>
              <View>
                <TextComp text={t(currency.labelKey)} style={styles.optionLabel} />
                <TextComp text={currency.symbol} style={styles.optionSymbol} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </WrapperContainer>
  );
};

export default CurrencySettings;
