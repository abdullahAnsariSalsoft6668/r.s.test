import TextComp from '@/components/TextComp';
import {
    DonationProgressBar,
    HeartFabIcon,
    MOCK_SUMMARY,
    MosqueIcon,
    QURAN_QUOTE,
} from '@/components/rizqShare';
import { plusJakarta } from '@/assets/fonts';
import WrapperContainer from '@/components/WrapperContainer';
import { useAppTheme } from '@/hooks/useAppTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Donate: React.FC = () => {
    const { colors } = useAppTheme();
    const yearlyPercent = Math.round((MOCK_SUMMARY.yearlyDonation / MOCK_SUMMARY.yearlyGoal) * 100);

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
                <TextComp text="Donation Progress" style={[localStyles.title, { color: colors.text }]} />

                <View style={[localStyles.hero, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <MosqueIcon size={moderateScale(140)} color={colors.primaryDark} />
                </View>

                <View style={[localStyles.quote, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <TextComp text={QURAN_QUOTE} style={[localStyles.quoteText, { color: colors.textSecondary }]} />
                </View>

                <DonationProgressBar
                    colors={colors}
                    title="This Month"
                    progress={MOCK_SUMMARY.donationProgress}
                    current={MOCK_SUMMARY.monthlyDonation}
                    goal={MOCK_SUMMARY.yearlyGoal}
                />

                <View style={[localStyles.yearCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <View style={localStyles.yearHeader}>
                        <TextComp text="This Year" style={[localStyles.yearTitle, { color: colors.text }]} />
                        <TextComp
                            text={`${yearlyPercent}% of yearly goal`}
                            style={[localStyles.yearSub, { color: colors.textSecondary }]}
                        />
                    </View>
                    <TextComp
                        text={`₹${MOCK_SUMMARY.yearlyDonation.toLocaleString('en-IN')}`}
                        style={[localStyles.yearAmount, { color: colors.primary }]}
                    />
                    <View style={[localStyles.track, { backgroundColor: colors.progressTrack }]}>
                        <View
                            style={[
                                localStyles.fill,
                                { width: `${yearlyPercent}%`, backgroundColor: colors.primary },
                            ]}
                        />
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={[localStyles.fab, { backgroundColor: colors.primaryDark }]}
                activeOpacity={0.85}
            >
                <HeartFabIcon size={moderateScale(26)} />
            </TouchableOpacity>
        </WrapperContainer>
    );
};

const localStyles = StyleSheet.create({
    title: {
        fontSize: moderateScale(22),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(16),
    },
    hero: {
        borderRadius: moderateScale(20),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(24),
        marginBottom: moderateScale(16),
    },
    quote: {
        borderRadius: moderateScale(16),
        borderWidth: 1,
        padding: moderateScale(16),
        marginBottom: moderateScale(20),
    },
    quoteText: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
        lineHeight: moderateScale(22),
        textAlign: 'center',
        fontStyle: 'italic',
    },
    yearCard: {
        borderRadius: moderateScale(16),
        borderWidth: 1,
        padding: moderateScale(16),
    },
    yearHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(8),
    },
    yearTitle: {
        fontSize: moderateScale(15),
        fontFamily: plusJakarta.bold,
    },
    yearSub: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.regular,
    },
    yearAmount: {
        fontSize: moderateScale(24),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(12),
    },
    track: {
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: moderateScale(5),
    },
    fab: {
        position: 'absolute',
        right: moderateScale(24),
        bottom: moderateScale(100),
        width: moderateScale(56),
        height: moderateScale(56),
        borderRadius: moderateScale(28),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
});

export default Donate;
