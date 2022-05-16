import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableHighlight, StyleSheet } from 'react-native';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import DefaultScreen from '../screens/DefaultScreen';
import TaskScreen from '../screens/TaskScreen';
import CreateTask from '../modals/CreateTask';
import CreateHouseScreen from '../screens/CreateHouseScreen';
import JoinHouseScreen from '../screens/JoinHouseScreen';
import ScanHouseCodeScreen from '../screens/ScanHouseCodeScreen';
import HouseScreen from '../screens/HouseScreen';
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
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
          title: 'Tasks',
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
          headerLeft: () => (
            <>
            <TouchableHighlight
              style={styles.touchableHighlight}
              onPress={() => {navigation.navigate('house')}}
              underlayColor='#ECF0F1'
            >
              <Ionicons name="md-home" size={30} />
            </TouchableHighlight>
            </>
          ),
        })}
        />
        <Stack.Screen name="Task" component={TaskScreen} options={{title: taskName}} />
        <Stack.Screen name="house" component={HouseScreen} options={{title: 'House'}} />
        <Stack.Screen name="default" component={DefaultScreen} options={{title: 'Create or Join a House'}}/>
        <Stack.Screen name="createHouse" component={CreateHouseScreen} options={{title: 'Create a new House'}}/>
        <Stack.Screen name="joinHouse" component={JoinHouseScreen} options={{title: 'Join a House'}}/>
        <Stack.Screen name="scanHouseCode" component={ScanHouseCodeScreen} options={{title: 'Scan House QR Code'}} />
      </>
      ) : (
      <>
        <Stack.Screen name="Log In" component={LogInScreen} options={{title: 'Log In'}} />
        <Stack.Screen name="createAccount" component={CreateAccountScreen} options={{title: 'Create an Account'}}/>
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