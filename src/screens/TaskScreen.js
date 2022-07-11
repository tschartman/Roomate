import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import { gql, useMutation } from '@apollo/client';
import TaskCalendar from '../components/TaskCalendar.component';
import ResponseSnackbar from '../components/ResponseSnackbar';

const COMPLETE_TASK = gql`
	mutation completeTask($taskUUID: String!) {
		completeTask(taskUUID: $taskUUID) {
			status
		}
	}
`

export default function TaskScreen({navigation}) {
  const {name, Active, Records, uuid} =  useSelector((state) => state.task.task)
	const [snackBarMessage, setSnackBarMessage] = useState(false);
	const [completeTask, {data, loading, error}] = useMutation(COMPLETE_TASK, {
		onCompleted: (data) => {navigation.goBack()},
    onError: (data) => console.log(data),
    refetchQueries: ['getTasks']
	})

	const onCompleted = () => {
		completeTask({variables: {taskUUID: uuid}})
	}

	return (
		<View style={styles.container}>
			<View style={styles.subtitleContainer}>
				<Text style={styles.subtitle1}>{Active.User.nickname}'s Turn</Text>
			</View>
			<View style={styles.calendarView}>
				<TaskCalendar taskRecords={Records} />
			</View>
			<View style={styles.actions}>
					<TouchableOpacity
						style={styles.button}
					>
						<Text style={styles.cancelButtonText}>Skip Me</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={onCompleted}
					>
						<Text style={styles.primaryButtonText}>Completed</Text>
					</TouchableOpacity>
        </View>
				<View style={styles.snackbar}>
					<ResponseSnackbar setVisible={setSnackBarMessage} visible={Boolean(snackBarMessage)} message={snackBarMessage} />
				</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
	},
	subtitleContainer: {
		margin: 30,
		alignItems: 'center',
	},
	subtitle1: {
		fontSize: 20,
		marginBottom: 10
	},
	subtitle2: {
		fontSize: 15,
	},
  actions: {
    display: 'flex',
    flexDirection: 'row',
  },  
	button: {
    marginLeft: 75,
    marginRight: 75,
    marginTop: 100
  },
  cancelButtonText: {
    fontSize: 20,
  },
  primaryButtonText: {
    color: '#007bff',
    fontSize: 20
  },
	snackbar: {
		width: 300,
		marginTop: 200
	},
	calendarView: {
		height: 350,
		width: 350,
		marginTop: 40
	}
})