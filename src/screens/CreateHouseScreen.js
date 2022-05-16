import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { gql, useMutation } from '@apollo/client';
import ResponseSnackbar from '../components/ResponseSnackbar';

const CREATE_HOUSE = gql`
  mutation createHouse($name: String!) {
    createHouse(name: $name) {
      status
    }
  }
`

function CreateHouseScreen({navigation}) {
  const [houseName, setHouseName] = useState('')
  const [snackBarMessage, setSnackBarMessage] = useState(false);

  const [createHouseMutation, {data, loading, error}] = useMutation(CREATE_HOUSE, {
    onCompleted: (data) => {navigation.pop(2)},
    onError: (data) => setSnackBarMessage('Error Creating House'),
    refetchQueries: ['getTasks']
  })
  
  return (
    <View style={styles.centeredView}>
      <Text style={styles.title}>Name</Text>
      <TextInput
        style={styles.taskInput}
        onChangeText={setHouseName}
      />
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {createHouseMutation({variables: {name: houseName}})}}
        >
          <Text style={styles.primaryButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.snackbar}>
				<ResponseSnackbar setVisible={setSnackBarMessage} visible={Boolean(snackBarMessage)} message={snackBarMessage} />
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    display: 'flex',
    flexDirection: 'row',
  },  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  taskInput: {
    width: 250,
    height: 30,
    margin: 30,
    borderBottomWidth: 1,
    textAlign: "center"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10
  },
  button: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10
  },
  cancelButtonText: {
    fontSize: 15,
  },
  primaryButtonText: {
    color: '#007bff',
    fontSize: 15
  },
  snackbar: {
		width: 300,
		marginTop: 200
	},
})

export default CreateHouseScreen;