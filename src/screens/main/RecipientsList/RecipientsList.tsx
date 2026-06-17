import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {
  useDeleteRecipientMutation,
  useGetRecipientsQuery,
} from '@/api/recipientApiSlice';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import MyIcons from '@/components/MyIcons';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import routes from '@/constants/routeNames';
import { MainStackParamList } from '@/navigation/types';
import type { Recipient } from '@/models/finance.types';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';

import styles from './styles';

const RecipientsList: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const { data: recipients = [], isLoading } = useGetRecipientsQuery();
  const [deleteRecipient] = useDeleteRecipientMutation();
  const [search, setSearch] = useState('');

  const filteredRecipients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return recipients;
    }
    return recipients.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.relationshipType.toLowerCase().includes(query),
    );
  }, [recipients, search]);

  const getRelationshipLabel = useCallback(
    (type: Recipient['relationshipType']) => t(`recipient.types.${type}`),
    [t],
  );

  const handleDelete = useCallback(
    (recipient: Recipient) => {
      Alert.alert(
        t('recipient.deleteTitle'),
        t('recipient.deleteConfirm', { name: recipient.name }),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.delete'),
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteRecipient(recipient.id).unwrap();
                Toast.show({ type: 'success', text1: t('recipient.deletedSuccess') });
              } catch {
                Toast.show({ type: 'error', text1: t('common.errorGeneric') });
              }
            },
          },
        ],
      );
    },
    [deleteRecipient, t],
  );

  const openAddRecipient = useCallback(() => {
    navigation.navigate(routes.main.addRecipient);
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Recipient }) => (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <TextComp text={item.name} style={styles.name} />
          <TextComp text={getRelationshipLabel(item.relationshipType)} style={styles.relationship} />
          {item.note ? <TextComp text={item.note} style={styles.note} /> : null}
        </View>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
          accessibilityRole="button"
          accessibilityLabel={t('recipient.deleteAction')}
        >
          <MyIcons name="close" size={moderateScale(18)} stroke={Colors.gray500} />
        </Pressable>
      </View>
    ),
    [getRelationshipLabel, handleDelete, t],
  );

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={t('recipient.title')}
        leftIcon="arrowChevron"
        iconColor={Colors.text}
        titleStyle={styles.headerTitle}
      />
      <View style={styles.content}>
        <TextInputComp
          placeholder={t('recipient.searchPlaceholder')}
          value={search}
          onChangeText={setSearch}
          containerStyle={styles.searchInput}
        />

        <FlatList
          data={filteredRecipients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            !isLoading ? (
              <TextComp text={t('recipient.empty')} style={styles.empty} />
            ) : null
          }
        />
      </View>

      <View style={styles.fab}>
        <ButtonComp title={t('recipient.addRecipient')} onPress={openAddRecipient} />
      </View>
    </WrapperContainer>
  );
};

export default RecipientsList;
