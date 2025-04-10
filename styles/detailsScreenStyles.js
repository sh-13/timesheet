import { StyleSheet } from "react-native";

const detailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    name: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    inTime: {
        marginVertical: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    timesheetEntry: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#eee',
        borderRadius: 8
    },
    entryText: {
        fontWeight: 'bold'
    },
    role: {
        fontSize: 18,
        marginBottom: 20,
        color: 'gray',
    },
    buttonContainer: {
        marginBottom: 20,
    },
});

export default detailsStyles;