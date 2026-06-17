import { ImageSourcePropType } from 'react-native';

import { localImages } from '@/assets/images';

export type OnboardingSlide = {
    id: string;
    image: ImageSourcePropType;
    titleKey: string;
    descriptionKey: string;
};

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
    {
        id: '1',
        image: localImages.onboarding1,
        titleKey: 'onboarding.slide1Title',
        descriptionKey: 'onboarding.slide1Description',
    },
    {
        id: '2',
        image: localImages.onboarding2,
        titleKey: 'onboarding.slide2Title',
        descriptionKey: 'onboarding.slide2Description',
    },
    {
        id: '3',
        image: localImages.onboarding3,
        titleKey: 'onboarding.slide3Title',
        descriptionKey: 'onboarding.slide3Description',
    },
];
