import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useLanguage } from '@/hooks/useLanguage';
import type { LanguageInterface } from '@/redux/reducers/settings';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';

import styles from './styles';

const LANGUAGE_LABEL_KEYS: Record<string, string> = {
  en: 'settings.english',
  ur: 'settings.urdu',
  'ur-roman': 'settings.romanUrdu',
};

const LanguageSettings: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, languages, changeLanguage } = useLanguage();

  const handleSelect = useCallback(
    (language: LanguageInterface) => {
      changeLanguage(language);
    },
    [changeLanguage],
  );

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={t('settings.languageTitle')}
        leftIcon="arrowChevron"
        iconColor={Colors.text}
        titleStyle={styles.headerTitle}
      />
      <View style={styles.content}>
        <TextComp text={t('settings.languageSubtitle')} style={styles.subtitle} />
        <TextComp text={t('settings.rtlNote')} style={styles.rtlNote} />

        {languages.map((language) => {
          const isSelected = language.sortName === currentLanguage.sortName;
          const labelKey = LANGUAGE_LABEL_KEYS[language.sortName];

          return (
            <Pressable
              key={language.sortName}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleSelect(language)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected ? <View style={styles.radioDot} /> : null}
              </View>
              <TextComp
                text={labelKey ? t(labelKey) : language.name}
                style={styles.optionLabel}
              />
            </Pressable>
          );
        })}
      </View>
    </WrapperContainer>
  );
};

export default LanguageSettings;
