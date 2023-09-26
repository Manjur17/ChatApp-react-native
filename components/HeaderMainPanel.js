import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HeaderMainPanel = ({socketCommunicator, onLogout}) => {

  const handleLogoutUser = () =>{
    // console.log(socketCommunicator, 'inside main panel component');

    socketCommunicator.sendMessage('quit','close connection');
    // socketCommunicator.close();
    onLogout(); // Callback to trigger the logout action
  }


  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Chats</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutUser}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#075e54',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fbf5f5',
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f54e43',
    borderRadius: 150,
    marginVertical: 15,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fbf5f5',
    fontSize: 16,
  },
});

export default HeaderMainPanel;
