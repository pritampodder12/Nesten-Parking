import { StyleSheet } from 'react-native';
import { Constants } from '../../utils/Constants';
import { Help } from '../../utils/Help';

export const styles = StyleSheet.create({
    detailGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    noBookingsText: { alignSelf: 'center', fontSize: Help.normalize(28) },
    footerContainer: {
        flexDirection: 'row',
        paddingVertical: 20
    },
    headerContainer: {
        padding: 15
    },
    container: { marginHorizontal: Help.normalize(30), borderRadius: 10, marginVertical: 15 },
    image: { height: 100, width: 100, resizeMode: 'cover', borderRadius: 10 },
    cardHeader: {
        flexDirection: 'row', justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    content: { flex: 1, justifyContent: 'space-between' },
    timeText: { padding: 10, borderRadius: 7, color: Constants.colors.white },
    locationIcon: { height: 20, width: 20, marginBottom: -5, marginRight: 8, marginLeft: -4 },
    footer: { flex: 1, alignItems: 'center' }
})