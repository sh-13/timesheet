import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { people } from '../data/people';
import homeScreenStyles from '../styles/homeScreenStyles';

export default function HomeScreen({ navigation }) {
  const renderTile = ({ item }) => (
    <TouchableOpacity
      style={homeScreenStyles.tile}
      onPress={() => navigation.navigate('Details', { name: item.name, role: item.role })}>
      <Image source={item.image} style={homeScreenStyles.avatar} />
      <Text style={homeScreenStyles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={homeScreenStyles.container}>
      <FlatList
        data={people}
        renderItem={renderTile}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={homeScreenStyles.grid}
      />
    </View>
  );
}
