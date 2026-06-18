import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';

import AppShimmerBox from './AppShimmerBox';

const FormShimmer: React.FC = () => {
    const { theme } = useAppTheme();
    const fieldStyle = {
        backgroundColor: theme.colors.card.background,
        borderColor: theme.colors.border.subtle,
    };

    return (
        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <AppShimmerBox variant="card" style={styles.banner} />

            {[0, 1, 2, 3].map((key) => (
                <View key={key} style={styles.fieldBlock}>
                    <AppShimmerBox variant="surface" style={styles.label} />
                    <View style={[styles.field, fieldStyle]}>
                        <AppShimmerBox variant="onCard" style={styles.fieldInner} />
                    </View>
                </View>
            ))}

            <View style={styles.toggleRow}>
                <AppShimmerBox variant="surface" style={styles.toggleLabel} />
                <AppShimmerBox variant="card" style={styles.toggle} />
            </View>

            <AppShimmerBox variant="card" style={styles.submitButton} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: spaces.medium,
        paddingBottom: moderateScale(40),
    },
    banner: {
        width: '100%',
        height: moderateScale(52),
        borderRadius: moderateScale(12),
        marginBottom: spaces.medium,
    },
    fieldBlock: {
        marginBottom: spaces.medium,
    },
    label: {
        width: moderateScale(90),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(8),
    },
    field: {
        borderRadius: moderateScale(14),
        borderWidth: 1,
        padding: spaces.medium,
    },
    fieldInner: {
        width: '100%',
        height: moderateScale(18),
        borderRadius: moderateScale(6),
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spaces.large,
    },
    toggleLabel: {
        width: moderateScale(120),
        height: moderateScale(14),
        borderRadius: moderateScale(6),
    },
    toggle: {
        width: moderateScale(48),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
    },
    submitButton: {
        width: '100%',
        height: moderateScale(52),
        borderRadius: moderateScale(14),
    },
});

export default FormShimmer;
