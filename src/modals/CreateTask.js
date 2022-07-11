import { useState } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { gql, useMutation } from '@apollo/client';

const CREATE_TASK = gql`
  mutation createTask($name: String!, $color: String!) {
    createTask(name: $name, color: $color) {
      status
    }
  }
`;

function CreateTask({modalVisible, setModalVisible}) {
  const [taskName, setTaskName] = useState('')
  const [createTask, {data, loading, error}] = useMutation(CREATE_TASK, {
    onCompleted: (data) => console.log(data),
    onError: (data) => console.log(data),
    refetchQueries: ['getTasks']
  });

  const onSumbit = () => {
    createTask({variables: {name: taskName, color: '#FF5733'}})
    setModalVisible(!modalVisible)
  }

  return (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Create a new task</Text>
          <TextInput
            style={styles.taskInput}
            onChangeText={setTaskName}
          />
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onSumbit}
            >
              <Text style={styles.primaryButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
  modalView: {
    margin: 20,
    width: 300,
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
  }
})

export default CreateTask;