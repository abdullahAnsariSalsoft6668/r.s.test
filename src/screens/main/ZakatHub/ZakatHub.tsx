import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routeNames';
import type { MainStackParamList } from '@/navigation/types';
import { Colors } from '@/styles/colors';
import { theme } from '@/styles/theme';

import styles from './styles';

const ZakatHub: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  const openAddDonation = useCallback(() => {
    navigation.navigate(routes.main.addDonation);
  }, [navigation]);

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={t('zakat.title')}
        leftIcon="arrowChevron"
        iconColor={Colors.text}
        titleStyle={styles.headerTitle}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.disclaimerCard}>
          <TextComp text={t('zakat.disclaimer')} style={styles.disclaimerText} />
        </View>

        <View style={styles.infoCard}>
          <TextComp text={t('zakat.whatIsZakat')} style={styles.cardTitle} />
          <TextComp text={t('zakat.whatIsZakatBody')} style={styles.cardBody} />
        </View>

        <View style={styles.infoCard}>
          <TextComp text={t('zakat.whatIsSadaqah')} style={styles.cardTitle} />
          <TextComp text={t('zakat.whatIsSadaqahBody')} style={styles.cardBody} />
        </View>

        <View style={styles.infoCard}>
          <TextComp text={t('zakat.monthlyGoalNote')} style={styles.cardTitle} />
          <TextComp text={t('zakat.monthlyGoalBody')} style={styles.cardBody} />
        </View>

        <TextComp text={t('zakat.manualLogTitle')} style={styles.sectionTitle} />

        <ButtonComp
          title={t('zakat.logZakat')}
          onPress={openAddDonation}
          size="l"
          style={styles.actionButton}
          gradientColors={[theme.colors.brand.success, '#1B7A45']}
        />
        <ButtonComp
          title={t('zakat.logSadaqah')}
          onPress={openAddDonation}
          variant="outline"
          size="l"
          style={styles.actionButton}
        />
      </ScrollView>
    </WrapperContainer>
  );
};

export default ZakatHub;
