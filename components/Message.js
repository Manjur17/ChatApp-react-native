import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ message, sent, timestamp, queryMsg }) => {
  const messageStyle = sent ? styles.sentMessage : styles.receivedMessage;

  // Check if queryMsg exists in the message
  if (queryMsg === null || !message.includes(queryMsg)) {
    return (
      <View style={[styles.chatMessage, messageStyle]}>
        <Text style={styles.chatMessageText}>{message}</Text>
        <Text style={styles.chatTimestamp}>{timestamp}</Text>
      </View>
    );
  }

  const words = message.split(' '); // Split message on the basis of spaces

  return (
    <View style={[styles.chatMessage, messageStyle]}>
      <View style={styles.messageContainer}>

        {words.map((word, index) => {
          if (word.includes(queryMsg)) {
            
            // If the word includes the queryMsg, split it into parts
            const parts = word.split(new RegExp(`(${queryMsg})`, 'g')).filter(part => part !== '');

            return (
              <Text key={index}>
                {parts.map((part, idx) => (
                  <Text
                    key={idx}
                    style={part === queryMsg ? styles.querychatMessageText : styles.chatMessageText}
                  >
                    {idx === parts.length - 1 ? part + " " : part}
                  </Text>
                ))}
              </Text>
            );

          } else {
            // If the word does not include the queryMsg, display it as is
            return (
              <Text key={index} style={styles.chatMessageText}>
                {word + " "}
              </Text>
            );
          }
        })}

      </View>
      <View style={styles.timestampContainer}>
        <Text style={styles.chatTimestamp}>{timestamp}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  chatMessage: {
    fontSize: 14,
    padding: 10,
    borderRadius: 8,
    marginBottom: 30,
    flexDirection: 'column', // Display message and timestamp in columns
    alignItems: 'flex-start', // Align text to the left
  },
  messageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow message to wrap to the next line if it's too long
  },
  timestampContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start', // Align timestamp to the right
    marginTop: 5, // Add some spacing between message and timestamp
  },
  chatMessageText: {
    color: '#303030',
  },
  querychatMessageText: {
    color: '#FF5F15',
    backgroundColor: 'yellow', // Highlight background for queryMsg
  },
  chatTimestamp: {
    fontSize: 10,
    color: 'black',
    marginLeft: 0,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#DEDEDE',
  },
});


export default Message;
