import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyleSheet, Text, View } from 'react-native';
import RoommateList from '../components/RoommateList.component';

const GET_MY_HOUSE = gql`
  query getMyHouse {
    getMyHouse {
      status
      house {
        name
        uuid
        owner {
          status
          user {
            nickname
          }
        }
        roommates {
          status
          user {
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
  const roommates = data?.getMyHouse?.house?.roommates
  const owner = data?.getMyHouse.house.owner

  console.log(data)

  if (error) return <Text>Error :(</Text>;

  if (loading) return <Text>Loading...</Text>

	if (data?.getMyHouse?.status === 403) {
		return (
			<View style={styles.container}>
				<Text>House status pending</Text>
			</View>
		)
	}

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>{owner.user.nickname}'s House</Text>
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
})