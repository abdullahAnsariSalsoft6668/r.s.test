import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Yup from 'yup';

import {
  useAddExpenseCategoryMutation,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseCategoriesQuery,
  useGetExpensesQuery,
  useUpdateExpenseMutation,
  useUploadReceiptMutation,
} from '@/api/expenseApiSlice';
import ButtonComp from '@/components/ButtonComp';
import { FinanceCategoryPicker } from '@/components/finance';
import HeaderComp from '@/components/HeaderComp';
import { FormShimmer } from '@/components/shimmer';
import MyIcons from '@/components/MyIcons';
import { FadeInView, FinanceDateField, HelpBanner } from '@/components/rizqShare';
import TextComp from '@/components/TextComp';
import TextInputComp from '@/components/TextInputComp';
import WrapperContainer from '@/components/WrapperContainer';
import { useCurrency } from '@/hooks/useCurrency';
import { useAppTheme } from '@/context/ThemeContext';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import type { MainStackParamList } from '@/navigation/types';
import { moderateScale } from '@/styles/scaling';

import { createAddExpenseStyles } from './styles';

type AddExpenseFormValues = {
  amount: string;
  categoryId: string;
  date: string;
  note: string;
  receiptUri: string;
};

const todayIso = (): string => new Date().toISOString().slice(0, 10);

const emptyValues: AddExpenseFormValues = {
  amount: '',
  categoryId: '',
  date: todayIso(),
  note: '',
  receiptUri: '',
};

const AddExpense: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();
  const route = useRoute<RouteProp<MainStackParamList, 'AddExpense'>>();
  const styles = useThemedStyles(createAddExpenseStyles);
  const { theme } = useAppTheme();
  const expenseAccent = theme.colors.status.error;
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);

  const { currentCurrency } = useCurrency();
  const { data: categories = [] } = useGetExpenseCategoriesQuery();
  const { data: expenses = [], isLoading: expensesLoading } = useGetExpensesQuery(undefined, {
    skip: !isEditing,
  });

  const existingExpense = useMemo(
    () => (expenseId ? expenses.find((entry) => entry.id === expenseId) : undefined),
    [expenseId, expenses],
  );

  const [addExpense, { isLoading: isAdding }] = useAddExpenseMutation();
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();
  const [addExpenseCategory] = useAddExpenseCategoryMutation();
  const [uploadReceipt, { isLoading: isUploadingReceipt }] = useUploadReceiptMutation();

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
      .matches(/^\d{4}-\d{2}-\d{2}$/, t('expense.dateFormat')),
    note: Yup.string().trim(),
    receiptUri: Yup.string().trim(),
  });

  const initialValues = useMemo<AddExpenseFormValues>(() => {
    if (!existingExpense) {
      return emptyValues;
    }
    return {
      amount: String(existingExpense.amount),
      categoryId: existingExpense.categoryId,
      date: existingExpense.date,
      note: existingExpense.note ?? '',
      receiptUri: existingExpense.receiptUri ?? '',
    };
  }, [existingExpense]);

  const handleAddCategory = useCallback(
    async (name: string) => {
      const result = await addExpenseCategory(name).unwrap();
      return result;
    },
    [addExpenseCategory],
  );

  const handlePickReceipt = useCallback(
    async (setFieldValue: (field: string, value: string) => void) => {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      });

      if (result.didCancel || !result.assets?.[0]?.uri) {
        return;
      }

      const localUri = result.assets[0].uri;
      try {
        const uploaded = await uploadReceipt(localUri).unwrap();
        setFieldValue('receiptUri', uploaded.receiptUri);
      } catch {
        Alert.alert(t('expense.receiptError'));
      }
    },
    [t, uploadReceipt],
  );

  const handleSubmit = useCallback(
    async (values: AddExpenseFormValues) => {
      const payload = {
        amount: parseFloat(values.amount),
        categoryId: values.categoryId,
        date: values.date,
        note: values.note.trim() || undefined,
        receiptUri: values.receiptUri || undefined,
        currency: existingExpense?.currency ?? currentCurrency,
      };

      if (isEditing && expenseId) {
        await updateExpense({ id: expenseId, ...payload }).unwrap();
      } else {
        await addExpense(payload).unwrap();
      }
      navigation.goBack();
    },
    [
      addExpense,
      currentCurrency,
      existingExpense?.currency,
      expenseId,
      isEditing,
      navigation,
      updateExpense,
    ],
  );

  const confirmDelete = useCallback(() => {
    if (!expenseId) {
      return;
    }

    Alert.alert(t('expense.deleteConfirmTitle'), t('expense.deleteConfirmMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('expense.deleteExpense'),
        style: 'destructive',
        onPress: async () => {
          await deleteExpense(expenseId).unwrap();
          navigation.goBack();
        },
      },
    ]);
  }, [deleteExpense, expenseId, navigation, t]);

  if (isEditing && expensesLoading) {
    return (
      <WrapperContainer style={styles.container}>
        <HeaderComp
          title={t('expense.editExpense')}
          leftIcon="arrowChevron"
          iconColor={theme.colors.text.primary}
          titleStyle={styles.headerTitle}
        />
        <FormShimmer />
      </WrapperContainer>
    );
  }

  if (isEditing && !existingExpense) {
    return (
      <WrapperContainer style={styles.container}>
        <HeaderComp
          title={t('expense.editExpense')}
          leftIcon="arrowChevron"
          iconColor={theme.colors.text.primary}
          titleStyle={styles.headerTitle}
        />
        <View style={styles.notFound}>
          <TextComp text={t('expense.notFound')} style={styles.notFoundText} />
          <ButtonComp title={t('common.cancel')} onPress={() => navigation.goBack()} size="m" />
        </View>
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer style={styles.container}>
      <HeaderComp
        title={isEditing ? t('expense.editExpense') : t('expense.addExpense')}
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
                <HelpBanner message={t('expense.addHint')} />
              </FadeInView>
            ) : null}

            <FadeInView index={1}>
              <TextInputComp
                label={t('expense.amount')}
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
                label={t('expense.category')}
                placeholder={t('expense.selectCategory')}
                categories={categories}
                selectedId={values.categoryId}
                onSelect={(id) => setFieldValue('categoryId', id)}
                onAddCategory={handleAddCategory}
                accentColor={expenseAccent}
                error={touched.categoryId && errors.categoryId}
                touched={touched.categoryId}
              />
            </FadeInView>

            <FadeInView index={3}>
              <FinanceDateField
                label={t('expense.date')}
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
                label={t('expense.note')}
                placeholder={t('expense.notePlaceholder')}
                value={values.note}
                onChangeText={handleChange('note')}
                onBlur={handleBlur('note')}
                multiline
                inputContainerStyle={styles.noteInput}
                inputStyle={styles.noteText}
              />
            </FadeInView>

            <FadeInView index={5}>
              <View style={styles.receiptSection}>
                <TextComp text={t('expense.receipt')} style={styles.receiptLabel} />
                <TextComp text={t('expense.receiptOptional')} style={styles.receiptHint} />

                {values.receiptUri ? (
                  <View style={styles.receiptPreviewWrap}>
                    <Image
                      source={{ uri: values.receiptUri }}
                      style={styles.receiptPreview}
                      resizeMode="cover"
                    />
                    <Pressable
                      style={styles.removeReceiptBtn}
                      onPress={() => setFieldValue('receiptUri', '')}
                      accessibilityRole="button"
                    >
                      <MyIcons name="close" size={moderateScale(16)} fill={theme.colors.text.inverse} />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    style={styles.receiptPicker}
                    onPress={() => handlePickReceipt(setFieldValue)}
                    disabled={isUploadingReceipt}
                    accessibilityRole="button"
                  >
                    <MyIcons name="documentIcon" size={moderateScale(28)} />
                    <TextComp
                      text={
                        isUploadingReceipt
                          ? t('expense.receiptUploading')
                          : t('expense.attachReceipt')
                      }
                      style={styles.receiptPickerText}
                    />
                  </Pressable>
                )}
              </View>
            </FadeInView>

            <ButtonComp
              title={isEditing ? t('expense.saveChanges') : t('common.save')}
              onPress={() => submitForm()}
              loading={isSaving}
              disabled={isBusy}
              size="l"
              style={styles.submitButton}
              gradientColors={[expenseAccent, expenseAccent]}
            />

            {isEditing ? (
              <ButtonComp
                title={t('expense.deleteExpense')}
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

export default AddExpense;
