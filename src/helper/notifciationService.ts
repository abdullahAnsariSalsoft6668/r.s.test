import { mmkvStorage, secureStorage } from '@/storage';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { AuthorizationStatus, getMessaging, getToken, requestPermission } from '@react-native-firebase/messaging';

function getMessagingInstance(): FirebaseMessagingTypes.Module | null {
  try {
    return getMessaging();
  } catch (e) {
    console.warn('[notifciationService] Firebase not ready:', (e as Error).message);
    return null;
  }
}

const getFCMToken = async (messagingInstance: FirebaseMessagingTypes.Module) => {
  try {
    const cached = mmkvStorage.getItem('FCM_TOKEN');
    if (cached) {
      return cached;
    }
    const token = await getToken(messagingInstance);
    if (token) {
      mmkvStorage.setItem('FCM_TOKEN', token);
    }
    return token;
  } catch {
    return undefined;
  }
};

export async function requestUserPermission() {
  try {
    const messagingInstance = getMessagingInstance();
    if (!messagingInstance) return;

    const authStatus = await requestPermission(messagingInstance);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken(messagingInstance);
    }
  } catch (error) {
    console.warn('[notifciationService] requestUserPermission failed:', (error as Error).message);
  }
}
