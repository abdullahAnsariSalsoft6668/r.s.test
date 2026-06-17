import React, { useCallback } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import { RELATIONSHIP_TYPES, useAddRecipientMutation } from '@/api/recipientApiSlice';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import type { RelationshipType } from '@/models/finance.types';
import { Colors } from '@/styles/colors';

import styles from './styles';

type FormValues = {
  name: string;
  relationshipType: RelationshipType;
  phone: string;
  note: string;
};

const AddRecipient: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [addRecipient, { isLoading }] = useAddRecipientMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required(t('validation.nameRequired')),
    relationshipType: Yup.string().required(),
    phone: Yup.string(),
    note: Yup.string(),
  });

  const initialValues: FormValues = {
    name: '',
    relationshipType: 'Relative',
    phone: '',
    note: '',
  };

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await addRecipient({
          name: values.name.trim(),
          relationshipType: values.relationshipType,
          phone: values.phone.trim() || undefined,
          note: values.note.trim() || undefined,
        }).unwrap();
        Toast.show({ type: 'success', text1: t('recipient.savedSuccess') });
        navigation.goBack();
      } catch {
        Toast.show({ type: 'error', text1: t('common.errorGeneric') });
      }
    },
    [addRecipient, navigation, t],
  );

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={t('recipient.addRecipient')}
        leftIcon="arrowChevron"
        iconColor={Colors.text}
        titleStyle={styles.headerTitle}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit: submitForm, values, errors, touched, setFieldValue }) => (
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <View style={styles.field}>
              <TextComp text={t('recipient.name')} style={styles.label} />
              <TextInputComp
                placeholder={t('recipient.namePlaceholder')}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name ? errors.name : undefined}
              />
            </View>

            <View style={styles.field}>
              <TextComp text={t('recipient.relationship')} style={styles.label} />
              <View style={styles.chipRow}>
                {RELATIONSHIP_TYPES.map((type) => {
                  const selected = values.relationshipType === type;
                  return (
                    <Pressable
                      key={type}
                      style={[styles.chip, selected && styles.chipSelected]}
                      onPress={() => setFieldValue('relationshipType', type)}
                    >
                      <TextComp
                        text={t(`recipient.types.${type}`)}
                        style={[styles.chipText, selected && styles.chipTextSelected]}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.field}>
              <TextComp text={t('recipient.phone')} style={styles.label} />
              <TextInputComp
                placeholder={t('recipient.phonePlaceholder')}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.field}>
              <TextComp text={t('recipient.note')} style={styles.label} />
              <TextInputComp
                placeholder={t('recipient.notePlaceholder')}
                value={values.note}
                onChangeText={handleChange('note')}
                onBlur={handleBlur('note')}
                multiline
              />
            </View>

            <ButtonComp
              title={t('common.save')}
              onPress={() => submitForm()}
              loading={isLoading}
              disabled={isLoading}
              style={styles.saveButton}
            />
          </ScrollView>
        )}
      </Formik>
    </WrapperContainer>
  );
};

export default AddRecipient;
