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

  const parts = message.split(' '); //split message on the basis of query Msg
  
  // console.log('working inside message')
  // const updatedParts =
  return (

    <View style={[styles.chatMessage, messageStyle]}>

      <View style={styles.messageConatiner}>
        {parts.map((part, index) => (
          <Text
            key={index}
            style={(part === queryMsg) ? styles.querychatMessageText : styles.chatMessageText}
          >
            {index === parts.length - 1 ? part : part + ' '}
          </Text>
        ))}
      </View>

      <View style={styles.timestampContainer}>
        <Text style={styles.chatTimestamp}>{timestamp}</Text>
      </View>

    </View>
  );
};

// const queryStyle = (message.includes(queryMsg)) ? styles.querychatMessageText : styles.chatMessageText;

// return (
//   <View style={[styles.chatMessage, messageStyle]}>
//     <Text style={[queryStyle]}>{message}</Text>
//     <Text style={styles.chatTimestamp}>{timestamp}</Text>
//   </View>
// );


const styles = StyleSheet.create({
  chatMessage: {
    fontSize: 14,
    padding: 10,
    borderRadius: 8,
    marginBottom: 30,

  },
  messageConatiner: {
    flexDirection: 'row'
  },
  timestampContainer: {
    flexDirection: 'column',
    marginLeft: 0, // Add some spacing between message and timestamp
  },

  chatMessageText: {
    color: '#303030',
  },
  querychatMessageText: {
    color: '#FF5F15',
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
