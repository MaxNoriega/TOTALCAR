import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../App/MainScreen';
import BusDetailsScreen from '../App/GPS/DetailsObject';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
   
        <Stack.Screen name="DetailsObject" component={BusDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
