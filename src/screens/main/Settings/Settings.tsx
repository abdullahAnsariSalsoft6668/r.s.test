//import libraries
import HeaderComp from '@/components/HeaderComp';
import MyIcons, { IconName } from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routeNames';
import { MainStackParamList } from '@/navigation/types';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';

type PreferenceItem = {
    id: string;
    labelKey: string;
    icon: IconName;
    onPress: () => void;
};

// create a component
const Settings = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp<MainStackParamList>>();

    const preferenceItems: PreferenceItem[] = [
        {
            id: 'profile',
            labelKey: 'settings.profileTitle',
            icon: 'userIcon',
            onPress: () => navigation.navigate(routes.main.profileDetails),
        },
        {
            id: 'appearance',
            labelKey: 'settings.darkMode',
            icon: 'dashboard',
            onPress: () => {},
        },
        {
            id: 'language',
            labelKey: 'settings.language',
            icon: 'filter',
            onPress: () => navigation.navigate(routes.main.languageSettings),
        },
    ];

    return (
        <WrapperContainer style={styles.container}>
            <HeaderComp
                title={t('settings.title')}
                leftIcon="backBlack"
                iconColor={Colors.text}
                titleStyle={styles.headerTitle}
            />
            <View style={styles.content}>
                <TextComp text={t('settings.profileSubtitle')} style={styles.sectionTitle} />
                {preferenceItems.map((item) => (
                    <Pressable key={item.id} style={styles.preferenceCard} onPress={item.onPress}>
                        <View style={styles.preferenceLeft}>
                            <View style={styles.iconWrap}>
                                <MyIcons name={item.icon} size={moderateScale(18)} stroke={Colors.gray500} />
                            </View>
                            <TextComp text={t(item.labelKey)} style={styles.preferenceText} />
                        </View>
                        <MyIcons name="sideArrow" size={moderateScale(14)} stroke={Colors.gray300} />
                    </Pressable>
                ))}
            </View>
        </WrapperContainer>
    );
};

export default Settings;
