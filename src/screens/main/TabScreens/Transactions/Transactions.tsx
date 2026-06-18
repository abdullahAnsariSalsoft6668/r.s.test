import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StatusBar,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useGetDashboardSummaryQuery, useGetTransactionsQuery } from '@/api/dashboardApiSlice';
import { TabBodySheet, TabScreenHeader } from '@/components/grocery';
import { TransactionListShimmer } from '@/components/shimmer';
import ButtonComp from '@/components/ButtonComp';
import {
  EmptyState,
  FadeInView,
  FloatingActionBar,
  HelpBanner,
  ScalePressable,
  SectionHeader,
  TransactionItem,
} from '@/components/rizqShare';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routeNames';
import type { MainStackParamList } from '@/navigation/types';
import type { TransactionType, UnifiedTransaction } from '@/models/finance.types';
import { useAppTheme } from '@/context/ThemeContext';
import { useTabScreenStyles } from '@/hooks/useTabScreenStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';

import { createTransactionsStyles } from './styles';
import { moderateScale } from '@/styles/scaling';

type FilterKey = 'all' | TransactionType;

const FILTERS: { key: FilterKey; labelKey: string }[] = [
  { key: 'all', labelKey: 'transactions.filterAll' },
  { key: 'income', labelKey: 'transactions.filterIncome' },
  { key: 'expense', labelKey: 'transactions.filterExpense' },
  { key: 'donation', labelKey: 'transactions.filterDonation' },
];

const Transactions: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { theme } = useAppTheme();
  const tabScreenStyles = useTabScreenStyles();
  const styles = useThemedStyles(createTransactionsStyles);
  const tabBarHeight = useBottomTabBarHeight();
  const listBottomPadding = tabBarHeight + moderateScale(112);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetTransactionsQuery();
  const { data: summary } = useGetDashboardSummaryQuery();

  const errorMessage =
    error && typeof error === 'object' && 'error' in error
      ? String((error as { error?: string }).error ?? '')
      : t('transactions.loadError');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return transactions;
    return transactions.filter((tx) => tx.type === activeFilter);
  }, [transactions, activeFilter]);

  const openAddIncome = useCallback(() => {
    navigation.navigate(routes.main.addIncome);
  }, [navigation]);

  const openAddExpense = useCallback(() => {
    navigation.navigate(routes.main.addExpense);
  }, [navigation]);

  const openAddDonation = useCallback(() => {
    navigation.navigate(routes.main.addDonation);
  }, [navigation]);

  const handleEditTransaction = useCallback(
    (transaction: UnifiedTransaction) => {
      if (transaction.type === 'income') {
        navigation.navigate(routes.main.addIncome, { incomeId: transaction.id });
      } else if (transaction.type === 'expense') {
        navigation.navigate(routes.main.addExpense, { expenseId: transaction.id });
      } else if (transaction.type === 'donation') {
        navigation.navigate(routes.main.addDonation, { donationId: transaction.id });
      }
    },
    [navigation],
  );

  const emptyAction = useMemo(() => {
    if (activeFilter === 'expense') {
      return (
        <ButtonComp
          title={t('expense.addExpense')}
          onPress={openAddExpense}
          size="m"
          gradientColors={[theme.colors.status.error, theme.colors.status.error]}
        />
      );
    }
    if (activeFilter === 'donation') {
      return (
        <ButtonComp
          title={t('donation.giveSadqa')}
          onPress={openAddDonation}
          size="m"
          gradientColors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
        />
      );
    }
    if (activeFilter === 'income') {
      return (
        <ButtonComp
          title={t('income.addIncome')}
          onPress={openAddIncome}
          size="m"
          gradientColors={[theme.colors.brand.success, theme.colors.brand.success]}
        />
      );
    }
    return (
      <View style={styles.emptyActions}>
        <ButtonComp
          title={t('income.addIncome')}
          onPress={openAddIncome}
          size="m"
          style={styles.emptyBtn}
          gradientColors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
        />
        <ButtonComp
          title={t('donation.giveSadqa')}
          onPress={openAddDonation}
          variant="outline"
          size="m"
          style={styles.emptyBtn}
        />
      </View>
    );
  }, [activeFilter, openAddDonation, openAddExpense, openAddIncome, t]);

  const renderItem = useCallback(
    ({ item, index }: { item: (typeof transactions)[number]; index: number }) => (
      <FadeInView index={index % 8}>
        <TransactionItem
          transaction={item}
          currency={summary?.currency}
          onEdit={handleEditTransaction}
          editLabel={t('common.edit')}
        />
      </FadeInView>
    ),
    [handleEditTransaction, summary?.currency, t],
  );

  return (
    <WrapperContainer
      style={tabScreenStyles.screen}
      edges={[]}
      innerBackgroundColor={theme.colors.background.secondary}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.header} />
      <TabScreenHeader title={t('tabs.transactions')} subtitle={t('transactions.subtitle')} />
      <View style={styles.content}>
        <TabBodySheet style={styles.bodySheet}>
        <FadeInView index={0}>
          <SectionHeader
            title={t('transactions.title')}
            subtitle={t('transactions.editHint')}
          />
          <View style={styles.filtersRow}>
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.key;
              return (
                <ScalePressable
                  key={filter.key}
                  style={[styles.filterPill, active && styles.filterPillActive]}
                  onPress={() => setActiveFilter(filter.key)}
                >
                  <TextComp
                    text={t(filter.labelKey)}
                    style={[styles.filterText, active && styles.filterTextActive]}
                  />
                </ScalePressable>
              );
            })}
          </View>
        </FadeInView>

        {isLoading ? (
          <TransactionListShimmer showFilters={false} />
        ) : isError ? (
          <EmptyState
            title={t('transactions.loadError')}
            subtitle={errorMessage || t('transactions.loadErrorHint')}
            action={
              <ButtonComp
                title={t('common.retry')}
                onPress={() => refetch()}
                loading={isFetching}
                size="m"
                gradientColors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
              />
            }
          />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.listContent, { paddingBottom: listBottomPadding }]}
            ListHeaderComponent={
              filtered.length > 0 ? <HelpBanner message={t('transactions.editHint')} /> : null
            }
            ListEmptyComponent={
              <EmptyState
                title={t('transactions.empty')}
                subtitle={t('transactions.emptyHint')}
                action={emptyAction}
              />
            }
          />
        )}
        </TabBodySheet>

        <FloatingActionBar
          title={t('transactions.addActionsTitle')}
          actions={[
            { label: t('income.addIncome'), onPress: openAddIncome, variant: 'income' },
            { label: t('expense.addExpense'), onPress: openAddExpense, variant: 'expense' },
            { label: t('donation.giveSadqa'), onPress: openAddDonation, variant: 'donate' },
          ]}
        />
      </View>
    </WrapperContainer>
  );
};

export default Transactions;
