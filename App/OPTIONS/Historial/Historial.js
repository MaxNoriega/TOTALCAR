import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, FlatList, Modal, StyleSheet, TouchableWithoutFeedback,} from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


  
// Componente DropdownSelector
const DropdownSelector = ({ label, value, options, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
 

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)} style={styles.selector}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.selectorContent}>
          <Text style={styles.selectorText}>{value}</Text>
        </View>
      </Pressable>

      {/* Modal de selección */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.option}
                    onPress={() => {
                      onSelect(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

// Pantalla principal HistoryScreen
export default function HistoryScreen({ navigation })  {
  const [selectedValues, setSelectedValues] = useState({
    objeto: 'Bus',
    filtro: 'Hoy',
    paradas: '> 1 min',
  });

  const options = {
    objeto: ['Bus', 'Train', 'Taxi'],
    filtro: ['Hoy', 'Ayer', 'Semana Pasada'],
    paradas: ['> 1 min', '> 5 min', '> 10 min'],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        {Object.keys(options).map((field) => (
          <DropdownSelector
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={selectedValues[field]}
            options={options[field]}
            onSelect={(value) =>
              setSelectedValues((prev) => ({ ...prev, [field]: value }))
            }
          />
        ))}

        <Text style={styles.dateText}>
          2024-02-15 00:00:00 - 2024-02-16 00:00:00
        </Text>

        <Button mode="contained" style={styles.button} icon="history"
        onPress={() => navigation.navigate('MAP')}>
          Mostrar
        </Button>
      </View>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7F00',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 22, color: 'white', fontWeight: 'bold', marginLeft: 15 },
  formContainer: { padding: 20 },
  selector: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 0.5,
  },
  label: { fontSize: 22, color: '#666', marginBottom: 5 },
  selectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: { fontSize: 24, color: '#333' },
  dateText: { textAlign: 'center', fontSize: 18, color: '#444', marginVertical: 15 },
  button: {
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#FF7F00',
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    elevation: 5,
  },
  option: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  optionText: { fontSize: 18, textAlign: 'center', color: '#333' },
});
