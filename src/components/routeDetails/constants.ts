import type { RouteDetailsData } from './types';

export const ROUTE_DETAILS_BG = '#001533';
export const ROUTE_GRADIENT_GLOW = '#003380';
export const ROUTE_GRADIENT_MID = '#002366';

export const MARK_COMPLETE_GRADIENT = ['#1B6B45', '#0D3D28'] as const;
export const COMPLETE_ROUTE_GRADIENT = ['#145C38', '#0A3A24'] as const;
export const ROUTE_PROGRESS_GRADIENT = ['#A30000', '#5C0000'] as const;

export const ENTRANCE_BASE = 100;
export const ENTRANCE_STEP = 55;

export const MOCK_ROUTE_DETAILS: RouteDetailsData = {
    id: 'route-a',
    name: 'Route A - Downtown',
    date: '4/27/2026',
    timeRange: '06:00 AM - 02:00 PM',
    instructions:
        'Priority delivery route. Handle packages with care. Contact dispatch for any delays.',
    completedStops: 3,
    totalStops: 6,
    progress: 0.5,
    stops: [
        {
            id: 'stop-1',
            name: 'Central Hub',
            address: '123 Main Street, Downtown',
            time: '06:00 AM',
            status: 'completed',
        },
        {
            id: 'stop-2',
            name: 'North Terminal',
            address: '456 Oak Avenue, North District',
            time: '08:30 AM',
            status: 'completed',
        },
        {
            id: 'stop-3',
            name: 'Plaza Building',
            address: '789 Commerce Blvd, Downtown',
            time: '10:15 AM',
            status: 'current',
        },
        {
            id: 'stop-4',
            name: 'City Center',
            address: '321 Market Street, Downtown',
            time: '12:00 PM',
            status: 'pending',
        },
        {
            id: 'stop-5',
            name: 'East Warehouse',
            address: '654 Industrial Way, East Side',
            time: '02:00 PM',
            status: 'pending',
        },
        {
            id: 'stop-6',
            name: 'South Depot',
            address: '987 Logistics Lane, South District',
            time: '04:30 PM',
            status: 'pending',
        },
    ],
};
