import { localImages } from '@/assets/images';
import TextComp from '@/components/TextComp';
import WrapperContainer from '@/components/WrapperContainer';
import React, { useCallback } from 'react';
import {
    ImageBackground,
    SectionList,
    StatusBar,
} from 'react-native';

import NotificationListItem from './NotificationListItem';
import NotificationScreenHeader from './NotificationScreenHeader';
import styles, { NOTIFICATION_BG } from './styles';

const NOTIFICATION_MESSAGE =
    'New coupon you redeemed has been stored in your profile section';

type NotificationItem = {
    id: string;
    message: string;
    time: string;
};

type NotificationSection = {
    title: string;
    data: NotificationItem[];
};

const NOTIFICATION_SECTIONS: NotificationSection[] = [
    {
        title: 'TODAY',
        data: [
            { id: 'today-1', message: NOTIFICATION_MESSAGE, time: 'Just now' },
            { id: 'today-2', message: NOTIFICATION_MESSAGE, time: '05 mins ago' },
            { id: 'today-3', message: NOTIFICATION_MESSAGE, time: '01 hr ago' },
            { id: 'today-4', message: NOTIFICATION_MESSAGE, time: '3hr ago' },
        ],
    },
    {
        title: 'YESTERDAY',
        data: [{ id: 'yesterday-1', message: NOTIFICATION_MESSAGE, time: '1 day ago' }],
    },
];

const Notification: React.FC = () => {
    const keyExtractor = useCallback((item: NotificationItem) => item.id, []);

    const renderItem = useCallback(
        ({ item }: { item: NotificationItem }) => (
            <NotificationListItem message={item.message} time={item.time} />
        ),
        [],
    );

    const renderSectionHeader = useCallback(
        ({ section }: { section: NotificationSection }) => (
            <TextComp text={section.title} style={styles.sectionTitle} />
        ),
        [],
    );

    return (
        <WrapperContainer style={styles.container} edges={['top']}>
            <ImageBackground
                source={localImages.homeBg}
                style={styles.background}
                resizeMode="cover"
            >
                <StatusBar barStyle="light-content" backgroundColor={NOTIFICATION_BG} />
                <NotificationScreenHeader titleStyle={styles.headerTitle} />
                <SectionList
                    sections={NOTIFICATION_SECTIONS}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    stickySectionHeadersEnabled={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                />
            </ImageBackground>
        </WrapperContainer>
    );
};

export default Notification;
