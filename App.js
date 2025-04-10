import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
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
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Timesheet" component={TimesheetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
