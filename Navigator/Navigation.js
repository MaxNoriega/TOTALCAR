import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




import MainScreen from '../App/MainScreen';
import DetailsObject from '../App/GPS/DetailsObject';
import HistoryScreen from '../App/OPTIONS/Historial/Historial';
import MapaRutaScreen from '../App/OPTIONS/Historial/HistorialOPTIONS/MAP';
import HistorialDetallesScreen from '../App/OPTIONS/Historial/HistorialOPTIONS/RUTA';
import GPSMensajesScreen from '../App/OPTIONS/Historial/HistorialOPTIONS/MENSAJES';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
return(
  <Tab.Navigator
  initialRouteName="MAP"
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      height: 75, // Aumenta el tamaño total de la barra
      paddingBottom: 10, // Ajusta el padding inferior
    },
    tabBarItemStyle: {
      height: 200, // Asegura que cada ítem sea más grande
    },
    tabBarLabelStyle: {
      fontSize: 18, // Aumenta el tamaño del texto
      fontWeight: "bold",
    },
    tabBarIcon: ({ color }) => {
      let iconName;
      if (route.name === "MAP") {
        iconName = "map";
      } else if (route.name === "RUTA") {
        iconName = "";
      } else if (route.name === "MENSAJES"){
        iconName = "";
      }
      return <Ionicons name={iconName} size={30} color={color} />; // Íconos más grandes
            
    },
    tabBarActiveTintColor: "orange",
    tabBarInactiveTintColor: "gray",
  })}
>
  <Tab.Screen name="MAP" component={MapaRutaScreen} />
  <Tab.Screen name="RUTA" component={HistorialDetallesScreen} />
  <Tab.Screen name="MENSAJES" component={GPSMensajesScreen}/>
</Tab.Navigator>

)

}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
   
        <Stack.Screen name="DetailsObject" component={DetailsObject}
         options={{
          headerShown: true,
          headerTitle: "Detalles",
          headerStyle: { backgroundColor: '#FF7F00', 
            borderBottomWidth: 1.5, // Grosor del borde
            borderBottomColor: 'black', // Color del borde 
            },
          headerTitleStyle: { 
            fontSize: 24, 
            color: 'white', 
            fontWeight: 'bold',
            textAlign: 'center',
            textShadowColor: 'black', // Color del borde
            textShadowOffset: { width: 1, height: 1 }, // Dirección del borde
            textShadowRadius: 2, // Difuminado del borde
          },
            headerTintColor: 'white',
            headerBackTitle: "", // Oculta el texto del botón Back
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={46} color="white" /> // Tamaño personalizado
          )
        }} />
        <Stack.Screen name="Historial" component={HistoryScreen}
        options={{
          headerShown: true,
          headerTitle: "Historial",
          headerStyle: { backgroundColor: '#FF7F00', 
            borderBottomWidth: 1.5, // Grosor del borde
            borderBottomColor: 'black', // Color del borde 
            },
          headerTitleStyle: { 
            fontSize: 24, 
            color: 'white', 
            fontWeight: 'bold',
            textAlign: 'center',
            textShadowColor: 'black', // Color del borde
            textShadowOffset: { width: 1, height: 1 }, // Dirección del borde
            textShadowRadius: 2, // Difuminado del borde
          },
            headerTintColor: 'white',
            headerBackTitle: "", // Oculta el texto del botón Back
            headerBackImage: () => (
              <Ionicons name="arrow-back" size={46} color="white" /> // Tamaño personalizado
          )
        }}
        
        />
      <Stack.Screen name="Tabs" component={TabNavigator} 
       options={{
        headerShown: true,
        headerTitle: "Historial",
        headerStyle: { backgroundColor: '#FF7F00', 
          borderBottomWidth: 1.5, // Grosor del borde
          borderBottomColor: 'black', // Color del borde 
          },
        headerTitleStyle: { 
          fontSize: 24, 
          color: 'white', 
          fontWeight: 'bold',
          textAlign: 'center',
          textShadowColor: 'black', // Color del borde
          textShadowOffset: { width: 1, height: 1 }, // Dirección del borde
          textShadowRadius: 2, // Difuminado del borde
        },
          headerTintColor: 'white',
          headerBackTitle: "", // Oculta el texto del botón Back
          headerBackImage: () => (
            <Ionicons name="arrow-back" size={46} color="white" /> // Tamaño personalizado
        )
      }}
       />
      </Stack.Navigator>
  
      
    </NavigationContainer>
  );
}
