import React from 'react';
import { View, ViewStyle } from 'react-native';

import { useTabScreenStyles } from '@/hooks/useTabScreenStyles';

type TabBodySheetProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};

const TabBodySheet: React.FC<TabBodySheetProps> = ({ children, style }) => {
    const tabScreenStyles = useTabScreenStyles();

    return <View style={[tabScreenStyles.bodySheet, style]}>{children}</View>;
};

export default TabBodySheet;
