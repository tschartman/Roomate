import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useDispatch } from 'react-redux';

function ScanHouseCodeScreen({navigation, route}) {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    route.params.getHouseQuery({variables: {houseUUID: data}})
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },  
})

export default ScanHouseCodeScreen;