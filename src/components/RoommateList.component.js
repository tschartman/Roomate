import * as React from 'react';
import { List, TouchableRipple  } from 'react-native-paper';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCurrentRoommate } from '../reducers/RoommateReducer';

const RoommateList = ({roommates, navigation}) => {
  const dispatch = useDispatch()
  const pending = roommates.filter(roommate => roommate.status === 'requested')
  const active = roommates.filter(roommate => roommate.status === 'accepted')
  return (
    <View style={styles.container} >
      <List.Section style={styles.list} title="Roommates">
        <List.Accordion
          title="Pending"
          left={props => <List.Icon {...props} icon="account-clock" />}>
            {pending.map(roommate => 
              <List.Item
                onPress={() => {
                  dispatch(setCurrentRoommate(roommate))
                  navigation.navigate('roommate')
                }}
                title={roommate.user.nickname}
                left={props => <List.Icon {...props} icon="account-circle" />}
              />
              )
            }
        </List.Accordion>
        <List.Accordion
          title="Active"
          left={props => <List.Icon {...props} icon="account" />}>
            {active.map(roommate => 
              <List.Item
                onPress={() => {
                  dispatch(setCurrentRoommate(roommate))
                  navigation.navigate('roommate')
                }}
                title={roommate.user.nickname}
                left={props => <List.Icon {...props} icon="account-circle" />}
              />
              )
            }
        </List.Accordion>
      </List.Section>
    </View>
  );
};

export default RoommateList;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  list: {
    width: 300
  },
  title: {
    margin: 30,
    fontSize: 30
  },
})