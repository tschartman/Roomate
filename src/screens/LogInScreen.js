import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { gql, useLazyQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/UserReducer';
import { setAuthentication } from '../reducers/AuthenticationReducer';
import * as SecureStore from 'expo-secure-store';

const AUTHENTICATION_QUERY = gql`
  query Authentication($email: String!, $password: String!) {
    authentication(email: $email, password: $password) {
      status
      jwt
    }
  }
`

const GET_USER_QUERY = gql`
  query getUser {
    getUser {
      status
      user {
        firstname
        lastname
        uuid
      }
    }
  }
`

export default function LogInScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const [authenticate] = useLazyQuery(AUTHENTICATION_QUERY, {
    onCompleted: (data) => handleAuthentication(data),
  });

  const [getUser] = useLazyQuery(GET_USER_QUERY, {
    onCompleted: (data) => storeUser(data)
  });

  useEffect(() => {
    setError('')
  }, [email, password])

  const storeUser = data => {
    if (data.getUser.status === 200) {
      dispatch(setUser(data.getUser.user))
    }
  }

  const handleAuthentication = async data => {
    console.log(data)
    if (data.authentication.status !== 200) {
      setError('Email or Password Incorrect')
    } else {
      await SecureStore.setItemAsync('AUTH', data.authentication.jwt);
      getUser()
      dispatch(setAuthentication(true))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roomate</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotButton}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {authenticate({variables: {email: email, password: password}})}}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.error}>{error}</Text>
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
  title: {
    fontWeight: "bold",
    marginBottom: 30
  },  
  inputView: {
    backgroundColor: "#ECF0F1",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgotButton: {
    height: 30,
    marginBottom: 30
  },
  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  error: {
    color: '#D8000C',
    marginTop: 40
  }
});
