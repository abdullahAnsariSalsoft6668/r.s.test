import type { AuthUser, SelectedChildUser } from '@/models/auth.types';
import { secureStorage } from '@/utils/secureStorage';
import {
    changeFirstTime,
    clearData,
    hydrateAuth,
    saveAuthToken,
    saveRefreshToken,
    saveUserData,
    setSelectedChild,
} from '../reducers/auth';
import store from '../store';

const { dispatch } = store;

export const changeFirstTimeState = (isFirstTime: boolean) => {
    secureStorage.setItem('IS_FIRST_TIME', isFirstTime.toString()).then(() => {
        dispatch(changeFirstTime(isFirstTime));
    });
};

/** Marks onboarding as completed so auth stack opens on Login on next launch. */
export const completeOnboardingAction = async () => {
    await secureStorage.setItem('IS_FIRST_TIME', 'false');
    dispatch(changeFirstTime(false));
};

export type LoginSessionPayload = {
    user: AuthUser;
    accessToken: string;
    refreshToken?: string;
    selectedChild?: SelectedChildUser | null;
    /** When true, marks first-time flag like legacy login (default true for new sessions). */
    setFirstTime?: boolean;
};

/**
 * Persists full API user, access + refresh tokens, optional selected child, and updates Redux.
 */
export const loginSessionAction = async ({
    user,
    accessToken,
    refreshToken = '',
    selectedChild = null,
    setFirstTime = true,
}: LoginSessionPayload) => {
    const token = String(accessToken ?? '').trim();
    const refresh = String(refreshToken ?? '').trim();

    await secureStorage.setItem('USER_DATA', JSON.stringify(user));
    await secureStorage.setItem('AUTH_TOKEN', token);
    await secureStorage.setItem('REFRESH_TOKEN', refresh);

    if (selectedChild != null && typeof selectedChild === 'object') {
        await secureStorage.setObject('SELECTED_CHILD', selectedChild);
        const cid = String(selectedChild._id ?? selectedChild.id ?? '').trim();
        if (cid) {
            await secureStorage.setItem('SELECTED_CHILD_ID', cid);
        } else {
            await secureStorage.removeItem('SELECTED_CHILD_ID');
        }
    } else {
        await secureStorage.removeItem('SELECTED_CHILD');
        await secureStorage.removeItem('SELECTED_CHILD_ID');
    }

    if (setFirstTime) {
        await secureStorage.setItem('IS_FIRST_TIME', 'true');
        dispatch(changeFirstTime(true));
    }

    dispatch(saveUserData(user));
    dispatch(saveAuthToken(token));
    dispatch(saveRefreshToken(refresh));
    dispatch(setSelectedChild(selectedChild));
};

/** @deprecated Prefer `loginSessionAction` with full user + tokens. */
export const loginAction = (userData: AuthUser, accessToken?: string, refreshToken?: string) => {
    const fromArg = String(accessToken ?? '')
        .replace(/^Bearer\s+/i, '')
        .trim();
    const fromUser =
        typeof userData?.token === 'string'
            ? userData.token.replace(/^Bearer\s+/i, '').trim()
            : '';
    const token = fromArg || fromUser;
    if (!token) {
        return;
    }

    void loginSessionAction({
        user: userData,
        accessToken: token,
        refreshToken: refreshToken ?? '',
        selectedChild: null,
        setFirstTime: true,
    });
};

/** Updates active child in Redux + secure storage (does not clear auth session). */
export const persistSelectedChildAction = async (child: SelectedChildUser | null) => {
    if (child == null) {
        await secureStorage.removeItem('SELECTED_CHILD');
        await secureStorage.removeItem('SELECTED_CHILD_ID');
        dispatch(setSelectedChild(null));
        return;
    }
    await secureStorage.setObject('SELECTED_CHILD', child);
    const cid = String(child._id ?? child.id ?? '').trim();
    if (cid) {
        await secureStorage.setItem('SELECTED_CHILD_ID', cid);
    } else {
        await secureStorage.removeItem('SELECTED_CHILD_ID');
    }
    dispatch(setSelectedChild(child));
};

export const mergeAuthUserFromApi = async (partialUser: AuthUser) => {
    const prev = store.getState().auth.userData;
    const merged: AuthUser = { ...prev, ...partialUser };
    await secureStorage.setItem('USER_DATA', JSON.stringify(merged));
    dispatch(saveUserData(merged));
};

/** Updates access token in secure storage + Redux (e.g. OTP login without user payload). */
export const persistAccessTokenOnly = async (accessToken: string) => {
    const t = String(accessToken ?? '').trim();
    if (!t) {
        return;
    }
    await secureStorage.setItem('AUTH_TOKEN', t);
    dispatch(saveAuthToken(t));
};

export const hydrateAuthFromSecureStorage = async () => {
    const token = await secureStorage.getItem('AUTH_TOKEN');
    if (!token) {
        return;
    }
    const userRaw = await secureStorage.getItem('USER_DATA');
    const refresh = (await secureStorage.getItem('REFRESH_TOKEN')) ?? '';
    const selectedRaw = await secureStorage.getItem('SELECTED_CHILD');
    const selectedIdRaw = await secureStorage.getItem('SELECTED_CHILD_ID');

    let userData: AuthUser = {};
    try {
        userData = userRaw ? (JSON.parse(userRaw) as AuthUser) : {};
    } catch {
        userData = {};
    }

    let selectedChild: SelectedChildUser | null = null;
    try {
        selectedChild = selectedRaw ? (JSON.parse(selectedRaw) as SelectedChildUser) : null;
    } catch {
        selectedChild = null;
    }

    const fromChild =
        selectedChild && typeof selectedChild === 'object'
            ? String(selectedChild._id ?? selectedChild.id ?? '').trim()
            : '';
    const fromIdKey = selectedIdRaw?.trim() ?? '';
    const selectedChildId = fromIdKey || fromChild || null;

    dispatch(
        hydrateAuth({
            userData,
            auth_token: token,
            refresh_token: refresh,
            selectedChild,
            selectedChildId,
        }),
    );
};

export const clearDataAction = async () => {
    await secureStorage.clearAll();
    await secureStorage.setItem('IS_FIRST_TIME', 'false');
    dispatch(clearData());
};
