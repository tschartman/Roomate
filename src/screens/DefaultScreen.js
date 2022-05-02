import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconBox from '../components/IconBox.component';

export default function DefaultScreen({navigation}) {  
	return (
		<View style={styles.container}>
			<View style={styles.addBox}>
				<IconBox>
					<Ionicons name="md-add" size={100} color="black" />
				</IconBox>
			</View>

			<View style={styles.homeBox}>
				<IconBox>
					<Ionicons name="md-home" size={100} color="black" />
				</IconBox>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
	},
	addBox: {
		marginBottom: 30
	},
	homeBox: {
		marginTop: 30
	}
})