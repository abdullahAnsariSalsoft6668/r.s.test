import { moderateScale } from '@/styles/scaling';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(8),
        paddingBottom: moderateScale(100),
    },
    quickActions: {
        flexDirection: 'row',
        gap: moderateScale(10),
    },
});

export default styles;
