import TextComp from '@/components/TextComp';
import {
    formatCurrency,
    MOCK_SUMMARY,
    ScreenHeader,
    StatSummaryCard,
} from '@/components/rizqShare';
import { plusJakarta } from '@/assets/fonts';
import WrapperContainer from '@/components/WrapperContainer';
import { useAppTheme } from '@/hooks/useAppTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import styles from './styles';

const Analytics: React.FC = () => {
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
                    title="Analytics"
                    subtitle="Your financial overview"
                />

                <View style={localStyles.grid}>
                    <StatSummaryCard
                        colors={colors}
                        label="Total Income"
                        value={formatCurrency(MOCK_SUMMARY.totalIncome)}
                        trend="+12.5% from last month"
                        accentColor={colors.income}
                    />
                    <StatSummaryCard
                        colors={colors}
                        label="Total Expenses"
                        value={formatCurrency(MOCK_SUMMARY.totalExpenses)}
                        trend="+8.2% from last month"
                        trendColor={colors.expense}
                        accentColor={colors.expense}
                    />
                    <StatSummaryCard
                        colors={colors}
                        label="Total Donations"
                        value={formatCurrency(MOCK_SUMMARY.totalDonations)}
                        trend="+15.3% from last month"
                        accentColor={colors.donation}
                    />
                    <StatSummaryCard
                        colors={colors}
                        label="Donation Rate"
                        value={`${MOCK_SUMMARY.donationRate}%`}
                        trend="of total income"
                        accentColor={colors.primary}
                    />
                </View>

                <View style={[localStyles.insight, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <TextComp text="🌟 AI Insight" style={[localStyles.insightTitle, { color: colors.text }]} />
                    <TextComp
                        text="Your donation rate is excellent! You're in the top 20% of generous givers. Keep up the great work!"
                        style={[localStyles.insightBody, { color: colors.textSecondary }]}
                    />
                </View>

                <View style={[localStyles.scoreCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <TextComp text="Giving Score" style={[localStyles.scoreLabel, { color: colors.textSecondary }]} />
                    <TextComp
                        text={`${MOCK_SUMMARY.givingScore}/100`}
                        style={[localStyles.scoreValue, { color: colors.primary }]}
                    />
                    <TextComp text="Excellent! 🌟" style={[localStyles.scoreRating, { color: colors.warning }]} />
                    <View style={[localStyles.streak, { backgroundColor: `${colors.warning}22` }]}>
                        <TextComp
                            text={`🔥 Giving Streak: ${MOCK_SUMMARY.givingStreak} days`}
                            style={[localStyles.streakText, { color: colors.text }]}
                        />
                    </View>
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

const localStyles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(10),
        marginBottom: moderateScale(16),
    },
    insight: {
        borderRadius: moderateScale(16),
        borderWidth: 1,
        padding: moderateScale(16),
        marginBottom: moderateScale(16),
    },
    insightTitle: {
        fontSize: moderateScale(16),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(8),
    },
    insightBody: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
        lineHeight: moderateScale(22),
    },
    scoreCard: {
        borderRadius: moderateScale(16),
        borderWidth: 1,
        padding: moderateScale(20),
        alignItems: 'center',
    },
    scoreLabel: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
        marginBottom: moderateScale(4),
    },
    scoreValue: {
        fontSize: moderateScale(36),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(4),
    },
    scoreRating: {
        fontSize: moderateScale(16),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(14),
    },
    streak: {
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(10),
    },
    streakText: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.bold,
    },
});

export default Analytics;
