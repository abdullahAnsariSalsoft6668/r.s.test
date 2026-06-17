/**
 * @file ErrorBoundary.tsx
 * @description Error boundary component that catches JavaScript errors in the
 * child component tree and displays a fallback UI instead of crashing the app.
 * Uses only raw React Native components in the fallback so it cannot throw.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
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
import Svg, { Circle, Path } from 'react-native-svg';
import { plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';

const ERROR_BG = '#001533';
const ERROR_GLOW = '#003380';
const ERROR_MID = '#002366';
const RETRY_GRADIENT = ['#A30000', '#5C0000'] as const;
const ERROR_ACCENT = '#CD0105';

const GRADIENT_LAYER = {
  position: 'absolute' as const,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const ErrorIcon = () => (
  <View style={iconStyles.wrapper}>
    <View style={iconStyles.iconRing}>
      <Svg width={moderateScale(36)} height={moderateScale(36)} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 8v5M12 16.5h.01"
          stroke={ERROR_ACCENT}
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <Path
          d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          stroke={ERROR_ACCENT}
          strokeWidth={1.8}
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  </View>
);

const HelpIcon = ({ size = 18, color = Colors.secondary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.6} />
    <Path d="M12 10v5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Circle cx="12" cy="7.5" r="1" fill={color} />
  </Svg>
);

type RetryButtonProps = {
  onPress: () => void;
};

const RetryButton = ({ onPress }: RetryButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [buttonStyles.root, pressed && buttonStyles.pressed]}
    accessibilityRole="button"
    accessibilityLabel="Try again"
  >
    <LinearGradient
      colors={[...RETRY_GRADIENT]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={buttonStyles.gradient}
    >
      <Text style={buttonStyles.label}>Try Again</Text>
    </LinearGradient>
  </Pressable>
);

const iconStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(4),
  },
  iconRing: {
    width: moderateScale(72),
    height: moderateScale(72),
    borderRadius: moderateScale(36),
    backgroundColor: 'rgba(205, 1, 5, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(205, 1, 5, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const buttonStyles = StyleSheet.create({
  root: {
    width: '100%',
    borderRadius: moderateScale(14),
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  gradient: {
    minHeight: moderateScale(52),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
  },
  label: {
    fontFamily: plusJakarta.bold,
    fontSize: moderateScale(16),
    color: Colors.white,
    textAlign: 'center',
  },
});

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback when an error is caught */
  fallback?: ReactNode;
  /** Optional callback when an error is caught (e.g. for logging/crash reporting) */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Optional support email for "Contact support" link (default: support@example.com) */
  supportEmail?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary that catches errors in child components and shows a fallback UI.
 * Provides a "Try again" action to clear the error state and re-render children.
 * Fallback uses only View/Text/Pressable so it never throws (e.g. no context deps).
 */
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
    const ErrorUtils = (globalThis as any).ErrorUtils;
    if (!ErrorUtils?.setGlobalHandler) return;
    this.previousGlobalHandler = ErrorUtils.getGlobalHandler?.() ?? null;
    ErrorUtils.setGlobalHandler((error: unknown, isFatal?: boolean) => {
      const err = error instanceof Error ? error : new Error(String(error));
      this.setState({ hasError: true, error: err });
      this.props.onError?.(err, { componentStack: '' });
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary (global handler):', err);
      }
    });
  };

  private restoreGlobalHandler = (): void => {
    const ErrorUtils = (globalThis as any).ErrorUtils;
    if (ErrorUtils?.setGlobalHandler && this.previousGlobalHandler) {
      ErrorUtils.setGlobalHandler(this.previousGlobalHandler);
    }
  };

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleContactSupport = (): void => {
    const email = this.props.supportEmail ?? 'support@flystraight.com';
    Linking.openURL(`mailto:${email}`).catch(() => {});
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <View style={[styles.container, styles.aboveSplash]}>
          <StatusBar barStyle="light-content" backgroundColor={ERROR_BG} />
          <LinearGradient
            colors={['#00050a', ERROR_BG, '#00081a']}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={GRADIENT_LAYER}
            pointerEvents="none"
          />
          <LinearGradient
            colors={[ERROR_GLOW, ERROR_MID, 'transparent']}
            locations={[0, 0.45, 1]}
            start={{ x: 0.62, y: 0 }}
            end={{ x: 0.2, y: 0.9 }}
            style={GRADIENT_LAYER}
            pointerEvents="none"
          />

          <View style={styles.contentShell}>
            <View style={styles.card}>
              <ErrorIcon />
              <View>
                <Text style={styles.title}>Something went wrong</Text>
              </View>
              <View>
                <Text style={styles.message}>
                  We are having trouble loading your data. Please check your connection or try
                  again in a moment.
                </Text>
              </View>
              <View style={styles.buttonWrap}>
                <RetryButton onPress={this.handleRetry} />
              </View>
              <View>
                <Pressable
                  style={styles.supportLink}
                  onPress={this.handleContactSupport}
                  accessibilityRole="button"
                  accessibilityLabel="Contact support"
                >
                  <HelpIcon size={moderateScale(18)} color={Colors.secondary} />
                  <Text style={styles.supportLinkText}>Need help? Contact support</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ERROR_BG,
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
    backgroundColor: Colors.white,
    borderRadius: moderateScale(24),
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(28),
    paddingBottom: moderateScale(24),
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: moderateScale(22),
    fontFamily: plusJakarta.bold,
    color: Colors.text,
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  message: {
    fontSize: moderateScale(14),
    fontFamily: plusJakarta.regular,
    color: Colors.gray500,
    marginBottom: moderateScale(24),
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  buttonWrap: {
    width: '100%',
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
    color: Colors.secondary,
  },
});

export default ErrorBoundary;
