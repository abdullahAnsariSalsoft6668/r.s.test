import { Colors } from '@/styles/colors';
import fontFamily from '@/styles/fontFamily';
import { moderateScale } from '@/styles/scaling';
import { spaces } from '@/styles/sizes';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkBackground: {
        flex: 1,
        backgroundColor: Colors.onboardingNavy,
    },
    header: {
        paddingHorizontal: spaces.medium,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spaces.medium,
        paddingBottom: moderateScale(40),
    },
    inputWrap: {
        marginBottom: moderateScale(20),
    },
    inputLabel: {
        color: Colors.white,
    },
    actionButton: {
        width: '100%',
        marginTop: moderateScale(8),
    },
});

export default styles;
