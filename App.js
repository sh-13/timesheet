import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ClockScreen from './screens/ClockScreen';
import TimesheetScreen from './screens/TimesheetScreen';

import { setupDatabase, deleteOldRecords } from './database/database';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setupDatabase();
    deleteOldRecords();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Clock" component={ClockScreen} />
        <Stack.Screen name="Timesheet" component={TimesheetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}