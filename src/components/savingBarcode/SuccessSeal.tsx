import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { palette } from '@/styles/palette';
import { moderateScale } from '@/styles/scaling';

const SEAL_PATH =
    'M48 8 L52.8 22.4 L68 22.4 L56 31.6 L60.8 46 L48 37.6 L35.2 46 L40 31.6 L28 22.4 L43.2 22.4 Z';

const SuccessSeal: React.FC = () => (
    <View style={styles.wrap}>
        <Svg width={moderateScale(96)} height={moderateScale(96)} viewBox="0 0 96 96">
            <Path d={SEAL_PATH} fill={palette.green.main} />
            <Path
                d="M34 48 L44 58 L64 38"
                stroke="#FFFFFF"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    </View>
);

const styles = StyleSheet.create({
    wrap: {
        alignSelf: 'center',
        marginBottom: moderateScale(16),
    },
});

export default SuccessSeal;
