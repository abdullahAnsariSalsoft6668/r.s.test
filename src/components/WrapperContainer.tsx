import React, { useMemo } from 'react';
import { StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

import { useAppTheme } from '@/context/ThemeContext';

interface WrapperContainerProps extends SafeAreaViewProps {
    children: React.ReactNode;
    style?: ViewStyle;
    innerBackgroundColor?: string;
}

const WrapperContainer: React.FC<WrapperContainerProps> = ({
    children,
    style,
    innerBackgroundColor,
    ...safeAreaProps
}) => {
    const { theme, isDark } = useAppTheme();
    const resolvedInnerBg = innerBackgroundColor ?? theme.colors.background.primary;

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background.header },
                style,
            ]}
            {...safeAreaProps}
        >
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.colors.background.header}
            />
            <View style={[styles.inner, { backgroundColor: resolvedInnerBg }]}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        overflow: 'hidden',
    },
});

export default React.memo(WrapperContainer);
