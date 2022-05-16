import { StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function IconBox ({children, onPress}) {
  return (
    <TouchableHighlight underlayColor='#b7b7b7' onPress={onPress} style={styles.container}>
      {children}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#e5e5e5",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    height: 200,
    width: 200
  }
})