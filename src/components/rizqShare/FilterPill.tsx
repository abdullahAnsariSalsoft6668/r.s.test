import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import type { RizqThemeColors } from '@/styles/rizqTheme';
import { moderateScale } from '@/styles/scaling';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface FilterPillProps {
    colors: RizqThemeColors;
    label: string;
    active: boolean;
    onPress: () => void;
}

const FilterPill: React.FC<FilterPillProps> = ({ colors, label, active, onPress }) => (
    <TouchableOpacity
        style={[
            styles.pill,
            {
                backgroundColor: active ? colors.pillActive : colors.pillInactive,
                borderColor: active ? colors.pillActive : colors.cardBorder,
            },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <TextComp
            text={label}
            style={[
                styles.label,
                { color: active ? colors.pillActiveText : colors.pillInactiveText },
            ]}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    pill: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(8),
        borderRadius: moderateScale(20),
        borderWidth: 1,
        marginRight: moderateScale(8),
    },
    label: {
        fontSize: moderateScale(13),
        fontFamily: plusJakarta.bold,
    },
});

export default React.memo(FilterPill);
