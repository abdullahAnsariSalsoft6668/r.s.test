import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import TextComp from '@/components/TextComp';
import { plusJakarta } from '@/assets/fonts';
import { palette } from '@/styles/palette';
import { theme } from '@/styles/theme';
import { moderateScale } from '@/styles/scaling';

const BARCODE_LINES = [
    2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2,
] as const;

type BarcodeVisualProps = {
    code: string;
};

const BarcodeVisual: React.FC<BarcodeVisualProps> = ({ code }) => (
    <View style={styles.wrap}>
        <Svg width="100%" height={moderateScale(80)} viewBox="0 0 280 80">
            {BARCODE_LINES.reduce<{ x: number; nodes: React.ReactNode[] }>(
                (acc, width, index) => {
                    const rect = (
                        <Rect
                            key={`bar-${index}`}
                            x={acc.x}
                            y={10}
                            width={width * 2.2}
                            height={60}
                            fill={palette.neutral.text}
                        />
                    );
                    return {
                        x: acc.x + width * 2.2 + 2.4,
                        nodes: [...acc.nodes, rect],
                    };
                },
                { x: 4, nodes: [] },
            ).nodes}
        </Svg>
        <TextComp text={code} style={styles.code} />
    </View>
);

const styles = StyleSheet.create({
    wrap: {
        borderWidth: 1,
        borderColor: palette.neutral.gray100,
        borderRadius: moderateScale(14),
        backgroundColor: theme.colors.card.background,
        paddingVertical: moderateScale(14),
        paddingHorizontal: moderateScale(10),
        alignItems: 'center',
    },
    code: {
        marginTop: moderateScale(10),
        fontFamily: plusJakarta.bold,
        fontSize: moderateScale(12),
        letterSpacing: moderateScale(1.2),
        color: theme.colors.text.secondary,
    },
});

export default BarcodeVisual;
