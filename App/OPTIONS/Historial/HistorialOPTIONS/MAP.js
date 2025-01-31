import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Slider from '@react-native-community/slider';


const routeCoordinates = [
  { latitude: 29.082622,  longitude: -111.005481 },
  { latitude: 29.080742, longitude: -111.049896 },
  { latitude: 29.077352, longitude: -111.075387 },
  { latitude: 29.047493, longitude: -111.119893 },
  { latitude: 28.949601, longitude: -111.255969 },
  { latitude: 28.875138, longitude: -111.351074 },
  { latitude: 28.839896, longitude: -111.490540}

];

export default function MapaRutaScreen()  {
  const [positionIndex, setPositionIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (playing && positionIndex < routeCoordinates.length - 1) {
      interval = setInterval(() => {
        setPositionIndex((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing, positionIndex]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: 29.086007899070683,
            longitude: -110.99118980474093,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        <Polyline coordinates={routeCoordinates} strokeWidth={2} strokeColor="red" />
        <Marker coordinate={routeCoordinates[positionIndex]} title="Vehicle" />
      </MapView>
      <View style={styles.controls}>
        <Button title={playing ? "Pause" : "Play"} onPress={() => setPlaying(!playing)} />
        <Slider
          style={{ flex: 1, marginHorizontal: 10 }}
          minimumValue={0}
          maximumValue={routeCoordinates.length - 1}
          step={1}
          value={positionIndex}
          onValueChange={setPositionIndex}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    position: "absolute",
    bottom: 50,
    left: 10,
    right: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10
  }
});
