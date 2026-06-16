import type { IconName } from '@/components/MyIcons';

export type OrbSize = 'lg' | 'md' | 'sm';

export type EntranceFrom = 'top' | 'bottom' | 'left' | 'right';

export type CollageOrbConfig = {
  id: string;
  iconName: IconName;
  iconColor: string;
  backgroundColor: string;
  size: OrbSize;
  /** Horizontal center of orb, 0–100 (% of collage width) */
  leftPct: number;
  /** Vertical center of orb, 0–100 (% of collage height) */
  topPct: number;
  zIndex: number;
  from: EntranceFrom;
  /** Order in stagger sequence (0 = first) */
  staggerIndex: number;
};

/** Floating finance icons around the RizqShare hero mockup */
export const COLLAGE_ORB_CONFIG: CollageOrbConfig[] = [
  {
    id: 'home',
    iconName: 'tabHomeActive',
    iconColor: '#2D5A27',
    backgroundColor: '#E8F5E6',
    size: 'md',
    leftPct: 12,
    topPct: 22,
    zIndex: 6,
    from: 'left',
    staggerIndex: 0,
  },
  {
    id: 'transactions',
    iconName: 'transactionActive',
    iconColor: '#2D5A27',
    backgroundColor: '#E8F5E6',
    size: 'sm',
    leftPct: 88,
    topPct: 18,
    zIndex: 5,
    from: 'right',
    staggerIndex: 1,
  },
  {
    id: 'dashboard',
    iconName: 'dashboardActive',
    iconColor: '#2D5A27',
    backgroundColor: '#FEF9C3',
    size: 'sm',
    leftPct: 8,
    topPct: 48,
    zIndex: 4,
    from: 'left',
    staggerIndex: 2,
  },
  {
    id: 'donate',
    iconName: 'bankTransfer',
    iconColor: '#CA8A04',
    backgroundColor: '#FEF3C7',
    size: 'md',
    leftPct: 92,
    topPct: 42,
    zIndex: 7,
    from: 'right',
    staggerIndex: 3,
  },
  {
    id: 'income',
    iconName: 'upArrow',
    iconColor: '#2D5A27',
    backgroundColor: '#E8F5E6',
    size: 'sm',
    leftPct: 18,
    topPct: 72,
    zIndex: 3,
    from: 'bottom',
    staggerIndex: 4,
  },
  {
    id: 'expense',
    iconName: 'downArrow',
    iconColor: '#DC2626',
    backgroundColor: '#FEE2E2',
    size: 'sm',
    leftPct: 82,
    topPct: 68,
    zIndex: 8,
    from: 'bottom',
    staggerIndex: 5,
  },
  {
    id: 'notifications',
    iconName: 'tabNotificationActive',
    iconColor: '#2D5A27',
    backgroundColor: '#E8F5E6',
    size: 'sm',
    leftPct: 50,
    topPct: 12,
    zIndex: 2,
    from: 'top',
    staggerIndex: 6,
  },
  {
    id: 'profile',
    iconName: 'userIcon',
    iconColor: '#2D5A27',
    backgroundColor: '#E8F5E6',
    size: 'sm',
    leftPct: 72,
    topPct: 78,
    zIndex: 9,
    from: 'bottom',
    staggerIndex: 7,
  },
];

export const STAGGER_STEP_MS = 58;
export const ORB_ANIMATION_DURATION_MS = 700;
