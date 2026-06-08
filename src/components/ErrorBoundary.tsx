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
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';
import { brittiSans, nasalization, plusJakarta } from '@/assets/fonts';
import { Colors } from '@/styles/colors';
import { moderateScale } from '@/styles/scaling';
import { borders } from '@/styles/sizes';

const BORDER_WIDTH = moderateScale(2);
const ICON_PANEL_RATIO = 0.2;
const BUTTON_HEIGHT = moderateScale(56);
const BUTTON_RADIUS = borders.button ?? moderateScale(14);

const FILL_GRADIENT = [
  Colors.buttonSplitFillStart,
  Colors.buttonSplitFillMid,
  Colors.buttonSplitFillEnd,
] as const;

const BORDER_GRADIENT = [...Colors.buttonSplitBorderGradient];

const ErrorIcon = () => (
  <Animated.View
    style={iconStyles.wrapper}
    entering={FadeInDown.duration(450).delay(0).springify()}
  >
    <Svg width={moderateScale(72)} height={moderateScale(72)} viewBox="0 0 72 72">
      <Circle
        cx="36"
        cy="36"
        r="30"
        stroke={Colors.buttonSplitFillMid}
        strokeWidth={2}
        fill="rgba(255,255,255,0.06)"
      />
      <Path
        d="M36 22v18"
        stroke={Colors.white}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Circle cx="36" cy="50" r="2.5" fill={Colors.white} />
    </Svg>
  </Animated.View>
);

const ArrowRightIcon = ({ size = moderateScale(16), color = Colors.buttonSplitIconStroke }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 19V9h9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 9l5 5-5 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HelpIcon = ({ size = 18, color = Colors.buttonSplitFillMid }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.5} fill="none" />
    <Path
      d="M9.5 9.5c0-1.2 1-2 2.5-2s2.5.8 2.5 2c0 1.5-1.5 1.8-2 2.2v.8M12 15.5h.01"
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
    />
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
    accessibilityLabel="Retry loading"
  >
    <LinearGradient
      colors={BORDER_GRADIENT}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={buttonStyles.borderShell}
    >
      <View style={buttonStyles.splitInner}>
        <LinearGradient
          colors={[...FILL_GRADIENT]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={buttonStyles.fillSection}
        >
          <Text style={buttonStyles.label}>RETRY LOADING</Text>
        </LinearGradient>
        <View style={buttonStyles.divider} />
        <View style={buttonStyles.iconPanel}>
          <ArrowRightIcon />
        </View>
      </View>
    </LinearGradient>
  </Pressable>
);

const iconStyles = StyleSheet.create({
  wrapper: {
    width: moderateScale(80),
    height: moderateScale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const buttonStyles = StyleSheet.create({
  root: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: BUTTON_RADIUS,
  },
  pressed: {
    opacity: 0.88,
  },
  borderShell: {
    padding: BORDER_WIDTH,
    borderRadius: BUTTON_RADIUS,
  },
  splitInner: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    minHeight: BUTTON_HEIGHT - BORDER_WIDTH * 2,
    borderRadius: BUTTON_RADIUS - BORDER_WIDTH,
    overflow: 'hidden',
  },
  fillSection: {
    flex: 1 - ICON_PANEL_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(24),
  },
  label: {
    fontFamily: brittiSans.semiBold,
    fontSize: moderateScale(16),
    color: Colors.buttonSplitLabel,
    letterSpacing: moderateScale(1.2),
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    minWidth: 1,
    backgroundColor: Colors.buttonSplitDivider,
    alignSelf: 'stretch',
  },
  iconPanel: {
    flex: ICON_PANEL_RATIO,
    backgroundColor: Colors.buttonSplitIconBackground,
    justifyContent: 'center',
    alignItems: 'center',
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
    const email = this.props.supportEmail ?? 'support@example.com';
    Linking.openURL(`mailto:${email}`).catch(() => {});
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <Animated.View
          style={[styles.container, styles.aboveSplash]}
          entering={FadeIn.duration(300)}
        >
          <View style={styles.content}>
            <ErrorIcon />
            <Animated.View entering={FadeInDown.duration(400).delay(80).springify()}>
              <Text style={styles.title}>SOMETHING WENT WRONG</Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(400).delay(160).springify()}>
              <Text style={styles.message}>
                We are having trouble loading your data. Please check your connection or try again later.
              </Text>
            </Animated.View>
            <Animated.View
              style={styles.buttonWrap}
              entering={FadeInDown.duration(400).delay(280).springify()}
            >
              <RetryButton onPress={this.handleRetry} />
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(400).delay(360).springify()}>
              <Pressable
                style={styles.supportLink}
                onPress={this.handleContactSupport}
                accessibilityRole="button"
                accessibilityLabel="Contact support"
              >
                <HelpIcon size={moderateScale(18)} color={Colors.buttonSplitFillMid} />
                <Text style={styles.supportLinkText}>Need help? Contact support</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Animated.View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.onboardingNavy,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(40),
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
  content: {
    maxWidth: 340,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: nasalization.regular,
    color: Colors.white,
    letterSpacing: moderateScale(1.5),
    marginTop: moderateScale(24),
    marginBottom: moderateScale(12),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  message: {
    fontSize: moderateScale(14),
    fontFamily: plusJakarta.regular,
    color: Colors.gray200,
    marginBottom: moderateScale(28),
    textAlign: 'center',
    lineHeight: moderateScale(22),
    opacity: 0.85,
  },
  buttonWrap: {
    width: '100%',
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(28),
    gap: moderateScale(8),
  },
  supportLinkText: {
    fontSize: moderateScale(14),
    fontFamily: plusJakarta.bold,
    color: Colors.buttonSplitFillMid,
    textDecorationLine: 'underline',
  },
});

export default ErrorBoundary;
