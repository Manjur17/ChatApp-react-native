import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import Header from './HeaderChatting';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

const ChattingComponent = ({
  selectedUser,
  onBackPress,
  onBackPress2,
  socketCommunicator,
  dataStorage,
  senderName,
  onHandleMessageSent,
  chatId,
  onSearch,
  queryMsg,
  isSearchMessage
}) => {

  const messageArray = dataStorage.getMessagesForUser(chatId);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      isSearchMessage ? handleBackPress2 : handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [isSearchMessage]);

  const handleBackPress = () => {
    onBackPress();
    return true;
  };

  const handleBackPress2 = () => {
    if (queryMsg == null) {
      return false;
    }
    onBackPress2();
    return true;
  };

  return (
    <View style={styles.messageContainer}>
      <Header selectedUser={selectedUser} onSearch={onSearch} />
      <MessageDisplay
        selectedUser={selectedUser}
        messages={messageArray}
        username={senderName}
        chatId={chatId} // Pass chatId to MessageDisplay
        queryMsg={queryMsg}
      />
      <MessageInput
        socketCommunicator={socketCommunicator}
        dataStorage={dataStorage}
        selectedUser={selectedUser}
        senderName={senderName}
        onHandleMessageSent={onHandleMessageSent}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 12,
  },
});

export default ChattingComponent;
