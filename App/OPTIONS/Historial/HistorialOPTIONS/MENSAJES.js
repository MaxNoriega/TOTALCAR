import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo, reemplaza esto con datos reales
const gpsData = [
  {
    id: 1,
    positionTime: '2024-02-15 09:42:21',
    serverTime: '2024-02-15 09:42:24',
    latitude: '51.404899',
    longitude: '5.405000',
    altitude: '123 m',
    angle: '45°',
    speed: '50 kph',
  },
  {
    id: 2,
    positionTime: '2024-02-15 09:40:49',
    serverTime: '2024-02-15 09:40:52',
    latitude: '51.405312',
    longitude: '5.404269',
    altitude: '121 m',
    angle: '60°',
    speed: '55 kph',
  },
  // Más datos...
];

export default function GPSMensajesScreen() {
  // Renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <Ionicons name="navigate-outline" size={22} color="#FF9800" />
        <Text style={styles.label}>
          Posición: {item.latitude}, {item.longitude}
        </Text>
      </View>
      <Text style={styles.info}>Velocidad: {item.speed} | Tiempo: {item.positionTime}</Text>
      <Text style={styles.detailLink}>Ver más detalles...</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={gpsData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  info: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  detailLink: {
    marginTop: 8,
    fontSize: 14,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
  },
});
