import { StyleSheet, Text, View } from 'react-native';

export default function IconBox (props) {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
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