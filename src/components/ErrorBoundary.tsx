/**
 * @file ErrorBoundary.tsx
 * @description Error boundary that catches JavaScript errors and shows a RizqShare-themed fallback.
 */

import React, { Component, ErrorInfo, ReactNode, useMemo } from 'react';
import {
  I18nManager,
  Linking,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { plusJakarta } from '@/assets/fonts';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/styles/createAppTheme';
import { moderateScale } from '@/styles/scaling';
type ErrorFallbackProps = {
  onRetry: () => void;
  onContactSupport: () => void;
};

const createFallbackStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.header,
    },
    aboveSplash: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 9999,
      ...(Platform.OS === 'android' && { elevation: 9999 }),
    },
    contentShell: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(40),
    },
    card: {
      width: '100%',
      maxWidth: 360,
      alignSelf: 'center',
      backgroundColor: theme.colors.card.background,
      borderRadius: theme.radius.xl,
      paddingHorizontal: moderateScale(24),
      paddingTop: moderateScale(28),
      paddingBottom: moderateScale(24),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border.subtle,
      ...theme.shadows.card,
    },
    iconRing: {
      width: moderateScale(72),
      height: moderateScale(72),
      borderRadius: moderateScale(36),
      backgroundColor: theme.palette.emerald.surface,
      borderWidth: 1,
      borderColor: theme.colors.border.default,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: moderateScale(16),
    },
    iconGlyph: {
      fontSize: moderateScale(34),
    },
    title: {
      fontSize: moderateScale(22),
      fontFamily: plusJakarta.bold,
      color: theme.colors.text.primary,
      marginBottom: moderateScale(10),
      textAlign: 'center',
    },
    message: {
      fontSize: moderateScale(14),
      fontFamily: plusJakarta.regular,
      color: theme.colors.text.secondary,
      marginBottom: moderateScale(24),
      textAlign: 'center',
      lineHeight: moderateScale(22),
    },
    buttonWrap: {
      width: '100%',
    },
    retryButton: {
      width: '100%',
      borderRadius: theme.radius.button,
      overflow: 'hidden',
    },
    retryGradient: {
      minHeight: moderateScale(52),
      borderRadius: theme.radius.button,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: moderateScale(24),
    },
    retryLabel: {
      fontFamily: plusJakarta.bold,
      fontSize: moderateScale(16),
      color: theme.colors.text.inverse,
      textAlign: 'center',
    },
    supportLink: {
      flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: moderateScale(20),
      gap: moderateScale(8),
    },
    supportLinkText: {
      fontSize: moderateScale(14),
      fontFamily: plusJakarta.bold,
      color: theme.colors.brand.primary,
    },
  });

const ErrorFallbackUI: React.FC<ErrorFallbackProps> = ({ onRetry, onContactSupport }) => {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => createFallbackStyles(theme), [theme]);

  return (
    <View style={[styles.container, styles.aboveSplash]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background.header}
      />
      <LinearGradient
        colors={[...theme.gradients.header]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      <View style={styles.contentShell}>
        <View style={styles.card}>
          <View style={styles.iconRing}>
            <Text style={styles.iconGlyph}>{isDark ? '🌙' : '⚠️'}</Text>
          </View>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            We had trouble loading this screen. Please check your connection and try again.
          </Text>
          <View style={styles.buttonWrap}>
            <Pressable
              onPress={onRetry}
              style={({ pressed }) => [styles.retryButton, pressed && { opacity: 0.92 }]}
              accessibilityRole="button"
              accessibilityLabel="Try again"
            >
              <LinearGradient
                colors={[theme.colors.brand.primary, theme.colors.brand.primaryDark]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.retryGradient}
              >
                <Text style={styles.retryLabel}>Try Again</Text>
              </LinearGradient>
            </Pressable>
          </View>
          <Pressable
            style={styles.supportLink}
            onPress={onContactSupport}
            accessibilityRole="button"
            accessibilityLabel="Contact support"
          >
            <Text style={styles.supportLinkText}>Need help? Contact support</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  supportEmail?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidMount(): void {
    this.setupGlobalHandler();
  }

  componentWillUnmount(): void {
    this.restoreGlobalHandler();
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private previousGlobalHandler: ((error: unknown, isFatal?: boolean) => void) | null = null;

  private setupGlobalHandler = (): void => {
    const ErrorUtils = (globalThis as { ErrorUtils?: { setGlobalHandler: (handler: (error: unknown, isFatal?: boolean) => void) => void; getGlobalHandler?: () => (error: unknown, isFatal?: boolean) => void } }).ErrorUtils;
    if (!ErrorUtils?.setGlobalHandler) return;
    this.previousGlobalHandler = ErrorUtils.getGlobalHandler?.() ?? null;
    ErrorUtils.setGlobalHandler((error: unknown, isFatal?: boolean) => {
      const err = error instanceof Error ? error : new Error(String(error));
      this.setState({ hasError: true, error: err });
      this.props.onError?.(err, { componentStack: '' });
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary (global handler):', err, isFatal);
      }
    });
  };

  private restoreGlobalHandler = (): void => {
    const ErrorUtils = (globalThis as { ErrorUtils?: { setGlobalHandler: (handler: (error: unknown, isFatal?: boolean) => void) => void } }).ErrorUtils;
    if (ErrorUtils?.setGlobalHandler && this.previousGlobalHandler) {
      ErrorUtils.setGlobalHandler(this.previousGlobalHandler);
    }
  };

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleContactSupport = (): void => {
    const email = this.props.supportEmail ?? 'support@rizqshare.com';
    Linking.openURL(`mailto:${email}`).catch(() => {});
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorFallbackUI
          onRetry={this.handleRetry}
          onContactSupport={this.handleContactSupport}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
