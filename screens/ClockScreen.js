import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { insertClockIn, updateClockOut, getTimesheets } from '../database/database';
import { formatTimestamp } from '../assets/Utility';

export default function ClockScreen({ route, navigation }) {
  const { name } = route.params;
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);

  useEffect(() => {
    const checkClockStatus = async () => {
      const timesheets = await getTimesheets(name);
      const lastEntry = timesheets[0]; // Get the most recent timesheet entry

      if (lastEntry && !lastEntry.clock_out) {
        setClockedIn(true);
        setClockInTime(lastEntry.clock_in);
      } else {
        setClockedIn(false);
        setClockInTime(null);
      }
    };

    checkClockStatus();
  }, [name]);

  const handleClockIn = async () => {
    await insertClockIn(name);
    setClockedIn(true);
    const now = new Date().toISOString();
    setClockInTime(now);
  };

  const handleClockOut = async () => {
    await updateClockOut(name);
    setClockedIn(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}'s Clock</Text>
      {!clockedIn ? (
        <Button title="Clock In" onPress={handleClockIn} />
      ) : (
        <View>
          <Text style={styles.inTime}>Clocked in at: {formatTimestamp(clockInTime)}</Text>
          <Button title="Clock Out" onPress={handleClockOut} color="red" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  name: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  inTime: { marginVertical: 10, textAlign: 'center' },
});