import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Message from './Message';

const MessageDisplay = ({ selectedUser, messages, username, chatId, queryMsg }) => {

  if (queryMsg === 'No message found.') {
    return (
      <ScrollView style={styles.messageContent}>
        <Text style={styles.noMsgText}>No message found</Text>
      </ScrollView>
    );
  }


  const updatedMessages = messages.map((client, index) => ({
    id: client.sender + client.receiver + index + " ",
    message: client.message,
    sender: client.sender,
    receiver: client.receiver,
    timestamp: client.timestamp,
  }));


  updatedMessages.forEach(element => {
    if (element.message.includes(queryMsg)) {
      console.log('yes there is a message', queryMsg);
    }
  });

  return (
    <ScrollView style={styles.messageContent}>
      {updatedMessages.map((message, index) => (
        <Message
          key={message.id}
          message={message.message}
          sent={message.sender === username}
          timestamp={message.timestamp}
          queryMsg={queryMsg}
        />
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messageContent: {
    flex: 1,
    padding: 20,
  },
  noMsgText: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'gray',
  },
});

export default MessageDisplay;
