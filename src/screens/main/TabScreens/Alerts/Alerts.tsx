import { localImages } from '@/assets/images';
import {
    ALERTS_BG,
    ALERTS_GRADIENT_GLOW,
    ALERTS_GRADIENT_MID,
    AlertsFilterBar,
    AlertsHeader,
    MOCK_NOTIFICATIONS,
    NotificationCard,
    countUnread,
    deleteNotification,
    filterNotifications,
    markAllNotificationsRead,
    markNotificationRead,
} from '@/components/alerts';
import type { AlertNotification, NotificationFilter } from '@/components/alerts';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const GRADIENT_OVERLAY = {
    position: 'absolute' as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

const EmptyState = () => (
    <View style={styles.emptyState}>
        <TextComp text="No notifications to show" style={styles.emptyText} />
    </View>
);

const Alerts: React.FC = () => {
    const [notifications, setNotifications] = useState<AlertNotification[]>(MOCK_NOTIFICATIONS);
    const [activeFilter, setActiveFilter] = useState<NotificationFilter>('all');

    const unreadCount = useMemo(() => countUnread(notifications), [notifications]);
    const filteredNotifications = useMemo(
        () => filterNotifications(notifications, activeFilter),
        [activeFilter, notifications],
    );

    const handleMarkRead = useCallback((id: string) => {
        setNotifications(current => markNotificationRead(current, id));
    }, []);

    const handleMarkAllRead = useCallback(() => {
        setNotifications(current => markAllNotificationsRead(current));
    }, []);

    const handleDelete = useCallback((id: string) => {
        setNotifications(current => deleteNotification(current, id));
    }, []);

    const renderNotification: ListRenderItem<AlertNotification> = useCallback(
        ({ item, index }) => (
            <View style={styles.itemContainer}>
                <NotificationCard
                    notification={item}
                    index={index}
                    onMarkRead={handleMarkRead}
                    onDelete={handleDelete}
                />
            </View>
        ),
        [handleDelete, handleMarkRead],
    );

    const keyExtractor = useCallback((item: AlertNotification) => item.id, []);

    const listHeader = useMemo(
        () => (
            <View>
                <LinearGradient
                    colors={['#00050a', ALERTS_BG, '#00081a']}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerGradient}
                >
                    <LinearGradient
                        colors={[ALERTS_GRADIENT_GLOW, ALERTS_GRADIENT_MID, 'transparent']}
                        locations={[0, 0.45, 1]}
                        start={{ x: 0.62, y: 0 }}
                        end={{ x: 0.2, y: 0.9 }}
                        style={GRADIENT_OVERLAY}
                        pointerEvents="none"
                    />
                    <AlertsHeader avatarSource={localImages.user} unreadCount={unreadCount} />
                    <AlertsFilterBar
                        activeFilter={activeFilter}
                        totalCount={notifications.length}
                        unreadCount={unreadCount}
                        onFilterChange={setActiveFilter}
                        onMarkAllRead={handleMarkAllRead}
                    />
                </LinearGradient>

                <View style={styles.listPanel} />
            </View>
        ),
        [
            activeFilter,
            handleMarkAllRead,
            notifications.length,
            unreadCount,
        ],
    );

    return (
        <WrapperContainer
            style={styles.container}
            edges={['top']}
            innerBackgroundColor={ALERTS_BG}
        >
            <StatusBar barStyle="light-content" backgroundColor={ALERTS_BG} />
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={filteredNotifications}
                keyExtractor={keyExtractor}
                renderItem={renderNotification}
                ListHeaderComponent={listHeader}
                ListEmptyComponent={EmptyState}
                showsVerticalScrollIndicator={false}
                initialNumToRender={7}
                maxToRenderPerBatch={5}
                windowSize={8}
                removeClippedSubviews
            />
        </WrapperContainer>
    );
};

export default Alerts;
