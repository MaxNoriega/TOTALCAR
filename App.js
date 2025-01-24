import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Modal, TextInput, FlatList, Pressable,  Dimensions, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { Marker } from 'react-native-maps';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

function MainScreen() {
  const [GPSModalVisible, setGPSModalVisible] = useState(false);
  const [MenuModalVisible, setMenuModalVisible] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedCheckboxes2, setSelectedCheckboxes2] = useState([]);

  const DATA = [
    { id: '1', title: 'Bus', status: 'Moving 18 min 43 s', speed: '131 kph' },
    { id: '2', title: 'Car', status: 'Moving 2 min 42 s', speed: '112 kph' },
    { id: '3', title: 'Iveco', status: 'Offline 788 d 17 h 31 min 48 s', speed: '0 kph'},
  ];

  const toggleCheckbox = (id) => {
    if (selectedCheckboxes.includes(id)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((checkboxId) => checkboxId !== id));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    }
  };

  const toggleCheckbox2 = (id) => {
    if (selectedCheckboxes2.includes(id)) {
      setSelectedCheckboxes2(selectedCheckboxes2.filter((checkboxId) => checkboxId !== id));
    } else {
      setSelectedCheckboxes2([...selectedCheckboxes2, id]);
    }
  };

const renderItem = ({ item }) => (
    <View style={styles.listItemGPS}>
      <TouchableOpacity
        style={[styles.checkboxGPS, selectedCheckboxes.includes(item.id) && styles.checkboxSelectedGPS]}
        onPress={() => toggleCheckbox(item.id)}/>
      <TouchableOpacity
        style={[styles.checkboxGPS, selectedCheckboxes2.includes(item.id) && styles.checkboxSelectedGPS]}
        onPress={() => toggleCheckbox2(item.id)}/>

      <View style={styles.textContainerGPS}>
        <Text style={styles.listTextGPS}>{item.title}</Text>
        <Text style={styles.statusTextGPS}>{item.status}</Text>
      </View>
      <Text style={styles.speedTextGPS}>{item.speed}</Text>
      <View style={styles.iconsContainerGPS}>
        <Text style={styles.iconGPS}>⚡</Text>
        <Text style={styles.iconGPS}>📶</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.dotsGPS}> ⋮ </Text>
      </TouchableOpacity>
    </View>
  );

  const slideAnim = useRef(new Animated.Value(height)).current; // Inicializa el valor fuera de la pantalla

useEffect(() => {
  if (GPSModalVisible) {
    // Reinicia el valor antes de animar hacia arriba
    slideAnim.setValue(height);

    // Mostrar el modal (deslizar hacia arriba)
    Animated.timing(slideAnim, {
      toValue: height * 0.3, // Posición final del modal
      duration: 300, // Duración de la animación
      useNativeDriver: true,
    }).start();
  } else {
    // Ocultar el modal (deslizar hacia abajo)
    Animated.timing(slideAnim, {
      toValue: height, // Posición fuera de la pantalla
      duration: 10,
      useNativeDriver: true,
    }).start();
  }
}, [GPSModalVisible]);
  
  

  return (
    <View style={styles.container}>
      {/* Mapa interactivo */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 29.086007899070683, // Coordenadas iniciales
          longitude: -110.99118980474093,
          latitudeDelta: 0.0922, // Nivel de zoom
          longitudeDelta: 0.0421,
        }}
      >
        {/* Agregar un marcador */}
        <Marker
          coordinate={{
            latitude: 29.086007899070683,
            longitude: -110.99118980474093,
          }}
          title="Ubicación Ejemplo"
          description="Esta es una descripción"
        />
      </MapView>

      {/* Botón para abrir el menu */}
      {!MenuModalVisible && (
  <TouchableOpacity
    style={styles.menuButton}
    onPress={() => setMenuModalVisible(true)} // Mostrar el modal
  >
    <Text style={styles.menuText}>Menú</Text>
  </TouchableOpacity>
)}

      {/* Botón GPS */}
      {!MenuModalVisible && (
  <View style={styles.gpsContainer}>
    <TouchableOpacity 
    style={styles.gpsButton} 
    onPress={() => setGPSModalVisible(true)}>
      <Text style={styles.gpsText}>GPS</Text>
    </TouchableOpacity>
  </View>
)}

      {/* Modal Menú*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={MenuModalVisible}
        onRequestClose={() => setMenuModalVisible(false)} // Cerrar el modal al presionar "atrás"
      >
        <View style={styles.MenuModalContainer}>
          
            {/* Botón para cerrar el modal */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuModalVisible(false)} // Ocultar el modal
            >
              <Text style={styles.menuText}>Cerrar</Text>
            </TouchableOpacity>

            {/* Opciones del menú */}
            <View style={styles.menuOptions}>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>EVENTOS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>REPORTES</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>HISTORIAL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>CONFIGURACION</Text>
              </TouchableOpacity>
            </View>
         
        </View>
      </Modal>
      
      <Modal
  animationType="none" // Desactivamos la animación predeterminada
  transparent={true}
  visible={GPSModalVisible}
  onRequestClose={() => setGPSModalVisible(false)} // Cerrar el modal al presionar "atrás"
>
  {/* Overlay: aparece inmediatamente */}
  <Pressable style={styles.overlay} onPress={() => setGPSModalVisible(false)} />

  {/* Modal deslizable */}
  <Animated.View
    style={[
      styles.containerGPS,
      { transform: [{ translateY: slideAnim }] }, // Animación de deslizamiento
    ]}
  >
    <Text style={styles.titleGPS}>Vehiculos</Text>
    <View style={styles.buttonsContainerGPS}>
      <TouchableOpacity style={styles.buttonGPS}>
        <Text style={styles.buttonTextGPS}>ALL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGPS}>
        <Text style={styles.buttonTextGPS}>OFFLINE</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGPS}>
        <Text style={styles.buttonTextGPS}>MOVING</Text>
      </TouchableOpacity>
      <TextInput style={styles.searchGPS} placeholder="SEARCH" />
    </View>

    <View style={styles.listContainerGPS}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  </Animated.View>
</Modal>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return <MainScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  menuButton: {
    position: 'absolute',
    top: height * 0.05, // 5% desde la parte superior
    left: width * 0.05, // 5% desde la parte derecha
    backgroundColor: '#FF7F00',
    paddingVertical: height * 0.02, // Altura adaptable (2% de la altura)
    paddingHorizontal: width * 0.05, // Ancho adaptable (5% del ancho)
    borderRadius: width * 0.03, // Bordes redondeados proporcionales al ancho
    borderColor:'black',
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Verdana', 
  },
  gpsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  gpsButton: {
    backgroundColor: '#FF7F00',
    paddingVertical: height * 0.025, // Altura adaptable (2% de la altura)
    paddingHorizontal: width * 0.20, // Ancho adaptable (5% del ancho)
    borderRadius: width * 0.03, // Bordes redondeados proporcionales al ancho
    borderColor:'black',
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gpsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Verdana', 
  },


  //MODAL MENÚ
  MenuModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.5)', // Fondo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: height * 0.05, // 5% desde la parte superior
    right: width * 0.05, // 5% desde la parte derecha
    backgroundColor: '#FF7F00',
    paddingVertical: height * 0.02, // Altura adaptable (2% de la altura)
    paddingHorizontal: width * 0.05, // Ancho adaptable (5% del ancho)
    borderRadius: 10,
    borderColor:'black',
    borderWidth:2,
  },
  menuOptions: {
    flex: 1,
    flexDirection: 'row',     // Los botones estarán en fila
    flexWrap: 'wrap',         // Permite que los botones pasen a la siguiente fila si no hay espacio
    justifyContent: 'center', // Centra los elementos horizontalmente
    alignItems: 'center',     // Centra los elementos verticalmente
    marginTop: 150,
    gap: 10,                  // Espaciado entre los botones (requiere React Native 0.71+)
    
  },
  optionButton: {
    backgroundColor: '#FF7F00',
    width: 160,
    height: 160,
    justifyContent: 'flex-end', // Empuja el contenido hacia la parte inferior
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    borderColor:'black',
    borderWidth:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  optionText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Verdana', 
    marginBottom: 5, 
  },


  //MODAL GPS

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  containerGPS: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '95%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Sombra para Android
    
  },
  titleGPS: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginBottom: 10,
  },
  buttonsContainerGPS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonGPS: {
    backgroundColor: '#FF7F00',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonTextGPS: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchGPS: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  listContainerGPS: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 3,
    borderColor: 'black',
    borderWidth: 1,
  },
  listItemGPS: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
    paddingVertical:15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  textContainerGPS: {
    flex: 1,
  },
  checkboxGPS: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 5,
    marginRight: 10,
  },
    checkboxSelectedGPS: {
    backgroundColor: '#ff8c00',
    borderColor: '#ff8c00',
  },
  listTextGPS: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusTextGPS: {
    fontSize: 14,
    color: '#555',
  },
  speedTextGPS: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 3,
  },
  iconsContainerGPS: {
    flexDirection: 'row',
    marginRight: 10,
  },
  iconGPS: {
    fontSize: 18,
    marginHorizontal: 1,
  },
  dotsGPS: {
    fontSize: 40,
    color: '#888',
  },

});

