import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const employees = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Ethan',
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CarMech Timesheet</Text>

      {employees.map((name) => (
        <View key={name} style={styles.buttonContainer}>
          <Button
            title={`Clock In/Out - ${name}`}
            onPress={() => navigation.navigate('Clock', { name })}
          />
          <View style={{ marginTop: 5 }} />
          <Button
            title={`View Timesheet - ${name}`}
            onPress={() => navigation.navigate('Timesheet', { name })}
            color="#444"
          />
        </View>
      ))}

      <View style={styles.owner}>
        <Button
          title="Owner: View All Timesheets"
          onPress={() => navigation.navigate('Timesheet', { name: 'ALL' })}
          color="green"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  buttonContainer: { marginBottom: 20 },
  owner: { marginTop: 40, borderTopWidth: 1, paddingTop: 20 },
});