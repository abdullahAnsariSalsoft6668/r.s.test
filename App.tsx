/**
 * @file App.tsx
 * @description Root application component that initializes core app functionality
 * including Redux store, navigation, and native splash (react-native-splash-screen).
 */
import '@/lang';
import ErrorBoundary from '@/components/ErrorBoundary';
import { requestUserPermission } from '@/helper/notifciationService';
import Routes from '@/navigation/Routes';
import store from '@/redux/store';
import { getLocalItem } from '@/utils/checkStorage';
import { ThemeProvider } from '@/context/ThemeContext';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { appToastConfig } from '@/components/AppToastConfig';
import Toast from 'react-native-toast-message';

/**
 * Main application component that serves as the entry point for the app.
 *
 * @returns {JSX.Element} The rendered app
 */
const App = () => {
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await getLocalItem();
        // Defer notification setup so Firebase native app can initialize first
        await new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 100);
        });
        await requestUserPermission();
      } finally {
        setIsStorageReady(true);
        SplashScreen.hide();
      }
    };

    init();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider>
            <ErrorBoundary>
              {isStorageReady ? <Routes /> : null}
              <Toast
                config={appToastConfig}
                position="top"
                visibilityTime={3800}
                topOffset={52}
                swipeable
              />
            </ErrorBoundary>
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
