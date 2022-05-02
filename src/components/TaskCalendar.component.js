import { Calendar } from "react-native-calendars"
import { StyleSheet, View } from 'react-native';
import TaskRecords from "../modals/TaskRecords";
import { useState } from "react";

export default function TaskCalendar ({taskRecords}) {
  const [records, setRecords] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  let dates = {}
  taskRecords.forEach(date => dates[new Date(date.timestamp).toLocaleDateString('en-CA')] = {selected: true})

  const onDayPress = (day) => {
    setRecords(taskRecords.filter(date => date.timestamp.substring(0, 10) === day.dateString))
    setModalVisible(true)
  }

  return (
    <View>
      <Calendar
        markedDates={dates}
        onDayPress={onDayPress}
      />
      <TaskRecords setModalVisible={setModalVisible} modalVisible={modalVisible} records={records} />
    </View>
  )

}