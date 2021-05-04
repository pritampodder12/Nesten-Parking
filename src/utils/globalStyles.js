import { StyleSheet } from 'react-native';
import { Constants } from './Constants';

export const globalStyles = StyleSheet.create({
    primaryButton: {
        width: '100%',
        borderRadius: 6
    },
    authInput: {
        fontSize: 16
    },
    authInputLabel: {
        marginLeft: 20,
        fontSize: 13,
        marginBottom: 10
    },
    linkButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    authContainer: {
        flexGrow: 1,
        padding: 42
    },
    authHeader: {
        fontFamily: 'PlayfairDisplay-ExtraBold',
        marginLeft: 20
    },
    authLinkButton: { alignSelf: 'flex-end', paddingHorizontal: 0 }
})