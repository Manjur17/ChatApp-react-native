import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MessageInput = ({ socketCommunicator, dataStorage, selectedUser, senderName, onHandleMessageSent }) => {
  const [message, setMessage] = useState('');

  const handleMessage = () => {
    if (message.trim() === '') {
      return;
    }

    const newMessage = JSON.stringify({
      sender: senderName,
      receiver: selectedUser,
      message: message,
      timestamp: new Date().toLocaleTimeString(),
    });

    const data = JSON.parse(newMessage);
    // dataStorage.addMessage(selectedUser, data);
    onHandleMessageSent(data);

    socketCommunicator.sendMessage('sendMessage', newMessage);

    setMessage('');
  };

  return (
    <View style={styles.messageFooter}>
      <TextInput
        style={styles.messageInput}
        placeholder="Type a message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Image source={require('./microphone.svg')} style={styles.footerIcon} />
      <TouchableOpacity style={styles.sendButton} onPress={handleMessage}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  messageFooter: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  footerIcon: {
    width: 22,
    height: 22,
    opacity: 0.4,
    marginRight: 5,
  },
  messageInput: {
    flex: 1,
    marginVertical: 15,
    padding: 12,
    borderRadius: 20,
    fontSize: 15,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MessageInput;
