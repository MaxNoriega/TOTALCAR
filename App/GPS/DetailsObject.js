import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importación del SafeAreaView

 const BusDetailsScreen = () => {
  const details = [
    { icon: 'confirmation-number', label: 'Engine ID', value: '6545424558' },
    { icon: 'local-gas-station', label: 'Engine type', value: 'Petrol' },
    { icon: 'timer', label: 'Engine hours', value: '34852 h 35 min 12 s' },
    { icon: 'directions-bus', label: 'Model', value: 'Plaxton Elite' },
    { icon: 'speed', label: 'Odometer', value: '4202645 km' },
    { icon: 'directions-car', label: 'Plate', value: 'PLA987' },
    { icon: 'timeline', label: 'Status', value: 'Moving 54 min 8 s' },
    {
      icon: 'location-on',
      label: 'Address',
      value:
        'Kreuz Dortmund-Nordwest, A 2, Ickern Nord, Castrop-Rauxel, Nordrhein-Westfalen, 44581, Deutschland',
    },
    { icon: 'alt-route', label: 'Altitude', value: '61 m' },
    { icon: 'navigation', label: 'Angle', value: '112°' },
    {
      icon: 'place',
      label: 'Nearest marker',
      value: 'New marker 1 (243.77 km)',
    },
    { icon: 'place', label: 'Nearest zone', value: 'Europe (463.16 km)' },
    { icon: 'gps-fixed', label: 'Position', value: '51.587075°, 7.361477°' },
    { icon: 'speed', label: 'Speed', value: '129 kph' },
    {
      icon: 'schedule',
      label: 'Time (position)',
      value: '2024-02-15 10:59:12',
    },
    { icon: 'schedule', label: 'Time (server)', value: '2024-02-15 10:59:17' },
    { icon: 'power', label: 'Ignition', value: 'on' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back button pressed!')}>
          <Icon name="arrow-back" size={50} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details (Bus)</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }} // Para hacer que el ScrollView ocupe todo el espacio.
        bounces={false} // Deshabilitar rebote en iOS
        overScrollMode="never" // Deshabilitar rebote en Android
      >
        {/* Lista de detalles */}
        <FlatList
          data={details}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.detailItem}>
              <Icon
                name={item.icon}
                size={24}
                color="#555"
                style={styles.icon}
              />
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          )}
          scrollEnabled={false} // Deshabilita el scroll interno para evitar conflictos con ScrollView
        />

        {/* Mapa */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 29.086007899070683, // Coordenadas iniciales
            longitude: -110.99118980474093,
            latitudeDelta: 0.0922, // Nivel de zoom
            longitudeDelta: 0.0421,
          }}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FF7F00',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF7F00',
    padding: 10,
  },
  headerTitle: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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

export default BusDetailsScreen;