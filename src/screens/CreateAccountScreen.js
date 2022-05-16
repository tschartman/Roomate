import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { gql, useMutation } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { ErrorMessage } from '@hookform/error-message';
import { useForm, Controller } from 'react-hook-form';
import ResponseSnackbar from '../components/ResponseSnackbar';

const REGISTER = gql`
  mutation register($nickname: String!, $email: String!, $password: String!) {
    register(nickname: $nickname, email: $email, password: $password) {
      status
    }
  }
`

export default function CreateAccountScreen({navigation}) {
  const dispatch = useDispatch();
  const [snackBarMessage, setSnackBarMessage] = useState(false);
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

	const [registerUser, {data, loading, error}] = useMutation(REGISTER, {
		onCompleted: (data) => {navigation.goBack()},
    onError: (data) => setSnackBarMessage('Error Registering')
  })
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = data => registerUser({variables: data});
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
        <View style={styles.nickname}>
          <View style={styles.inputView}>
            <Controller
              control={control}
              rules={{
                required: 'Nick Name is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Nick Name"
                  placeholderTextColor="#003f5c"
                  value={value}
                />
              )}
              name="nickname"
            />
          </View>
          <ErrorMessage
            errors={errors}
            name="nickname"
            render={({ message }) => <Text style={styles.error}>{message}</Text>}
          />
        </View>
        <View style={styles.email}>
          <View style={styles.inputView}>
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Must be a valid email"
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  value={value}
                />
              )}
              name="email"
            />
          </View>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Text style={styles.error}>{message}</Text>}
          />
        </View>
      <View style={styles.password}>
        <View style={styles.inputView}>
          <Controller
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                value={value}
              />
            )}
            name="password"
          />
        </View>
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <Text style={styles.error}>{message}</Text>}
        />
      </View>
      <View style={styles.confirmPassword}>
        <View style={styles.inputView}>
          <Controller
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value => value === password.current || "Passwords do not match"
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                value={value}
              />
            )}
            name="confirmPassword"
          />
        </View>
        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => <Text style={styles.error}>{message}</Text>}
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text  onPress={handleSubmit(onSubmit)}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.snackbar}>
				<ResponseSnackbar setVisible={setSnackBarMessage} visible={Boolean(snackBarMessage)} message={snackBarMessage} />
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30
  },  
  inputView: {
    backgroundColor: "#ECF0F1",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
  },
  input: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  submitButton: {
    marginTop: 30,
  },
  error: {
    color: '#D8000C',
  },
  userView: {
    marginBottom: 50,
    width: "100%",
    alignItems: 'center',
  },
  nickname: {
    width: "100%",
    alignItems: 'center',
    marginBottom: 15
  },
  email: {
    width: "100%",
    alignItems: 'center',
    marginBottom: 35
  },
  password: {
    width: "100%",
    alignItems: 'center',
    marginBottom: 15
  },
  confirmPassword: {
    width: "100%",
    alignItems: 'center',
    marginBottom: 15
  },
  snackbar: {
		width: 300,
		marginTop: 200
	},
});
