import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import TasksList from '../components/TasksList.component';
import { Chip } from 'react-native-paper';

const GET_TASKS = gql`
    query getTasks {
			getTasks {
				status
				tasks {
					name
					uuid
					houseUser {
						user {
							firstname
							lastname
						}
					}
					houseTaskRecords {
						timestamp
						uuid
						houseUser {
							user {
								firstname
								lastname
							}
						}
					}
				}
			}
    }
  `

export default function HomeScreen({navigation}) {

	useEffect(async () => {
		refetch()
	}, [])

	const { loading, error, data, refetch } = useQuery(GET_TASKS);
  if (error) return <Text>Error :(</Text>;
	return (
		<View style={styles.container}>
			<View style={styles.chipRow}>
				<Chip style={styles.chip}>All Tasks</Chip>
				<Chip style={styles.chip}>My Tasks</Chip>
			</View>
			<View style={styles.tasks}>
				<TasksList loading={loading} refetch={refetch} navigation={navigation} tasks={data?.getTasks?.tasks} />
			</View>
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