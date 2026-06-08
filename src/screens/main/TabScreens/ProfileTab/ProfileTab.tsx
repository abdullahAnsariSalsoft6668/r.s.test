import TextComp from '@/components/TextComp';
import { MOCK_USER } from '@/components/rizqShare';
import { RizqLeafIcon } from '@/components/rizqShare/RizqIcons';
import { plusJakarta } from '@/assets/fonts';
import WrapperContainer from '@/components/WrapperContainer';
import { useAppTheme } from '@/hooks/useAppTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const ProfileTab: React.FC = () => {
    const { colors, isDark, toggleTheme } = useAppTheme();

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
                <View style={[localStyles.profileCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <View style={[localStyles.avatar, { backgroundColor: `${colors.primary}22` }]}>
                        <RizqLeafIcon size={moderateScale(36)} color={colors.primaryDark} />
                    </View>
                    <TextComp text={MOCK_USER.fullName} style={[localStyles.name, { color: colors.text }]} />
                    <TextComp text={MOCK_USER.email} style={[localStyles.email, { color: colors.textSecondary }]} />
                </View>

                <TextComp text="Settings" style={[localStyles.section, { color: colors.textMuted }]} />

                <View style={[localStyles.menuCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    <View style={localStyles.menuRow}>
                        <TextComp text="Dark Mode" style={[localStyles.menuLabel, { color: colors.text }]} />
                        <Switch
                            value={isDark}
                            onValueChange={toggleTheme}
                            trackColor={{ false: colors.progressTrack, true: colors.primary }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                </View>

                <View style={[localStyles.menuCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
                    {['Income', 'Expenses', 'Donations', 'Goals', 'Receipts', 'AI Insights'].map(item => (
                        <TouchableOpacity key={item} style={localStyles.menuItem} activeOpacity={0.7}>
                            <TextComp text={item} style={[localStyles.menuLabel, { color: colors.text }]} />
                            <TextComp text="›" style={[localStyles.chevron, { color: colors.textMuted }]} />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={localStyles.footer}>
                    <TextComp text="RizqShare" style={[localStyles.brand, { color: colors.primary }]} />
                    <TextComp
                        text="Share your Rizq, earn infinite reward."
                        style={[localStyles.tagline, { color: colors.textMuted }]}
                    />
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

const localStyles = StyleSheet.create({
    profileCard: {
        borderRadius: moderateScale(20),
        borderWidth: 1,
        alignItems: 'center',
        padding: moderateScale(24),
        marginBottom: moderateScale(24),
    },
    avatar: {
        width: moderateScale(72),
        height: moderateScale(72),
        borderRadius: moderateScale(36),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(12),
    },
    name: {
        fontSize: moderateScale(20),
        fontFamily: plusJakarta.bold,
        marginBottom: moderateScale(4),
    },
    email: {
        fontSize: moderateScale(14),
        fontFamily: plusJakarta.regular,
    },
    section: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.bold,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: moderateScale(10),
    },
    menuCard: {
        borderRadius: moderateScale(16),
        borderWidth: 1,
        marginBottom: moderateScale(16),
        overflow: 'hidden',
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(16),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: moderateScale(16),
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(128,128,128,0.2)',
    },
    menuLabel: {
        fontSize: moderateScale(15),
        fontFamily: plusJakarta.regular,
    },
    chevron: {
        fontSize: moderateScale(20),
        fontFamily: plusJakarta.regular,
    },
    footer: {
        alignItems: 'center',
        marginTop: moderateScale(12),
        marginBottom: moderateScale(24),
    },
    brand: {
        fontSize: moderateScale(18),
        fontFamily: plusJakarta.bold,
    },
    tagline: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.regular,
        marginTop: moderateScale(4),
        textAlign: 'center',
    },
});

export default ProfileTab;
