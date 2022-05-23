import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper';
import ResponseSnackbar from '../components/ResponseSnackbar';
import { NavigationContainer } from '@react-navigation/native';

const UPDATE_HOUSE_STATUS = gql`
  mutation updateHouseStatus($userUUID: String!, $status: String!) {
    updateHouseStatus(userUUID: $userUUID, status: $status) {
      status
    }
  }
`

function RoommateScreen({navigation}) {
  const {roommate} = useSelector(store => store.roommate)
  const [snackBarMessage, setSnackBarMessage] = useState(false);
  const [updateHouseStatus] = useMutation(UPDATE_HOUSE_STATUS, {
    onCompleted: () => {navigation.goBack()},
    onError: () => setSnackBarMessage('Error updating status'),
    refetchQueries: ['getMyHouse']
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roommate.user.nickname}</Text>
      <Text style={styles.subTitle}>Status</Text>
      <Text style={styles.status}>{roommate.status}</Text>
      <View style={styles.actions}>
        <Button color="red" onPress={() => {}} style={styles.button}>
          Decline
        </Button>
        <Button color="green" onPress={() => {updateHouseStatus({variables: {userUUID: roommate.user.uuid, status: 'accepted'}})}} style={styles.button}>
          Accept
        </Button>
      </View>
      <View style={styles.snackbar}>
        <ResponseSnackbar setVisible={setSnackBarMessage} visible={Boolean(snackBarMessage)} message={snackBarMessage} />
      </View>
    </View>
  );
}

export default RoommateScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    margin: 50,
    fontSize: 30
  },
  subTitle: {
    margin: 15,
    fontSize: 20
  },
  status: {
    fontSize: 25
  },
  actions: {
    margin: 50,
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    marginRight: 20,
    marginLeft: 20
  },
  snackbar: {
		width: 300,
		marginTop: 200
	},
})