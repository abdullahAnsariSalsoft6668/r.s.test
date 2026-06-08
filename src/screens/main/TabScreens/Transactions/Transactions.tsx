import {
    FilterPill,
    MOCK_TRANSACTIONS,
    ScreenHeader,
    TransactionItem,
} from '@/components/rizqShare';
import type { TransactionType } from '@/components/rizqShare';
import WrapperContainer from '@/components/WrapperContainer';
import { useAppTheme } from '@/hooks/useAppTheme';
import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import styles from './styles';

type FilterKey = 'all' | TransactionType;

const FILTERS: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'income', label: 'Income' },
    { key: 'expense', label: 'Expenses' },
    { key: 'donation', label: 'Donation' },
];

const Transactions: React.FC = () => {
    const { colors } = useAppTheme();
    const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

    const filtered = useMemo(
        () =>
            activeFilter === 'all'
                ? MOCK_TRANSACTIONS
                : MOCK_TRANSACTIONS.filter(t => t.type === activeFilter),
        [activeFilter],
    );

    return (
        <WrapperContainer
            style={styles.container}
            edges={['top']}
            innerBackgroundColor={colors.background}
        >
            <StatusBar barStyle={colors.statusBar} backgroundColor={colors.background} />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <ScreenHeader colors={colors} title="Transactions" showNotification={false} />

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filters}
                >
                    {FILTERS.map(filter => (
                        <FilterPill
                            key={filter.key}
                            colors={colors}
                            label={filter.label}
                            active={activeFilter === filter.key}
                            onPress={() => setActiveFilter(filter.key)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.list}>
                    {filtered.map(transaction => (
                        <TransactionItem
                            key={transaction.id}
                            colors={colors}
                            transaction={transaction}
                        />
                    ))}
                </View>
            </ScrollView>
        </WrapperContainer>
    );
};

export default Transactions;
