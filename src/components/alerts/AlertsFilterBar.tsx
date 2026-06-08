import TextComp from '@/components/TextComp';
import { useEntranceAnimation } from '@/hooks/animations/useEntranceAnimation';
import { usePressScale } from '@/hooks/animations/usePressScale';
import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

import { FILTER_ACTIVE_GRADIENT } from './constants';
import type { NotificationFilter } from './types';

type AlertsFilterBarProps = {
    activeFilter: NotificationFilter;
    totalCount: number;
    unreadCount: number;
    onFilterChange: (filter: NotificationFilter) => void;
    onMarkAllRead: () => void;
};

type FilterPillProps = {
    label: string;
    isActive: boolean;
    onPress: () => void;
};

const FilterPill: React.FC<FilterPillProps> = ({ label, isActive, onPress }) => {
    const { animatedStyle, onPressIn, onPressOut } = usePressScale();

    if (isActive) {
        return (
            <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View style={animatedStyle}>
                    <LinearGradient
                        colors={[...FILTER_ACTIVE_GRADIENT]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.activePill}
                    >
                        <TextComp text={label} style={styles.activePillText} />
                    </LinearGradient>
                </Animated.View>
            </Pressable>
        );
    }

    return (
        <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={[styles.inactivePill, animatedStyle]}>
                <TextComp text={label} style={styles.inactivePillText} />
            </Animated.View>
        </Pressable>
    );
};

const AlertsFilterBar: React.FC<AlertsFilterBarProps> = ({
    activeFilter,
    totalCount,
    unreadCount,
    onFilterChange,
    onMarkAllRead,
}) => {
    const animatedStyle = useEntranceAnimation({ baseDelay: 160, translateY: 14 });
    const { animatedStyle: markAllStyle, onPressIn, onPressOut } = usePressScale();

    const selectAll = useCallback(() => onFilterChange('all'), [onFilterChange]);
    const selectUnread = useCallback(() => onFilterChange('unread'), [onFilterChange]);

    return (
        <Animated.View style={[styles.bar, animatedStyle]}>
            <View style={styles.pills}>
                <FilterPill
                    label={`All (${totalCount})`}
                    isActive={activeFilter === 'all'}
                    onPress={selectAll}
                />
                <FilterPill
                    label={`Unread (${unreadCount})`}
                    isActive={activeFilter === 'unread'}
                    onPress={selectUnread}
                />
            </View>

            <Pressable
                onPress={onMarkAllRead}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                disabled={unreadCount === 0}
                accessibilityRole="button"
                accessibilityLabel="Mark all read"
            >
                <Animated.View style={markAllStyle}>
                    <TextComp
                        text="Mark all read"
                        style={[
                            styles.markAllText,
                            unreadCount === 0 && styles.markAllTextDisabled,
                        ]}
                    />
                </Animated.View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: moderateScale(16),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(8),
        marginBottom: moderateScale(18),
    },
    pills: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(8),
    },
    activePill: {
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(8),
    },
    activePillText: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.bold,
        color: Colors.white,
    },
    inactivePill: {
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(8),
        backgroundColor: Colors.white,
    },
    inactivePillText: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.bold,
        color: Colors.text,
    },
    markAllText: {
        fontSize: moderateScale(12),
        fontFamily: plusJakarta.bold,
        color: Colors.white,
    },
    markAllTextDisabled: {
        opacity: 0.45,
    },
});

export default React.memo(AlertsFilterBar);
