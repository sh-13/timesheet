import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { getTimesheets, deleteAllTimesheets } from '../database/database';
import { formatTimestamp, calculateDuration } from '../assets/Utility';
import timesheetScreenStyles from '../styles/timesheetScreenStyles';

export default function TimesheetScreen({ route }) {
  const { name } = route.params;
  const [entries, setEntries] = useState([]);

  // Function to fetch timesheet data
  const fetchData = async () => {
    const data = await getTimesheets(name);
    setEntries(data);
  };

  useEffect(() => {
    fetchData();
  }, [name]);  // Re-fetch when the name (or screen) changes

  const handleDeleteAll = async () => {
    // Show a confirmation dialog before deleting
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete all timesheet data?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteAllTimesheets();  // Function to delete all records
            setEntries([]);  // Clear the local state immediately
            console.log('All timesheet data deleted!');
            fetchData();  // Re-fetch to confirm deletion on UI
          },
        },
      ]
    );
  };

  return (
    <View style={timesheetScreenStyles.container}>
      <Text style={timesheetScreenStyles.title}>
        {name === 'ALL' ? 'All Timesheets' : `${name}'s Timesheet`}
      </Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={timesheetScreenStyles.entry}>
            <Text style={timesheetScreenStyles.entryText}> 👷 {item.employee_name} </Text>
            <Text>🕐 In: {formatTimestamp(item.clock_in)}</Text>
            <Text>🕔 Out: {formatTimestamp(item.clock_out)}</Text>
            <Text>Hours: {calculateDuration(item.clock_in, item.clock_out)}</Text>
          </View>
        )}
      />
      {name === 'ALL' && (
        <Button
          title="Delete All Timesheets"
          onPress={handleDeleteAll}
          color="red"
        />
      )}
    </View>
  );
}
