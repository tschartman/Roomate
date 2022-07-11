import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { Button } from 'react-native-paper';
import ResponseSnackbar from '../components/ResponseSnackbar';

function InviteHouseScreen({navigation, route}) {
  const [snackBarMessage, setSnackBarMessage] = useState(false);

  const copyHouseCode = () => {
    Clipboard.setString(route.params.uuid)
    setSnackBarMessage("Copied to Clipboard!")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR or Share Code</Text>
      <Button color="#007bff" style={styles.action} onPress={copyHouseCode}>
        Copy House Code
      </Button>
      <QRCode
        value={route.params.uuid}
        size={200}
      />
      <View style={styles.snackbar}>
        <ResponseSnackbar setVisible={setSnackBarMessage} visible={Boolean(snackBarMessage)} message={snackBarMessage} />
      </View>
    </View>
  )

}

export default InviteHouseScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    margin: 30,
    fontSize: 20
  },
  subTitle: {
    margin: 20,
    fontSize: 20,
  },
  action: {
    marginBottom: 30,
    fontSize: 15,
    color: '#007bff'
  },
  snackbar: {
		width: 300,
		marginTop: 200
	},
})