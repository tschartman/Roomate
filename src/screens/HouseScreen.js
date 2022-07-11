import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import RoommateList from '../components/RoommateList.component';

const GET_MY_HOUSE = gql`
  query getMyHouse {
    getMyHouse {
      status
      house {
        name
        uuid
        Roommates {
          status
          User {
            nickname
            uuid
          }
        }
      }
    }
  }
`

function HouseScreen({navigation}) {

  const {loading, error, data} = useQuery(GET_MY_HOUSE);
  const roommates = data?.getMyHouse?.house?.Roommates
  const uuid = data?.getMyHouse?.house?.uuid
  const user = useSelector(state => state.user.user)

  if (error) return <Text>Error :(</Text>;

  if (loading) return <Text>Loading...</Text>

  console.log(data)

	if (data?.getMyHouse?.status === 403) {
		return (
			<View style={styles.container}>
				<Text>House status pending</Text>
			</View>
		)
	} else if (data?.getMyHouse?.status === 404) {
		return (
			<View style={styles.container}>
				<Text>You do not have a house yet :(</Text>
			</View>
		)
  }



  const owner = roommates.find(roomate => roomate.status === 'owner');

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>{owner.User.nickname}'s House</Text>
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('inviteHouse', {uuid: uuid})}}>
        <Text style={styles.subTitle}>Invite Users</Text>
      </TouchableOpacity>
      <RoommateList roommates={roommates} navigation={navigation} />
    </View>
  );
}

export default HouseScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    margin: 30,
    fontSize: 30
  },
  subTitle: {
    margin: 20,
    fontSize: 15,
    color: '#007bff'
  }
})