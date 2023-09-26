import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
const SocketCommunicator = require('./SocketCommunicator'); // Import your SocketCommunicator class
import RegisterComponent from './components/RegisterComponent'; // Import your RegisterComponent
import LayoutComponent from './components/LayoutComponent';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Initialize and connect to the server through SocketCommunicatorClass
    // this.socketCommunicator = new SocketCommunicator(this);
    const networkListener = {
      handleEvents: (event, data) => {
        console.log('Received event:', event, 'with data:', data);
        // Handle received events from the server here
      }
    };

    
    const socketCommunicator = new SocketCommunicator(networkListener);
  
    socketCommunicator.sendMessage('exampleEvent', { message: 'Hello from React-Native client!!!' });


    // Set the socket instance
    setSocket(socketCommunicator);
    // console.log(socket);

    // return () => {
    //   socketCommunicator.close();
    // };

  }, []);
  

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };



  return (
    <View style={styles.container}>
      {(!isRegistered) ? (
        <RegisterComponent socketCommunicator={socket} onRegistrationSuccess={handleRegistrationSuccess} />
      ) : (
        <LayoutComponent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default App;
