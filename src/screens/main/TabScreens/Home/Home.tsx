import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StatusBar, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

import {
  useGetDashboardSummaryQuery,
  useGetTransactionsQuery,
  useGetUserNameQuery,
} from '@/api/dashboardApiSlice';
import { TabBodySheet, TabScreenHeader } from '@/components/grocery';
import ButtonComp from '@/components/ButtonComp';
import {
  ActionCard,
  BalanceCard,
  DonationProgressBar,
  EmptyState,
  FadeInView,
  HelpBanner,
  SectionHeader,
  TransactionItem,
} from '@/components/rizqShare';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routeNames';
import type { UnifiedTransaction } from '@/models/finance.types';
import type { MainStackParamList } from '@/navigation/types';
import { useAppTheme } from '@/context/ThemeContext';
import { useTabScreenStyles } from '@/hooks/useTabScreenStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import {
  donationProgressRatio,
  formatCurrency,
} from '@/utils/donationCalculations';

import { createHomeStyles } from './styles';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { theme } = useAppTheme();
  const tabScreenStyles = useTabScreenStyles();
  const styles = useThemedStyles(createHomeStyles);
  const { data: summary, isLoading } = useGetDashboardSummaryQuery();
  const { data: userName } = useGetUserNameQuery();
  const { data: transactions = [] } = useGetTransactionsQuery();

  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions]);

  const progressRatio = useMemo(
    () =>
      summary
        ? donationProgressRatio(summary.donationTarget, summary.donationProgress)
        : 0,
    [summary],
  );

  const openAddIncome = useCallback(() => {
    navigation.navigate(routes.main.addIncome);
  }, [navigation]);

  const openAddExpense = useCallback(() => {
    navigation.navigate(routes.main.addExpense);
  }, [navigation]);

  const openAddDonation = useCallback(() => {
    navigation.navigate(routes.main.addDonation);
  }, [navigation]);

  const openTransactions = useCallback(() => {
    navigation.navigate(routes.tab.transactions as never);
  }, [navigation]);

  const handleEditTransaction = useCallback(
    (transaction: UnifiedTransaction) => {
      if (transaction.type === 'income') {
        navigation.navigate(routes.main.addIncome, { incomeId: transaction.id });
      }
    },
    [navigation],
  );

  return (
    <WrapperContainer
      style={tabScreenStyles.screen}
      edges={[]}
      innerBackgroundColor={theme.colors.background.secondary}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.header} />
      <TabScreenHeader
        title={t('dashboard.greeting', { name: userName ?? t('common.appName') })}
        subtitle={t('dashboard.subtitle')}
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
                <BalanceCard
                  balance={summary.balance}
                  monthlyIncome={summary.monthlyIncome}
                  monthlyExpenses={summary.monthlyExpenses}
                  savings={summary.savings}
                  currency={summary.currency}
                  balanceLabel={t('dashboard.balance')}
                  incomeLabel={t('dashboard.monthlyIncome')}
                  expensesLabel={t('dashboard.monthlyExpenses')}
                  savingsLabel={t('dashboard.savings')}
                />
              </FadeInView>

              <FadeInView index={1}>
                <View style={styles.progressCard}>
                  <View style={styles.progressHeader}>
                    <TextComp text={t('donation.sadqa')} style={styles.progressTitle} />
                    <View style={styles.percentBadge}>
                      <TextComp
                        text={`${Math.round(progressRatio * 100)}%`}
                        style={styles.progressPercent}
                      />
                    </View>
                  </View>
                  <DonationProgressBar progress={progressRatio} />
                  <TextComp
                    text={t('dashboard.donationProgress', {
                      current: formatCurrency(summary.donationProgress, summary.currency),
                      target: formatCurrency(summary.donationTarget, summary.currency),
                    })}
                    style={styles.progressSubtext}
                  />
                  {summary.remaining > 0 ? (
                    <View style={styles.remainingBanner}>
                      <TextComp
                        text={t('dashboard.remaining', {
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

              <FadeInView index={2}>
                <SectionHeader
                  title={t('home.whatToDoTitle')}
                  subtitle={t('home.whatToDoSubtitle')}
                />
                <View style={styles.actionsRow}>
                  <ActionCard
                    title={t('income.addIncome')}
                    subtitle={t('home.actionIncomeHint')}
                    icon="dashboard"
                    variant="income"
                    onPress={openAddIncome}
                  />
                  <ActionCard
                    title={t('expense.addExpense')}
                    subtitle={t('home.actionExpenseHint')}
                    icon="transaction"
                    variant="expense"
                    onPress={openAddExpense}
                  />
                  <ActionCard
                    title={t('donation.giveSadqa')}
                    subtitle={t('home.actionDonateHint')}
                    icon="rizqTabHeart"
                    variant="donate"
                    onPress={openAddDonation}
                  />
                </View>
              </FadeInView>

              <FadeInView index={3}>
                <View style={styles.recentHeader}>
                  <SectionHeader title={t('home.recentActivityTitle')} />
                  <Pressable onPress={openTransactions} style={styles.viewAllBtn}>
                    <TextComp text={t('dashboard.viewAll')} style={styles.viewAll} />
                  </Pressable>
                </View>

                {recentTransactions.length === 0 ? (
                  <EmptyState
                    title={t('home.emptyRecentTitle')}
                    subtitle={t('home.emptyRecentSubtitle')}
                    action={
                      <ButtonComp
                        title={t('home.addFirstIncome')}
                        onPress={openAddIncome}
                        size="m"
                        gradientColors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
                      />
                    }
                  />
                ) : (
                  <>
                    <HelpBanner message={t('home.editIncomeHint')} />
                    {recentTransactions.map((tx, index) => (
                      <FadeInView key={`${tx.type}-${tx.id}`} index={4 + index}>
                        <TransactionItem
                          transaction={tx}
                          currency={summary.currency}
                          onEdit={tx.type === 'income' ? handleEditTransaction : undefined}
                          editLabel={tx.type === 'income' ? t('common.edit') : undefined}
                        />
                      </FadeInView>
                    ))}
                  </>
                )}
              </FadeInView>
            </>
          )}
        </TabBodySheet>
      </ScrollView>
    </WrapperContainer>
  );
};

export default Home;
