import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, Alert, ScrollView, Switch, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import * as Yup from 'yup';

import {
  useAddIncomeCategoryMutation,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomeCategoriesQuery,
  useGetIncomesQuery,
  useUpdateIncomeMutation,
} from '@/api/incomeApiSlice';
import ButtonComp from '@/components/ButtonComp';
import { FinanceCategoryPicker } from '@/components/finance';
import HeaderComp from '@/components/HeaderComp';
import { FadeInView, FinanceDateField, HelpBanner } from '@/components/rizqShare';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useCurrency } from '@/hooks/useCurrency';
import { useAppTheme } from '@/context/ThemeContext';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import type { MainStackParamList } from '@/navigation/types';

import { createAddIncomeStyles } from './styles';

type AddIncomeFormValues = {
  amount: string;
  categoryId: string;
  date: string;
  note: string;
  recurring: boolean;
};

const todayIso = (): string => new Date().toISOString().slice(0, 10);

const emptyValues: AddIncomeFormValues = {
  amount: '',
  categoryId: '',
  date: todayIso(),
  note: '',
  recurring: false,
};

const AddIncome: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'AddIncome'>>();
  const styles = useThemedStyles(createAddIncomeStyles);
  const { theme } = useAppTheme();
  const incomeId = route.params?.incomeId;
  const isEditing = Boolean(incomeId);

  const { currentCurrency } = useCurrency();
  const { data: categories = [] } = useGetIncomeCategoriesQuery();
  const { data: incomes = [], isLoading: incomesLoading } = useGetIncomesQuery(undefined, {
    skip: !isEditing,
  });

  const existingIncome = useMemo(
    () => (incomeId ? incomes.find((entry) => entry.id === incomeId) : undefined),
    [incomeId, incomes],
  );

  const [addIncome, { isLoading: isAdding }] = useAddIncomeMutation();
  const [updateIncome, { isLoading: isUpdating }] = useUpdateIncomeMutation();
  const [deleteIncome, { isLoading: isDeleting }] = useDeleteIncomeMutation();
  const [addIncomeCategory] = useAddIncomeCategoryMutation();

  const isSaving = isAdding || isUpdating;
  const isBusy = isSaving || isDeleting;

  const validationSchema = Yup.object().shape({
    amount: Yup.string()
      .trim()
      .required(t('common.required'))
      .matches(/^\d+(\.\d{1,2})?$/, t('common.invalidAmount')),
    categoryId: Yup.string().required(t('common.required')),
    date: Yup.string()
      .trim()
      .required(t('common.required'))
      .matches(/^\d{4}-\d{2}-\d{2}$/, t('income.dateFormat')),
    note: Yup.string().trim(),
    recurring: Yup.boolean(),
  });

  const initialValues = useMemo<AddIncomeFormValues>(() => {
    if (!existingIncome) {
      return emptyValues;
    }
    return {
      amount: String(existingIncome.amount),
      categoryId: existingIncome.categoryId,
      date: existingIncome.date,
      note: existingIncome.note ?? '',
      recurring: existingIncome.recurring,
    };
  }, [existingIncome]);

  const handleAddCategory = useCallback(
    async (name: string) => {
      const result = await addIncomeCategory(name).unwrap();
      return result;
    },
    [addIncomeCategory],
  );

  const handleSubmit = useCallback(
    async (values: AddIncomeFormValues) => {
      const payload = {
        amount: parseFloat(values.amount),
        categoryId: values.categoryId,
        date: values.date,
        note: values.note.trim() || undefined,
        recurring: values.recurring,
        currency: existingIncome?.currency ?? currentCurrency,
      };

      if (isEditing && incomeId) {
        await updateIncome({ id: incomeId, ...payload }).unwrap();
      } else {
        await addIncome(payload).unwrap();
      }
      navigation.goBack();
    },
    [
      addIncome,
      currentCurrency,
      existingIncome?.currency,
      incomeId,
      isEditing,
      navigation,
      updateIncome,
    ],
  );

  const confirmDelete = useCallback(() => {
    if (!incomeId) {
      return;
    }

    Alert.alert(t('income.deleteConfirmTitle'), t('income.deleteConfirmMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('income.deleteIncome'),
        style: 'destructive',
        onPress: async () => {
          await deleteIncome(incomeId).unwrap();
          navigation.goBack();
        },
      },
    ]);
  }, [deleteIncome, incomeId, navigation, t]);

  if (isEditing && incomesLoading) {
    return (
      <WrapperContainer style={styles.container}>
        <HeaderComp
          title={t('income.editIncome')}
          leftIcon="arrowChevron"
          iconColor={theme.colors.text.primary}
          titleStyle={styles.headerTitle}
        />
        <ActivityIndicator color={theme.colors.brand.primary} style={styles.loader} />
      </WrapperContainer>
    );
  }

  if (isEditing && !existingIncome) {
    return (
      <WrapperContainer style={styles.container}>
        <HeaderComp
          title={t('income.editIncome')}
          leftIcon="arrowChevron"
          iconColor={theme.colors.text.primary}
          titleStyle={styles.headerTitle}
        />
        <View style={styles.notFound}>
          <TextComp text={t('income.notFound')} style={styles.notFoundText} />
          <ButtonComp title={t('common.cancel')} onPress={() => navigation.goBack()} size="m" />
        </View>
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={isEditing ? t('income.editIncome') : t('income.addIncome')}
        leftIcon="arrowChevron"
        iconColor={theme.colors.text.primary}
        titleStyle={styles.headerTitle}
      />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit: submitForm,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {!isEditing ? (
              <FadeInView index={0}>
                <HelpBanner message={t('income.addHint')} />
              </FadeInView>
            ) : null}

            <FadeInView index={1}>
              <TextInputComp
                label={t('income.amount')}
                placeholder="0"
                keyboardType="decimal-pad"
                value={values.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                error={touched.amount && errors.amount}
                touched={touched.amount}
                required
              />
            </FadeInView>

            <FadeInView index={2}>
              <FinanceCategoryPicker
                label={t('income.category')}
                placeholder={t('income.selectCategory')}
                categories={categories}
                selectedId={values.categoryId}
                onSelect={(id) => setFieldValue('categoryId', id)}
                onAddCategory={handleAddCategory}
                accentColor={theme.colors.brand.success}
                error={touched.categoryId && errors.categoryId}
                touched={touched.categoryId}
              />
            </FadeInView>

            <FadeInView index={3}>
              <FinanceDateField
                label={t('income.date')}
                placeholder={t('common.selectDate')}
                value={values.date}
                onChange={(iso) => setFieldValue('date', iso)}
                error={touched.date && errors.date}
                touched={touched.date}
                required
              />
            </FadeInView>

            <FadeInView index={4}>
              <TextInputComp
                label={t('income.note')}
                placeholder={t('income.notePlaceholder')}
                value={values.note}
                onChangeText={handleChange('note')}
                onBlur={handleBlur('note')}
                multiline
                inputContainerStyle={styles.noteInput}
                inputStyle={styles.noteText}
              />
            </FadeInView>

            <FadeInView index={5}>
              <View style={styles.recurringRow}>
              <View style={styles.recurringCopy}>
                <TextComp text={t('income.recurring')} style={styles.recurringLabel} />
                <TextComp text={t('income.recurringHint')} style={styles.recurringHint} />
              </View>
              <Switch
                value={values.recurring}
                onValueChange={(value) => setFieldValue('recurring', value)}
                trackColor={{ false: theme.colors.border.default, true: theme.colors.brand.success }}
                thumbColor={theme.colors.card.background}
              />
            </View>
            </FadeInView>

            <ButtonComp
              title={isEditing ? t('income.saveChanges') : t('common.save')}
              onPress={() => submitForm()}
              loading={isSaving}
              disabled={isBusy}
              size="l"
              style={styles.submitButton}
              gradientColors={[theme.colors.brand.success, theme.colors.brand.success]}
            />

            {isEditing ? (
              <ButtonComp
                title={t('income.deleteIncome')}
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

export default AddIncome;
