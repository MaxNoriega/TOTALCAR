import React from 'react';
import {View,Text,StyleSheet,FlatList,ScrollView,TextInput,TouchableOpacity, Platform, KeyboardAvoidingView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importación del SafeAreaView


export default function DetailsObject()  {

      const fields = [
        { label: 'Engine ID', icon: 'confirmation-number' },
        { label: 'Engine type', icon: 'local-gas-station' },
        { label: 'Engine hours', icon: 'timer' },
        { label: 'Model', icon: 'directions-bus' },
        { label: 'Odometer', icon: 'speed' },
        { label: 'Plate', icon: 'directions-car' },
        { label: 'Status', icon: 'timeline' },
        { label: 'Address', icon: 'location-on' },
        { label: 'Altitude', icon: 'alt-route' },
        { label: 'Angle', icon: 'navigation' },
        { label: 'Nearest marker', icon: 'place' },
        { label: 'Nearest zone', icon: 'place' },
        { label: 'Position', icon: 'gps-fixed' },
        { label: 'Speed', icon: 'speed' },
        { label: 'Time (position)', icon: 'schedule' },
        { label: 'Time (server)', icon: 'schedule' },
        { label: 'Ignition', icon: 'power' },
      ];

      const details = [
        { key: 'Engine ID', value: '6545424558' },
        { key: 'Engine type', value: 'Petrol' },
        { key: 'Engine hours', value: '34852 h 35 min 12 s' },
        { key: 'Model', value: 'Plaxton Elite' },
        { key: 'Odometer', value: '4202645 km' },
        { key: 'Plate', value: 'PLA987' },
        { key: 'Status', value: 'Moving 54 min 8 s' },
        { key: 'Address', value: 'Kreuz Dortmund-Nordwest, A 2, Ickern Nord, Castrop-Rauxel, Nordrhein-Westfalen, 44581, Deutschland' },
        { key: 'Altitude', value: '61 m' },
        { key: 'Angle', value: '112°' },
        { key: 'Nearest marker', value: 'New marker 1 (243.77 km)' },
        { key: 'Nearest zone', value: 'Europe (463.16 km)' },
        { key: 'Position', value: '51.587075°, 7.361477°' },
        { key: 'Speed', value: '129 kph' },
        { key: 'Time (position)', value: '2024-02-15 10:59:12' },
        { key: 'Time (server)', value: '2024-02-15 10:59:17' },
        { key: 'Ignition', value: 'on' },
      ];

  return (

                                          //Ajuste a Apartado de comando al final de la Screen
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 100, android: 20 })} // Ajustar 
      >
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      overScrollMode="never"
      keyboardShouldPersistTaps="handled" // Permite interactuar con elementos sin cerrar el teclado
    >
      {/* Lista de detalles */}
      <FlatList
        data={fields}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.detailItem}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{details[index]?.value || 'N/A'}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 29.086007899070683,
          longitude: -110.99118980474093,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 29.086007899070683,
            longitude: -110.99118980474093,
          }}
          title="Current Position"
        />
      </MapView>

      {/* Control del objeto */}
      <View style={styles.objectControl}>
        <Text style={styles.controlTitle}>Object control</Text>
        <TextInput style={styles.input} placeholder="Template" />
        <TextInput style={styles.input} placeholder="Type" />
        <TextInput style={styles.input} placeholder="Command" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({



  detailItem: {
    backgroundColor: '#f9f9f9',
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexWrap: 'wrap', // Permite que los elementos se ajusten si no caben en la fila
  },
  
  icon: {
    fontsize: 24,
    marginRight: 5,
    width: 14, // Asegura que todos los íconos tengan el mismo tamaño
    textAlign: 'center',
    color: '#555',
  },
  
  label: {
    flexShrink: 1, // Permite que el texto se reduzca si es necesario
    fontSize: 16,
    color: '#555',
  },
  
  value: {
    flex: 1, // Ocupa el espacio restante
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right', // Asegura que los valores largos se alineen correctamente
    flexWrap: 'wrap', // Permite que el texto largo se ajuste en varias líneas
  },
  map: {
    height: 200,
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  objectControl: {
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF7F00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
