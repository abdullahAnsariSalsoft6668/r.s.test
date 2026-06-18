import { MMKV_KEYS, SECURE_KEYS } from "@/storage/keys";

export type ThemeMode = 'light' | 'dark';
export type Language = "en" | "ur" | "ur-roman";
export type StorageKey = keyof typeof MMKV_KEYS | keyof typeof SECURE_KEYS;

declare module '*.svg' {
    import type React from 'react';
    import type { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}
