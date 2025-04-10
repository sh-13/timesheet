import { StyleSheet } from 'react-native';

const homeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    grid: {
        justifyContent: 'space-between'
    },
    tile: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 16,
        elevation: 2,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    name: {
        fontSize: 16,
        fontWeight: '600'
    },
});

export default homeScreenStyles;