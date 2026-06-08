import {
    BalanceCard,
    DonationProgressBar,
    DonateIcon,
    ExpenseIcon,
    IncomeIcon,
    MOCK_SUMMARY,
    MOCK_USER,
    QuickActionButton,
    ReceiptIcon,
    ScreenHeader,
} from '@/components/rizqShare';
import WrapperContainer from '@/components/WrapperContainer';
import { useAppTheme } from '@/hooks/useAppTheme';
import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import styles from './styles';

const Home: React.FC = () => {
    const { colors } = useAppTheme();

    return (
        <WrapperContainer
            style={styles.container}
            edges={['top']}
            innerBackgroundColor={colors.background}
        >
            <StatusBar barStyle={colors.statusBar} backgroundColor={colors.background} />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <ScreenHeader
                    colors={colors}
                    showLogo
                    subtitle={`Assalamu Alaikum, ${MOCK_USER.firstName}! 👋`}
                />

                <BalanceCard
                    colors={colors}
                    balance={MOCK_SUMMARY.totalBalance}
                    income={MOCK_SUMMARY.totalIncome}
                    expenses={MOCK_SUMMARY.totalExpenses}
                />

                <DonationProgressBar
                    colors={colors}
                    progress={MOCK_SUMMARY.donationProgress}
                    current={MOCK_SUMMARY.monthlyDonation}
                    goal={MOCK_SUMMARY.yearlyGoal}
                />

                <View style={styles.quickActions}>
                    <QuickActionButton
                        colors={colors}
                        label="Add Income"
                        accentColor={colors.income}
                        icon={<IncomeIcon color={colors.income} />}
                    />
                    <QuickActionButton
                        colors={colors}
                        label="Add Expense"
                        accentColor={colors.expense}
                        icon={<ExpenseIcon color={colors.expense} />}
                    />
                    <QuickActionButton
                        colors={colors}
                        label="Donate"
                        accentColor={colors.donation}
                        icon={<DonateIcon color={colors.donation} />}
                    />
                    <QuickActionButton
                        colors={colors}
                        label="Upload Receipt"
                        accentColor={colors.primary}
                        icon={<ReceiptIcon color={colors.primaryDark} />}
                    />
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

export default Home;
