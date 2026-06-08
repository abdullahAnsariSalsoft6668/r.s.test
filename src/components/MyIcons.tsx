/**
 * ⚠️ AUTO-GENERATED FILE
 * DO NOT EDIT MANUALLY By Abdullah Ansari
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import BankTransfer from '@/assets/icons/bank-transfer.svg';
import Bell from '@/assets/icons/bell.svg';
import ButtonEnter from '@/assets/icons/button-enter.svg';
import Close from '@/assets/icons/close.svg';
import Counting from '@/assets/icons/counting.svg';
import CryptoWallet from '@/assets/icons/crypto-wallet.svg';
import DashboardActive from '@/assets/icons/dashboard-active.svg';
import Dashboard from '@/assets/icons/dashboard.svg';
import DateIcon from '@/assets/icons/date-icon.svg';
import DownArrow from '@/assets/icons/down-arrow.svg';
import DownTiltArrow from '@/assets/icons/down-tilt-arrow.svg';
import Down from '@/assets/icons/down.svg';
import Fail from '@/assets/icons/fail.svg';
import Filter from '@/assets/icons/filter.svg';
import HomeActive from '@/assets/icons/home-active.svg';
import Home from '@/assets/icons/home.svg';
import Notification from '@/assets/icons/notification.svg';
import Placeholder from '@/assets/icons/placeholder.svg';
import RightArrow from '@/assets/icons/right-arrow.svg';
import Success from '@/assets/icons/success.svg';
import SupportActive from '@/assets/icons/support-active.svg';
import Support from '@/assets/icons/support.svg';
import TabClockActive from '@/assets/icons/tab-clock-active.svg';
import TabClock from '@/assets/icons/tab-clock.svg';
import TabExtraActive from '@/assets/icons/tab-extra-active.svg';
import TabExtra from '@/assets/icons/tab-extra.svg';
import TabHomeActive from '@/assets/icons/tab-home-active.svg';
import TabHome from '@/assets/icons/tab-home.svg';
import TabNotificationActive from '@/assets/icons/tab-notification-active.svg';
import TabNotification from '@/assets/icons/tab-notification.svg';
import Time from '@/assets/icons/time.svg';
import TransactionActive from '@/assets/icons/transaction-active.svg';
import Transaction from '@/assets/icons/transaction.svg';
import UpArrow from '@/assets/icons/up-arrow.svg';
import Up from '@/assets/icons/up.svg';
import User1 from '@/assets/icons/user-1.svg';
import User2 from '@/assets/icons/user-2.svg';
import UserIcon from '@/assets/icons/user-icon.svg';
import Win from '@/assets/icons/win.svg';

export type IconName =
  | 'bankTransfer'
  | 'bell'
  | 'buttonEnter'
  | 'close'
  | 'counting'
  | 'cryptoWallet'
  | 'dashboardActive'
  | 'dashboard'
  | 'dateIcon'
  | 'downArrow'
  | 'downTiltArrow'
  | 'down'
  | 'fail'
  | 'filter'
  | 'homeActive'
  | 'home'
  | 'notification'
  | 'placeholder'
  | 'rightArrow'
  | 'success'
  | 'supportActive'
  | 'support'
  | 'tabClockActive'
  | 'tabClock'
  | 'tabExtraActive'
  | 'tabExtra'
  | 'tabHomeActive'
  | 'tabHome'
  | 'tabNotificationActive'
  | 'tabNotification'
  | 'time'
  | 'transactionActive'
  | 'transaction'
  | 'upArrow'
  | 'up'
  | 'user1'
  | 'user2'
  | 'userIcon'
  | 'win';

type IconComponent = React.FC<SvgProps>;

const iconMap: Record<IconName, IconComponent> = {
  bankTransfer: BankTransfer,
  bell: Bell,
  buttonEnter: ButtonEnter,
  close: Close,
  counting: Counting,
  cryptoWallet: CryptoWallet,
  dashboardActive: DashboardActive,
  dashboard: Dashboard,
  dateIcon: DateIcon,
  downArrow: DownArrow,
  downTiltArrow: DownTiltArrow,
  down: Down,
  fail: Fail,
  filter: Filter,
  homeActive: HomeActive,
  home: Home,
  notification: Notification,
  placeholder: Placeholder,
  rightArrow: RightArrow,
  success: Success,
  supportActive: SupportActive,
  support: Support,
  tabClockActive: TabClockActive,
  tabClock: TabClock,
  tabExtraActive: TabExtraActive,
  tabExtra: TabExtra,
  tabHomeActive: TabHomeActive,
  tabHome: TabHome,
  tabNotificationActive: TabNotificationActive,
  tabNotification: TabNotification,
  time: Time,
  transactionActive: TransactionActive,
  transaction: Transaction,
  upArrow: UpArrow,
  up: Up,
  user1: User1,
  user2: User2,
  userIcon: UserIcon,
  win: Win,
};

export interface MyIconsProps {
  name: IconName;
  size?: number;
  stroke?: string;
  fill?: string;
  style?: ViewStyle;
}

const MyIcons: React.FC<MyIconsProps> = ({
  name,
  size = 20,
  stroke,
  fill = 'none',
  style,
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`[MyIcons] Icon "${name}" not found`);
    return null;
  }

  return (
    <View style={style}>
      <IconComponent
        width={size}
        height={size}
        stroke={stroke || undefined}
        fill={fill}
      />
    </View>
  );
};

export { iconMap };
export default MyIcons;
