import React from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HistorialDetallesScreen  ()  {
  const summaryData = [
    { label: 'Longitud de Ruta', value: '36.88 km' },
    { label: 'Duración en Movimiento', value: '20 min 21 s' },
    { label: 'Duración de la Parada', value: '2 min 0 s' },
    { label: 'Velocidad Máxima', value: '157 kph' },
    { label: 'Velocidad Promedio', value: '108 kph' },
  ];

  const detailData = [
    { timestamp: '2024-02-15 09:19:08', description: 'E34, Retie, Turnhout, Antwerpen, Belgium' },
    { timestamp: '2024-02-15 09:19:08', description: '4 min 45 s' },
    { timestamp: '2024-02-15 09:19:14', description: 'Overspeed' },
    { timestamp: '2024-02-15 09:20:41', description: 'Moving in zones UK' },
    { timestamp: '2024-02-15 09:23:53', description: 'Parking, Postel, Mol, Belgium, 2 min 0 s' },
    { timestamp: '2024-02-15 09:25:53', description: '15 min 36 s' },
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Summary */}
  
        <View style={styles.sectionContainer}>
          {summaryData.map((item, index) => (
            <View key={index} style={styles.rowContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Details */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>Details</Text>
          <FlatList
          nestedScrollEnabled={true}
            data={detailData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.detailRow}>
                <Ionicons name="location" size={22} color="#E57373" style={styles.icon} />
                <View>
                  <Text style={styles.timestamp}>{item.timestamp}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            )}
          />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF7F00',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  contentContainer: { paddingHorizontal: 15 },
  sectionContainer: { backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10, marginVertical: 25 },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  label: { fontSize: 16, color: '#666' },
  value: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  detailSection: { marginTop: 15, borderWidth:.5,borderRadius:20,padding:10 },
  detailTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  icon: { marginRight: 10 },
  timestamp: { fontSize: 16, color: '#333' },
  description: { color: '#666' },
});
