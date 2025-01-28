import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../App/MainScreen';
import DetailsObject from '../App/GPS/DetailsObject';



const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
   
        <Stack.Screen name="DetailsObject" component={DetailsObject}
         options={{
          headerShown: true,
          headerTitle: "Detalles",
          headerStyle: { backgroundColor: '#FF7F00' },
          headerTitleStyle: { fontSize: 20, color: 'white' },
          headerBackTitle:""
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
