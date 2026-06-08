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
    filters: {
        paddingBottom: moderateScale(16),
    },
    list: {
        marginTop: moderateScale(4),
    },
});

export default styles;
