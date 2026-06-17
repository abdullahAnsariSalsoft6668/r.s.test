import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TextComp from '@/components/TextComp';
import { useTabScreenStyles } from '@/hooks/useTabScreenStyles';
import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';

type TabScreenHeaderProps = {
    title: string;
    subtitle?: string;
    leadingAction?: React.ReactNode;
    rightAction?: React.ReactNode;
    rightActionVariant?: 'icon' | 'button';
    children?: React.ReactNode;
};

const TabScreenHeader: React.FC<TabScreenHeaderProps> = ({
    title,
    subtitle,
    leadingAction,
    rightAction,
    rightActionVariant = 'icon',
    children,
}) => {
    const insets = useSafeAreaInsets();
    const tabScreenStyles = useTabScreenStyles();
    const { theme } = useAppTheme();

    return (
        <LinearGradient
            colors={[...theme.gradients.header]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[tabScreenStyles.hero, { paddingTop: insets.top + moderateScale(14) }]}
        >
            <View style={tabScreenStyles.heroPattern} pointerEvents="none">
                <View style={tabScreenStyles.heroOrbLarge} />
                <View style={tabScreenStyles.heroOrbSmall} />
            </View>
            <View style={tabScreenStyles.heroContent}>
                {leadingAction ? (
                    <View style={{ marginBottom: moderateScale(12) }}>{leadingAction}</View>
                ) : null}
                <View style={tabScreenStyles.heroTitleRow}>
                    <View style={tabScreenStyles.heroTitleBlock}>
                        <TextComp text={title} style={tabScreenStyles.pageTitle} />
                        {subtitle ? (
                            <TextComp text={subtitle} style={tabScreenStyles.pageSubtitle} />
                        ) : null}
                    </View>
                    {rightAction ? (
                        rightActionVariant === 'button' ? (
                            rightAction
                        ) : (
                            <View style={tabScreenStyles.heroAction}>{rightAction}</View>
                        )
                    ) : null}
                </View>
                {children}
            </View>
        </LinearGradient>
    );
};

export default TabScreenHeader;
