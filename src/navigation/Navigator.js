import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableHighlight, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen'
import LogInScreen from '../screens/LogInScreen';
import DefaultScreen from '../screens/DefaultScreen';
import TaskScreen from '../screens/TaskScreen';
import CreateTask from '../modals/CreateTask';
import { useSelector } from 'react-redux';

function Navigator(props) {
  const Stack = createNativeStackNavigator();
  const authenticated = useSelector((state) => state.authentication.authenticated)
  const taskName = useSelector((state) => state.task.task.name)
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      {
      authenticated ? (
      <>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'House',
          headerRight: () => (
            <>
            <TouchableHighlight
              style={styles.touchableHighlight}
              onPress={() => {setModalVisible(true)}}
              underlayColor='#ECF0F1'
            >
              <Ionicons name="md-add" size={30} />
            </TouchableHighlight>
            <CreateTask modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </>
          ),
        }}
        />
        <Stack.Screen name="Task" component={TaskScreen} options={{title: taskName}} />
        <Stack.Screen name="Default" component={DefaultScreen} options={{title: 'Create or Join a House'}}/>
      </>
      ) : (
      <>
        <Stack.Screen name="Log In" component={LogInScreen} />
      </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  touchableHighlight: {
    borderRadius: 6,
    padding: 5
  }
})

export default Navigator;