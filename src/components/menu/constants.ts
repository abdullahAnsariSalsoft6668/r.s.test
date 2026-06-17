export type MenuFeatureItem = {
    id: string;
    title: string;
    subtitle: string;
    emoji: string;
    route?: 'insights' | 'helpHowItWorks' | 'privacyFirst' | 'supportedStores';
};

export const MENU_FEATURES: MenuFeatureItem[] = [
    {
        id: 'stores',
        title: 'Supported Stores',
        subtitle: '28+ supermarkets covered',
        emoji: '🏪',
        route: 'supportedStores',
    },
    {
        id: 'privacy',
        title: 'Privacy First',
        subtitle: 'No data collected, ever',
        emoji: '🛡️',
        route: 'privacyFirst',
    },
    {
        id: 'insights',
        title: 'Savings Insights',
        subtitle: 'Your saving analytics',
        emoji: '🪙',
        route: 'insights',
    },
    {
        id: 'help',
        title: 'Help & FAQs',
        subtitle: 'How the app works',
        emoji: '❓',
        route: 'helpHowItWorks',
    },
];

export const MENU_ACTIONS = [
    { id: 'share', label: 'Share App', emoji: '↪️' },
    { id: 'rate', label: 'Rate Us', emoji: '⭐' },
] as const;
