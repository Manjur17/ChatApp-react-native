import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoadingScreen from './LoadingScreen';

const RegisterComponent = ({ socketCommunicator, registrationFailed, logOut, onRegister, onSenderName }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterUser = () => {
    if (username.trim() === '') {
      return;
    }

    setIsLoading(true); // Set isLoading to true to show the loading screen

    // console.log(socketCommunicator, 'inside register component');

    socketCommunicator.sendMessage('register', username);

    onRegister(username);

    onSenderName(username);

    // Simulating a delay for demonstration purposes

    const notificationTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the time as needed

    return () => {
      clearTimeout(notificationTimer);
    };

  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Chat App</Text>
      </View>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View>
          <View style={styles.formContainer}>

            <View style={styles.formHeader}>
              <Text style={styles.formHeaderText}>Enter your name to Register</Text>
            </View>

            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>

            <TouchableOpacity style={styles.buttonRegister} onPress={handleRegisterUser}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {registrationFailed && <Text style={styles.errorText}>Usename already exist. Please try again.</Text>}
            {logOut && <Text style={styles.errorText}>Logout successfully.</Text>}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    margin: 0,
    padding: 0,
    height: '100%'
  },

  header: {
    backgroundColor: '#075e54',
    padding: 30,
    alignItems: 'center',
  },

  headerText: {
    fontSize: 28,
    color: 'white',
  },

  formContainer: {
    marginTop: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },

  formHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },

  formHeaderText: {
    fontSize: 24,
    color: '#075e54',
  },

  formGroup: {
    marginBottom: 20,
    width: '80%',
  },

  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  buttonRegister: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#075e54',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  errorText: {
    color: 'red',
    marginTop: 10,
  },

});

export default RegisterComponent;
