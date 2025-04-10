import { StyleSheet } from "react-native";

const timesheetScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    entry: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#eee',
        borderRadius: 8
    },
    entryText: {
        fontWeight: 'bold'
    },
});

export default timesheetScreenStyles;