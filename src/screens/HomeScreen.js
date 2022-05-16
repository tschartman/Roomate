import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import TasksList from '../components/TasksList.component';
import * as SecureStore from 'expo-secure-store';
import { Chip } from 'react-native-paper';
import { activeTaskUser } from '../helpers/utilities';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GET_TASKS = gql`
    query getTasks {
			getTasks {
				status
				tasks {
					name
					color
					uuid
					houseUser {
						user {
							nickname
							id
						}
					}
					houseTaskRecords {
						timestamp
						uuid
						houseUser {
							user {
								nickname
								id
							}
						}
					}
				}
			}
    }
  `

export default function HomeScreen({navigation}) {
	const [taskSelection, setTaskSelection] = useState('all')
	const user = useSelector(state => state.user.user)

	useEffect(async () => {
		//await SecureStore.deleteItemAsync('AUTH')
		refetch()
	}, [])


	const { loading, error, data, refetch } = useQuery(GET_TASKS);
	let filteredTasks = data?.getTasks?.tasks || []
	filteredTasks = filteredTasks.filter(task => taskSelection === 'all' || activeTaskUser(task, user))
  if (error) return <Text>Error :(</Text>;

	if (data?.getTasks?.status === 404) {
		navigation.navigate("default")
	}

	if (data?.getTasks?.status === 403) {
		return (
			<View style={styles.container}>
				<Text>House status pending</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			{data?.getTasks?.status === 200 ? <View>
				<View style={styles.chipRow}>
					<Chip onPress={() => {setTaskSelection('all')}} selected={taskSelection === 'all'} style={styles.chip}>All Tasks</Chip>
					<Chip onPress={() => {setTaskSelection('user')}} selected={taskSelection === 'user'} style={styles.chip}>My Tasks</Chip>
				</View>
				<View style={styles.tasks}>
					<TasksList loading={loading} refetch={refetch} navigation={navigation} tasks={filteredTasks} />
				</View>
			</View> : 
			<View>
			<Text>You do not have a house :( </Text>
				<TouchableOpacity onPress={() => {navigation.navigate("default")}} >
					<Text>Creat or Join a House</Text>
				</TouchableOpacity>
			</View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
	},
	tasks: {
		alignItems: 'center',
    justifyContent: 'center',
		marginTop: 20,
	},
	chip: {
		height: 35,
		marginTop: 75,
		marginLeft: 30,
		marginRight: 30
	},
	chipRow: {
		display: 'flex',
		flexDirection: 'row'
	}
})