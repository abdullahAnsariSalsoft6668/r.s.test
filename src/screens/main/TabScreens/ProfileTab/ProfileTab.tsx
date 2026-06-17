import React, { useCallback } from 'react';
import { ScrollView, StatusBar, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import MyIcons from '@/components/MyIcons';
import { TabBodySheet, TabScreenHeader } from '@/components/grocery';
import { FadeInView, ScalePressable } from '@/components/rizqShare';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routeNames';
import { MainStackParamList } from '@/navigation/types';
import { changeThemeState } from '@/redux/actions/settings';
import { useSelector } from '@/redux/hooks';
import { useCurrency } from '@/hooks/useCurrency';
import { CURRENCY_META } from '@/constants/currency';
import { useAppTheme } from '@/context/ThemeContext';
import { useTabScreenStyles } from '@/hooks/useTabScreenStyles';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { moderateScale } from '@/styles/scaling';

import { createProfileTabStyles } from './styles';

type SettingsRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  index: number;
  trailing?: React.ReactNode;
};

const SettingsRow: React.FC<SettingsRowProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  index,
  trailing,
}) => {
  const styles = useThemedStyles(createProfileTabStyles);
  const { theme } = useAppTheme();

  const content = (
    <>
      <View style={styles.rowLeft}>
        <View style={styles.iconWrap}>{icon}</View>
        <View style={styles.rowText}>
          <TextComp text={title} style={styles.rowTitle} />
          {subtitle ? <TextComp text={subtitle} style={styles.rowSubtitle} /> : null}
        </View>
      </View>
      {trailing ?? (
        <MyIcons name="rightChevron" size={moderateScale(14)} stroke={theme.colors.text.muted} />
      )}
    </>
  );

  return (
    <FadeInView index={index}>
      {onPress ? (
        <ScalePressable style={styles.row} onPress={onPress}>
          {content}
        </ScalePressable>
      ) : (
        <View style={styles.row}>{content}</View>
      )}
    </FadeInView>
  );
};

const ProfileTab: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { defaultLanguage } = useSelector((state) => state.settings);
  const { currentCurrency } = useCurrency();
  const { theme, isDark } = useAppTheme();
  const tabScreenStyles = useTabScreenStyles();
  const styles = useThemedStyles(createProfileTabStyles);

  const navigate = useCallback(
    (route: keyof MainStackParamList) => {
      navigation.navigate(route as never);
    },
    [navigation],
  );

  const toggleDarkMode = useCallback((enabled: boolean) => {
    changeThemeState(enabled ? 'dark' : 'light');
  }, []);

  return (
    <WrapperContainer
      style={tabScreenStyles.screen}
      edges={[]}
      innerBackgroundColor={theme.colors.background.secondary}
    >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background.header} />
      <TabScreenHeader
        title={t('settings.profileTitle')}
        subtitle={t('settings.profileSubtitle')}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TabBodySheet>
          <FadeInView index={0}>
            <LinearGradient
              colors={[...theme.gradients.gold]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.profileBanner}
            >
              <View style={styles.avatarRing}>
                <TextComp text={isDark ? '🌙' : '☀️'} style={styles.avatarEmoji} />
              </View>
              <View style={styles.bannerText}>
                <TextComp text={t('common.appName')} style={styles.bannerTitle} />
                <TextComp text={t('settings.profileTagline')} style={styles.bannerSubtitle} />
              </View>
            </LinearGradient>
          </FadeInView>

          <FadeInView index={1}>
            <TextComp text={t('settings.givingSection')} style={styles.sectionLabel} />
          </FadeInView>

          <SettingsRow
            index={2}
            icon={<MyIcons name="rizqTabHeartActive" size={moderateScale(20)} />}
            title={t('settings.givingPercent')}
            subtitle={t('settings.givingPercentHint')}
            onPress={() => navigate(routes.main.givingSettings as keyof MainStackParamList)}
          />

          <SettingsRow
            index={3}
            icon={<MyIcons name="rizqTabUserActive" size={moderateScale(20)} />}
            title={t('settings.recipients')}
            subtitle={t('settings.recipientsHint')}
            onPress={() => navigate(routes.main.recipientsList as keyof MainStackParamList)}
          />

          <SettingsRow
            index={4}
            icon={<TextComp text="🕌" style={styles.emojiIcon} />}
            title={t('settings.zakatHub')}
            subtitle={t('settings.zakatHubHint')}
            onPress={() => navigate(routes.main.zakatHub as keyof MainStackParamList)}
          />

          <FadeInView index={5}>
            <TextComp text={t('settings.preferencesSection')} style={styles.sectionLabel} />
          </FadeInView>

          <SettingsRow
            index={6}
            icon={
              <TextComp
                text={CURRENCY_META[currentCurrency].symbol}
                style={styles.currencySymbol}
              />
            }
            title={t('settings.currency')}
            subtitle={t(CURRENCY_META[currentCurrency].labelKey)}
            onPress={() => navigate(routes.main.currencySettings as keyof MainStackParamList)}
          />

          <SettingsRow
            index={7}
            icon={<MyIcons name="rizqIconSettings" size={moderateScale(20)} />}
            title={t('settings.language')}
            subtitle={defaultLanguage.name}
            onPress={() => navigate(routes.main.languageSettings as keyof MainStackParamList)}
          />

          <SettingsRow
            index={8}
            icon={
              <TextComp
                text={isDark ? '🌙' : '☀️'}
                style={styles.emojiIcon}
              />
            }
            title={t('settings.darkMode')}
            subtitle={isDark ? t('settings.darkOn') : t('settings.darkOff')}
            trailing={
              <Switch
                value={isDark}
                onValueChange={toggleDarkMode}
                trackColor={{
                  false: theme.colors.border.default,
                  true: theme.colors.brand.primary,
                }}
                thumbColor={theme.colors.card.background}
              />
            }
          />
        </TabBodySheet>
      </ScrollView>
    </WrapperContainer>
  );
};

export default ProfileTab;
