import { Colors } from '@/styles/colors';

export type ShimmerPalette = 'childProfile' | 'onWhite';
export type ShimmerVariant = 'surface' | 'card' | 'onCard' | 'inverse';

const LIGHT_SHIMMER: Record<ShimmerVariant, readonly [string, string, string]> = {
    surface: ['#EEF2F0', '#D5DDD9', '#EEF2F0'],
    card: ['#F7FAF9', '#E4EBE8', '#F7FAF9'],
    onCard: ['#E4EBE8', '#CDD8D3', '#E4EBE8'],
    inverse: ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.25)'],
};

const DARK_SHIMMER: Record<ShimmerVariant, readonly [string, string, string]> = {
    surface: ['#1A2420', '#2E3A36', '#1A2420'],
    card: ['#242E2A', '#3A4642', '#242E2A'],
    onCard: ['#2E3A36', '#45524D', '#2E3A36'],
    inverse: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.28)', 'rgba(255,255,255,0.12)'],
};

/** RizqShare theme shimmer stops for `react-native-shimmer-placeholder`. */
export function getThemedShimmerColors(
    isDark: boolean,
    variant: ShimmerVariant = 'surface',
): string[] {
    const palette = isDark ? DARK_SHIMMER : LIGHT_SHIMMER;
    return [...palette[variant]];
}

/** Legacy shimmer stops for older grocery screens. */
export function getShimmerColors(palette: ShimmerPalette = 'childProfile'): string[] {
    switch (palette) {
        case 'onWhite':
            return [...Colors.shimmerOnWhite];
        case 'childProfile':
        default:
            return [...Colors.shimmerChildProfile];
    }
}
