import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function ResponseSnackbar({message, visible, setVisible}) {
  return (
    <View>
      <Snackbar
        visible={visible}
        theme={{ colors: {onSurface: '#FF9494', accent: 'black'}}}
        onDismiss={() => {setVisible('')}}
        action={{
          label: "Dismiss",
        }}
      >
        {message}
      </Snackbar>
    </View>
  )
}