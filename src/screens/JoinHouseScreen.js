import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Button } from 'react-native-paper';
import ResponseSnackbar from '../components/ResponseSnackbar';

const GET_HOUSE_QUERY = gql`
  query getHouse($houseUUID: String!) {
    getHouse(houseUUID: $houseUUID) {
      status
      house {
        name
        uuid
        owner {
          user {
            nickname
          }
        }
      }
    }
  }
`

const JOIN_HOUSE_MUTATION = gql`
  mutation joinHouse($houseUUID: String!) {
    joinHouse(houseUUID: $houseUUID) {
      status
    }
  }
`

function JoinHouseScreen({navigation, route}) {
  const [getHouseQuery, {data}] = useLazyQuery(GET_HOUSE_QUERY); 
  const [joinHouseMutation] = useMutation(JOIN_HOUSE_MUTATION, {
    onCompleted: (data) => {navigation.pop(2)},
    onError: (data) => setSnackBarMessage('Error Requesting to join house'),
    refetchQueries: ['getTasks']
  })

  const [snackBarMessage, setSnackBarMessage] = useState(false);
  const {name, uuid, owner} = data?.getHouse?.house || {}
  const ownwerName = owner?.user?.nickname;  
  return (
    <View style={styles.centeredView}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {navigation.navigate('scanHouseCode', {getHouseQuery})}}
      >
        <Text style={styles.primaryButtonText}>Scan QR</Text>
      </TouchableOpacity>
      {data &&
      <View style={styles.housePreview}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subTitle}>Owner: {ownwerName}</Text>
        <Button onPress={() => {joinHouseMutation({variables: {houseUUID: uuid}})}}>
          Request to Join
        </Button>
      </View>}
      <View style={styles.snackbar}>
        <ResponseSnackbar setVisible={setSnackBarMessage} visible={Boolean(snackBarMessage)} message={snackBarMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    margin: 30
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10
  },
  subTitle: {
    margin: 20
  },
  housePreview: {
    marginTop: 150,
    padding: 30,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6
  },
  button: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10
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

export default JoinHouseScreen;