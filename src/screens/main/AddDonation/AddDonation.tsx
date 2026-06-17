import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import * as Yup from 'yup';

import {
  DONATION_TYPES,
  useAddDonationMutation,
  useDeleteDonationMutation,
  useGetDonationsQuery,
  useUpdateDonationMutation,
} from '@/api/donationApiSlice';
import { useGetRecipientsQuery } from '@/api/recipientApiSlice';
import ButtonComp from '@/components/ButtonComp';
import HeaderComp from '@/components/HeaderComp';
import {
  EmptyState,
  FadeInView,
  FinanceDateField,
  HelpBanner,
} from '@/components/rizqShare';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useCurrency } from '@/hooks/useCurrency';
import { useAppTheme } from '@/context/ThemeContext';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import routes from '@/constants/routeNames';
import type { MainStackParamList } from '@/navigation/types';
import type { DonationType } from '@/models/finance.types';

import { createAddDonationStyles } from './styles';

type FormValues = {
  amount: string;
  recipientId: string;
  type: DonationType;
  date: string;
  note: string;
};

const todayIso = (): string => new Date().toISOString().slice(0, 10);

const emptyValues: FormValues = {
  amount: '',
  recipientId: '',
  type: 'Relative',
  date: todayIso(),
  note: '',
};

const AddDonation: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'AddDonation'>>();
  const styles = useThemedStyles(createAddDonationStyles);
  const { theme } = useAppTheme();
  const donationId = route.params?.donationId;
  const isEditing = Boolean(donationId);

  const { currentCurrency } = useCurrency();
  const { data: recipients = [] } = useGetRecipientsQuery();
  const { data: donations = [], isLoading: donationsLoading } = useGetDonationsQuery(undefined, {
    skip: !isEditing,
  });

  const existingDonation = useMemo(
    () => (donationId ? donations.find((entry) => entry.id === donationId) : undefined),
    [donationId, donations],
  );

  const [addDonation, { isLoading: isAdding }] = useAddDonationMutation();
  const [updateDonation, { isLoading: isUpdating }] = useUpdateDonationMutation();
  const [deleteDonation, { isLoading: isDeleting }] = useDeleteDonationMutation();

  const isSaving = isAdding || isUpdating;
  const isBusy = isSaving || isDeleting;

  const validationSchema = Yup.object({
    amount: Yup.string()
      .trim()
      .required(t('common.required'))
      .matches(/^\d+(\.\d{1,2})?$/, t('common.invalidAmount')),
    recipientId: Yup.string().required(t('donation.recipientRequired')),
    type: Yup.string().required(),
    date: Yup.string()
      .trim()
      .required(t('common.required'))
      .matches(/^\d{4}-\d{2}-\d{2}$/, t('donation.dateFormat')),
    note: Yup.string(),
  });

  const recipientOptions = useMemo(
    () => recipients.map((r) => ({ id: r.id, name: r.name })),
    [recipients],
  );

  const initialValues = useMemo<FormValues>(() => {
    if (!existingDonation) {
      return emptyValues;
    }
    return {
      amount: String(existingDonation.amount),
      recipientId: existingDonation.recipientId,
      type: existingDonation.type,
      date: existingDonation.date,
      note: existingDonation.note ?? '',
    };
  }, [existingDonation]);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const payload = {
        amount: parseFloat(values.amount),
        recipientId: values.recipientId,
        type: values.type,
        date: values.date,
        note: values.note.trim() || undefined,
        currency: existingDonation?.currency ?? currentCurrency,
      };

      if (isEditing && donationId) {
        await updateDonation({ id: donationId, data: payload }).unwrap();
      } else {
        await addDonation(payload).unwrap();
      }
      navigation.goBack();
    },
    [
      addDonation,
      currentCurrency,
      donationId,
      existingDonation?.currency,
      isEditing,
      navigation,
      updateDonation,
    ],
  );

  const confirmDelete = useCallback(() => {
    if (!donationId) {
      return;
    }

    Alert.alert(t('donation.deleteConfirmTitle'), t('donation.deleteConfirmMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('donation.deleteDonation'),
        style: 'destructive',
        onPress: async () => {
          await deleteDonation(donationId).unwrap();
          navigation.goBack();
        },
      },
    ]);
  }, [deleteDonation, donationId, navigation, t]);

  if (isEditing && donationsLoading) {
    return (
      <WrapperContainer style={styles.container}>
        <HeaderComp
          title={t('donation.editDonation')}
          leftIcon="arrowChevron"
          iconColor={theme.colors.text.primary}
          titleStyle={styles.headerTitle}
        />
        <ActivityIndicator color={theme.colors.brand.primary} style={styles.loader} />
      </WrapperContainer>
    );
  }

  if (isEditing && !existingDonation) {
    return (
      <WrapperContainer style={styles.container}>
        <HeaderComp
          title={t('donation.editDonation')}
          leftIcon="arrowChevron"
          iconColor={theme.colors.text.primary}
          titleStyle={styles.headerTitle}
        />
        <View style={styles.notFound}>
          <TextComp text={t('donation.notFound')} style={styles.notFoundText} />
          <ButtonComp title={t('common.cancel')} onPress={() => navigation.goBack()} size="m" />
        </View>
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={isEditing ? t('donation.editDonation') : t('donation.giveSadqa')}
        leftIcon="arrowChevron"
        iconColor={theme.colors.text.primary}
        titleStyle={styles.headerTitle}
      />
      <Formik<FormValues>
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit: submit,
        }) => (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            {!isEditing ? (
              <FadeInView index={0}>
                <HelpBanner message={t('donation.addHint')} />
              </FadeInView>
            ) : null}

            <FadeInView index={1}>
              <TextInputComp
                label={t('donation.amount')}
                placeholder="0"
                keyboardType="decimal-pad"
                value={values.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                error={touched.amount && errors.amount ? errors.amount : undefined}
                required
              />
            </FadeInView>

            <FadeInView index={2}>
              {recipientOptions.length === 0 ? (
                <EmptyState
                  title={t('donation.noRecipientsTitle')}
                  subtitle={t('donation.noRecipientsSubtitle')}
                  action={
                    <ButtonComp
                      title={t('recipient.addRecipient')}
                      onPress={() => navigation.navigate(routes.main.recipientsList)}
                      variant="outline"
                      size="m"
                    />
                  }
                />
              ) : (
                <RecipientPicker
                  label={t('donation.recipient')}
                  placeholder={t('donation.selectRecipient')}
                  options={recipientOptions}
                  selectedId={values.recipientId}
                  onSelect={(id) => setFieldValue('recipientId', id)}
                  onAddNew={() => navigation.navigate(routes.main.addRecipient)}
                  error={touched.recipientId && errors.recipientId ? errors.recipientId : undefined}
                />
              )}
            </FadeInView>

            <FadeInView index={3}>
              <TextComp text={t('donation.typeLabel')} style={styles.fieldLabel} />
              <View style={styles.typeRow}>
                {DONATION_TYPES.map((type) => {
                  const selected = values.type === type;
                  return (
                    <Pressable
                      key={type}
                      style={[styles.typeChip, selected && styles.typeChipSelected]}
                      onPress={() => setFieldValue('type', type)}
                    >
                      <TextComp
                        text={t(`recipient.types.${type}`)}
                        style={[styles.typeChipText, selected && styles.typeChipTextSelected]}
                      />
                    </Pressable>
                  );
                })}
              </View>
            </FadeInView>

            <FadeInView index={4}>
              <FinanceDateField
                label={t('donation.date')}
                placeholder={t('common.selectDate')}
                value={values.date}
                onChange={(iso) => setFieldValue('date', iso)}
                error={touched.date && errors.date ? errors.date : undefined}
                touched={touched.date}
                required
              />
            </FadeInView>

            <FadeInView index={5}>
              <TextInputComp
                label={t('donation.note')}
                placeholder={t('donation.notePlaceholder')}
                value={values.note}
                onChangeText={handleChange('note')}
                onBlur={handleBlur('note')}
                multiline
              />
            </FadeInView>

            <ButtonComp
              title={isEditing ? t('donation.saveChanges') : t('common.save')}
              onPress={submit}
              loading={isSaving}
              disabled={isBusy || recipientOptions.length === 0}
              size="l"
              style={styles.submitButton}
              gradientColors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
            />

            {isEditing ? (
              <ButtonComp
                title={t('donation.deleteDonation')}
                onPress={confirmDelete}
                loading={isDeleting}
                disabled={isBusy}
                variant="outline"
                size="l"
                style={styles.deleteButton}
              />
            ) : null}
          </ScrollView>
        )}
      </Formik>
    </WrapperContainer>
  );
};

type RecipientPickerProps = {
  label: string;
  placeholder: string;
  options: { id: string; name: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddNew: () => void;
  error?: string;
};

const RecipientPicker: React.FC<RecipientPickerProps> = ({
  label,
  placeholder,
  options,
  selectedId,
  onSelect,
  onAddNew,
  error,
}) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createAddDonationStyles);
  const [visible, setVisible] = React.useState(false);
  const selected = options.find((o) => o.id === selectedId);

  return (
    <View style={styles.pickerWrapper}>
      <TextComp text={label} style={styles.fieldLabel} />
      <Pressable style={[styles.pickerField, error ? styles.pickerFieldError : null]} onPress={() => setVisible(true)}>
        <TextComp
          text={selected?.name ?? placeholder}
          style={[styles.pickerText, !selected && styles.pickerPlaceholder]}
        />
      </Pressable>
      {error ? <TextComp text={error} style={styles.errorText} /> : null}

      <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <Pressable style={styles.modalSheet} onPress={(e) => e.stopPropagation()}>
            <TextComp text={label} style={styles.modalTitle} />
            <ScrollView style={styles.modalList}>
              {options.map((option) => (
                <Pressable
                  key={option.id}
                  style={[styles.modalOption, option.id === selectedId && styles.modalOptionSelected]}
                  onPress={() => {
                    onSelect(option.id);
                    setVisible(false);
                  }}
                >
                  <TextComp text={option.name} style={styles.modalOptionText} />
                </Pressable>
              ))}
            </ScrollView>
            <ButtonComp title={t('recipient.addRecipient')} onPress={() => { setVisible(false); onAddNew(); }} variant="outline" />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AddDonation;
