import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { useGetDonationsQuery } from '@/api/donationApiSlice';
import { useGetDashboardSummaryQuery } from '@/api/dashboardApiSlice';
import { useGetRecipientsQuery } from '@/api/recipientApiSlice';
import { TabBodySheet, TabScreenHeader } from '@/components/grocery';
import ButtonComp from '@/components/ButtonComp';
import {
  DonationProgressBar,
  EmptyState,
  FadeInView,
  ScalePressable,
  SectionHeader,
  TransactionRowActions,
} from '@/components/rizqShare';
import MyIcons from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routeNames';
import type { MainStackParamList } from '@/navigation/types';
import { tabScreenStyles } from '@/styles/tabScreenStyles';
import { useAppTheme } from '@/context/ThemeContext';
import { useTabScreenStyles } from '@/hooks/useTabScreenStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import {
  donationProgressRatio,
  formatCurrency,
  yearlyDonationProgress,
} from '@/utils/donationCalculations';

import { moderateScale } from '@/styles/scaling';

import { createDonateStyles } from './styles';

const Donate: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { theme } = useAppTheme();
  const tabScreenStyles = useTabScreenStyles();
  const styles = useThemedStyles(createDonateStyles);
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummaryQuery();
  const { data: donations = [], isLoading: donationsLoading } = useGetDonationsQuery();
  const { data: recipients = [] } = useGetRecipientsQuery();

  const recipientMap = useMemo(
    () => Object.fromEntries(recipients.map((r) => [r.id, r.name])),
    [recipients],
  );

  const yearTotal = useMemo(() => yearlyDonationProgress(donations), [donations]);

  const progressRatio = useMemo(
    () =>
      summary
        ? donationProgressRatio(summary.donationTarget, summary.donationProgress)
        : 0,
    [summary],
  );

  const openAddDonation = useCallback(() => {
    navigation.navigate(routes.main.addDonation);
  }, [navigation]);

  const openRecipients = useCallback(() => {
    navigation.navigate(routes.main.recipientsList);
  }, [navigation]);

  const openEditDonation = useCallback(
    (donationId: string) => {
      navigation.navigate(routes.main.addDonation, { donationId });
    },
    [navigation],
  );

  const isLoading = summaryLoading || donationsLoading;

  return (
    <WrapperContainer
      style={tabScreenStyles.screen}
      edges={[]}
      innerBackgroundColor={theme.colors.background.secondary}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.header} />
      <TabScreenHeader
        title={t('tabs.donate')}
        subtitle={t('donation.hubSubtitle')}
        rightActionVariant="button"
        rightAction={
          <ScalePressable style={styles.recipientsBtn} onPress={openRecipients}>
            <MyIcons name="rizqIconUsersWhite" size={moderateScale(16)} />
            <TextComp text={t('donation.manageRecipients')} style={styles.recipientsBtnText} />
          </ScalePressable>
        }
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TabBodySheet>
          {isLoading || !summary ? (
            <ActivityIndicator color={theme.colors.brand.primary} style={styles.loader} />
          ) : (
            <>
              <FadeInView index={0}>
                <View style={styles.progressCard}>
                  <View style={styles.progressHeader}>
                    <TextComp text={t('donation.thisMonth')} style={styles.cardLabel} />
                    <View style={styles.percentBadge}>
                      <TextComp
                        text={`${Math.round(progressRatio * 100)}%`}
                        style={styles.percentBadgeText}
                      />
                    </View>
                  </View>
                  <DonationProgressBar progress={progressRatio} />
                  <TextComp
                    text={t('dashboard.donationProgress', {
                      current: formatCurrency(summary.donationProgress, summary.currency),
                      target: formatCurrency(summary.donationTarget, summary.currency),
                    })}
                    style={styles.progressDetail}
                  />
                  {summary.remaining > 0 ? (
                    <View style={styles.remainingBanner}>
                      <TextComp
                        text={t('donation.remaining', {
                          amount: formatCurrency(summary.remaining, summary.currency),
                        })}
                        style={styles.remainingText}
                      />
                    </View>
                  ) : (
                    <TextComp text={t('dashboard.goalMet')} style={styles.goalMet} />
                  )}
                </View>
              </FadeInView>

              <FadeInView index={1}>
                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <TextComp text={t('donation.givenThisMonth')} style={styles.statLabel} />
                    <TextComp
                      text={formatCurrency(summary.donationProgress, summary.currency)}
                      style={styles.statValue}
                    />
                  </View>
                  <View style={styles.statCard}>
                    <TextComp text={t('donation.givenThisYear')} style={styles.statLabel} />
                    <TextComp
                      text={formatCurrency(yearTotal, summary.currency)}
                      style={styles.statValue}
                    />
                  </View>
                </View>
              </FadeInView>

              <FadeInView index={2}>
                <LinearGradient
                  colors={[...theme.gradients.cardAccent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quoteCard}
                >
                  <TextComp text="❝" style={styles.quoteMark} />
                  <TextComp text={t('donation.quranQuote')} style={styles.quoteText} />
                  <TextComp text={t('donation.quranRef')} style={styles.quoteRef} />
                </LinearGradient>
              </FadeInView>

              <FadeInView index={3}>
                <SectionHeader
                  title={t('donation.recentTitle')}
                  subtitle={t('donation.recentSubtitle')}
                />
              </FadeInView>

              {donations.length === 0 ? (
                <FadeInView index={4}>
                  <EmptyState
                    title={t('donation.empty')}
                    action={
                      <ButtonComp
                        title={t('donation.recordSadqa')}
                        onPress={openAddDonation}
                        gradientColors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
                      />
                    }
                  />
                </FadeInView>
              ) : (
                donations.slice(0, 5).map((donation, index) => (
                  <FadeInView key={donation.id} index={4 + index}>
                    <View style={styles.donationRow}>
                      <View style={styles.donationIcon}>
                        <TextComp text="♡" style={styles.donationIconText} />
                      </View>
                      <View style={styles.donationInfo}>
                        <TextComp
                          text={recipientMap[donation.recipientId] ?? t('donation.sadqa')}
                          style={styles.donationName}
                        />
                        <TextComp text={donation.date} style={styles.donationDate} />
                      </View>
                      <TextComp
                        text={formatCurrency(donation.amount, donation.currency)}
                        style={styles.donationAmount}
                      />
                      <TransactionRowActions
                        editLabel={t('common.edit')}
                        onEdit={() => openEditDonation(donation.id)}
                      />
                    </View>
                  </FadeInView>
                ))
              )}
            </>
          )}
        </TabBodySheet>
      </ScrollView>

      <ScalePressable style={styles.fab} onPress={openAddDonation}>
        <LinearGradient
          colors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <MyIcons name="rizqTabHeartFab" size={moderateScale(18)} />
          <TextComp text={t('donation.recordSadqa')} style={styles.fabLabel} />
        </LinearGradient>
      </ScalePressable>
    </WrapperContainer>
  );
};

export default Donate;
