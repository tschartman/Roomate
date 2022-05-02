import { View, Modal, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'

const formatDateString = (date) => {
  if (date) {
    return new Date(date).toDateString()
  }
  return ''
}

const formatTimeString = (date) => {
  if (date) {
    const dateObject = new Date(date)
    let hours = dateObject.getHours()
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes = dateObject.getMinutes()
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return `${hours}:${minutes} ${ampm}`
  }

  return ''
}

const RecordRow = ({ record }) => {
  return (
    <View style={styles.recordRow}>
        <Text style={styles.recordText}>{record.houseUser.user.firstname} at {formatTimeString(record.timestamp)}</Text>
    </View>
  )
}

function TaskRecords({modalVisible, setModalVisible, records}) {

  const renderItem = (item) => (
    <RecordRow record={item.item}/>
  )

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
          <Text style={styles.title}>{formatDateString(records?.[0]?.timestamp)}</Text>
          <FlatList 
            style={styles.flatlist}
            data={records}
            renderItem={renderItem}
            keyExtractor={item => item.uuid}
          />
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {setModalVisible(!modalVisible)}}
            >
              <Text style={styles.primaryButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  recordRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5
  },
  recordText: {
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5
  },
  title : {
    fontSize: 20,
    marginBottom: 10
  },
  flatlist: {
    marginBottom: 20
  },
  modalView: {
    margin: 30,
    width: 300,
    height: 200,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
})

export default TaskRecords;