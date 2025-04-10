import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image } from 'react-native';
import { insertClockIn, updateClockOut, getTimesheets } from '../database/database';
import { formatTimestamp, calculateDuration } from '../assets/Utility';
import detailsStyles from '../styles/detailsScreenStyles';
import { people } from '../data/people';

export default function DetailsScreen({ route, navigation }) {
  const { name } = route.params;
  const [role, setRole] = useState(null);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [timesheets, setTimesheets] = useState([]);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const person = people.find((p) => p.name.toLowerCase() === name.toLowerCase());
      if (person) {
        setUserImage(person.image);
        setRole(person.role);
      }

      const isOwner = person?.role === 'owner';
      const fetchedTimesheets = await getTimesheets(isOwner ? 'ALL' : name);
      setTimesheets(fetchedTimesheets);

      const lastEntry = fetchedTimesheets.find((entry) => !entry.clock_out);
      if (lastEntry) {
        setClockedIn(true);
        setClockInTime(lastEntry.clock_in);
      } else {
        setClockedIn(false);
        setClockInTime(null);
      }
    };

    fetchUserData();
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

  const renderTimesheet = ({ item }) => (
    <View style={detailsStyles.timesheetEntry}>
      <Text style={detailsStyles.entryText}>🕐 In: {formatTimestamp(item.clock_in)}</Text>
      <Text style={detailsStyles.entryText}>🕔 Out: {item.clock_out ? formatTimestamp(item.clock_out) : 'Not clocked out yet'}</Text>
      <Text style={detailsStyles.entryText}>⏳ Hours: {item.clock_out ? calculateDuration(item.clock_in, item.clock_out) : 'N/A'}</Text>
    </View>
  );

  return (
    <View style={detailsStyles.container}>
      <Text style={detailsStyles.name}>{name}</Text>
      {userImage && <Image source={userImage} style={detailsStyles.avatar} />}
      <Text style={detailsStyles.role}>{role === 'owner' ? 'Owner' : 'Employee'}</Text>

      <View style={detailsStyles.buttonContainer}>
        {!clockedIn ? (
          <Button title="Start Work" onPress={handleClockIn} color="#4CAF50" />
        ) : (
          <Button title="End Work" onPress={handleClockOut} color="red" />
        )}
      </View>

      <Text style={detailsStyles.title}>Timesheets:</Text>
      <FlatList
        data={timesheets}
        renderItem={renderTimesheet}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
