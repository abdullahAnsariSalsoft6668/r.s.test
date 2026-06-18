import React, { useMemo } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useGetAnalyticsQuery } from '@/api/analyticsApiSlice';
import { TabBodySheet, TabScreenHeader } from '@/components/grocery';
import { AnalyticsShimmer } from '@/components/shimmer';
import { EmptyState, FadeInView } from '@/components/rizqShare';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useAppTheme } from '@/context/ThemeContext';
import { useTabScreenStyles } from '@/hooks/useTabScreenStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { formatCurrency } from '@/utils/donationCalculations';

import { createAnalyticsStyles } from './styles';

const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const tabScreenStyles = useTabScreenStyles();
  const styles = useThemedStyles(createAnalyticsStyles);
  const { data: analytics, isLoading } = useGetAnalyticsQuery();

  const savingsRate = useMemo(() => {
    if (!analytics?.currentMonth) return 0;
    const { monthlyIncome, savings } = analytics.currentMonth;
    if (monthlyIncome <= 0) return 0;
    return Math.round((savings / monthlyIncome) * 100);
  }, [analytics]);

  const maxTrendValue = useMemo(() => {
    if (!analytics?.trends.length) return 1;
    return Math.max(
      ...analytics.trends.flatMap((trend) => [trend.income, trend.expenses, trend.donations]),
      1,
    );
  }, [analytics]);

  const hasData = analytics && analytics.currentMonth.monthlyIncome > 0;

  return (
    <WrapperContainer
      style={tabScreenStyles.screen}
      edges={[]}
      innerBackgroundColor={theme.colors.background.secondary}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.header} />
      <TabScreenHeader title={t('tabs.analytics')} subtitle={t('analytics.subtitle')} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TabBodySheet>
          {isLoading ? (
            <AnalyticsShimmer />
          ) : !hasData ? (
            <EmptyState title={t('analytics.empty')} subtitle={t('analytics.emptyHint')} />
          ) : (
            <>
              <FadeInView index={0}>
                <View style={styles.scoreRow}>
                  <View style={styles.scoreCard}>
                    <TextComp text={t('analytics.givingScore')} style={styles.scoreLabel} />
                    <TextComp text={`${analytics.givingScore}/100`} style={styles.scoreValue} />
                  </View>
                  <View style={styles.scoreCard}>
                    <TextComp text={t('analytics.savingsRate')} style={styles.scoreLabel} />
                    <TextComp text={`${savingsRate}%`} style={styles.scoreValue} />
                  </View>
                  <View style={styles.scoreCard}>
                    <TextComp text={t('analytics.givingStreak')} style={styles.scoreLabel} />
                    <TextComp
                      text={t('analytics.streakDays', { count: analytics.givingStreak })}
                      style={styles.scoreValue}
                    />
                  </View>
                </View>
              </FadeInView>

              <FadeInView index={1}>
                <View style={styles.compareCard}>
                  <TextComp text={t('analytics.monthComparison')} style={styles.sectionTitle} />
                  <View style={styles.compareRow}>
                    <View style={styles.compareCol}>
                      <TextComp text={t('analytics.thisMonth')} style={styles.compareLabel} />
                      <TextComp
                        text={formatCurrency(analytics.currentMonth.monthlyIncome)}
                        style={styles.compareIncome}
                      />
                      <TextComp
                        text={formatCurrency(analytics.currentMonth.monthlyDonations)}
                        style={styles.compareDonation}
                      />
                    </View>
                    <View style={styles.compareCol}>
                      <TextComp text={t('analytics.lastMonth')} style={styles.compareLabel} />
                      <TextComp
                        text={formatCurrency(analytics.previousMonth.monthlyIncome)}
                        style={styles.compareIncome}
                      />
                      <TextComp
                        text={formatCurrency(analytics.previousMonth.monthlyDonations)}
                        style={styles.compareDonation}
                      />
                    </View>
                  </View>
                </View>
              </FadeInView>

              <FadeInView index={2}>
                <TextComp text={t('analytics.trendsTitle')} style={styles.sectionTitle} />
              </FadeInView>

              {analytics.trends.map((trend, index) => (
                <FadeInView key={trend.month} index={3 + index}>
                  <View style={styles.trendRow}>
                    <TextComp text={trend.month} style={styles.trendMonth} />
                    <View style={styles.trendBars}>
                      <View
                        style={[
                          styles.trendBar,
                          styles.incomeBar,
                          { width: `${(trend.income / maxTrendValue) * 100}%` },
                        ]}
                      />
                      <View
                        style={[
                          styles.trendBar,
                          styles.expenseBar,
                          { width: `${(trend.expenses / maxTrendValue) * 100}%` },
                        ]}
                      />
                      <View
                        style={[
                          styles.trendBar,
                          styles.donationBar,
                          { width: `${(trend.donations / maxTrendValue) * 100}%` },
                        ]}
                      />
                    </View>
                  </View>
                </FadeInView>
              ))}

              <FadeInView index={8}>
                <View style={styles.insightCard}>
                  <TextComp text={t('analytics.aiInsightTitle')} style={styles.insightTitle} />
                  <TextComp
                    text={t(`analytics.${analytics.aiInsight}`)}
                    style={styles.insightBody}
                  />
                </View>
              </FadeInView>
            </>
          )}
        </TabBodySheet>
      </ScrollView>
    </WrapperContainer>
  );
};

export default Analytics;
