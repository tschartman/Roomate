import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, RefreshControl } from 'react-native';
import { setTask } from '../reducers/TaskReducer';
import { useDispatch } from 'react-redux'

const Task = ({navigation, task}) => {
  const dispatch = useDispatch()
  const {name} = task.item
  return (
    <View style={styles.taskContainer}>
      <TouchableHighlight 
        style={styles.task}
        onPress={ () => {
          dispatch(setTask(task.item))
          navigation.navigate('Task')
        }}
        underlayColor='#c4e3ed'
      >
        <Text style={styles.taskText}>{name}</Text>
      </TouchableHighlight>
    </View>
  )
}

export default function TaskList ({navigation, tasks, refetch, loading}) {

  const renderItem = (navigation, task) => (
    <Task task={task} navigation={navigation}/>
  )

  return (
    <View style={styles.container}>
      <FlatList 
        style={styles.flatlist}
        numColumns={2}
        data={tasks}
        renderItem={(task) =>  renderItem(navigation, task)}
        keyExtractor={item => item.uuid}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
          />
        }

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContainer: {
    margin: 5,
  },
  task: {
    padding: 10,
    height: 75,
    width: 175,
    borderRadius: 6,
    backgroundColor: '#ADD8E6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    fontSize: 15
  },
  flatlist: {
    flexDirection: 'column'
  }
})