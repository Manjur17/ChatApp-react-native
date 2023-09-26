import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SocketCommunicator from './SocketCommunicator'; // Assuming this is the correct import
import RegisterComponent from './components/RegisterComponent';
import StorageClass from './StorageClass'; // Assuming this is the correct import
import MainPanelComponent from './components/MainPanelComponent';
import ChattingComponent from './components/ChattingComponent';
import NotificationComponent from './components/NotificationComponent';
import LogoutNotification from './components/LogoutNotification';


const App = () => {
  const [socket, setSocket] = useState(null);
  const [dataStorage, setDataStorage] = useState(new StorageClass());
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [connectedClients, setConnectedClients] = useState([]);
  const [messageQueue, setMessageQueue] = useState([]);
  const [username, setUsername] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLogout, setLogout] = useState(false);
  const [reloadMainPanel, setReloadMainPanel] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [lastMessageChatId, setLastMessageChatId] = useState(null);
  const [lastSender, setLastSender] = useState(null);
  const [logOutUser, setLogoutUser] = useState(null);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const [isSearch, setIsSearching] = useState(false);
  const [isSearchMessage, setIsSearchingMessage] = useState(false);
  const [queryMsg, setQueryMsg] = useState(null);
  const [lastLogOutUser, setLastLogoutUser] = useState(null);

  useEffect(() => {
    const networkListener = {
      handleEvents: (event, data) => {
        switch (event) {
          case 'registered':
            if (data === 'success') {
              handleRegistrationSuccess();
            }
            break;
          case 'updateClients':
            if (!Array.isArray(data) && data.endsWith('disconnected')) {
              handleLogoutClient(data);
            } else {
              updateClients(data);
            }
            break;
          case 'registerFailed':
            setIsRegistered(false);
            setRegistrationFailed(true);
            setLogout(false);
            break;
          case 'chatting':
            handleChatMessage(data);
            break;
          default:
            break;
        }
      },
    };

    const socketCommunicator = new SocketCommunicator(networkListener);
    setSocket(socketCommunicator);

  }, []);

  useEffect(() => {
    if (lastMessageChatId !== null && lastMessageChatId !== chatId) {
      // Show the notification
      setShowNotification(true);

      // Automatically hide the notification after 5 seconds
      const notificationTimer = setTimeout(() => {
        setShowNotification(false);
      }, 1000); // Adjust the time as needed

      return () => {
        clearTimeout(notificationTimer);
      };
    }
  }, [lastMessageChatId, chatId]);


  const updateClients = (data) => {
    if (!Array.isArray(data)) {
      return;
    }

    dataStorage.updateClients(data);

    const updatedClients = data.map((client, index) => ({
      id: client,
      name: client,
    }));

    setConnectedClients(updatedClients);
  };

  const handleChatMessage = (message) => {
    const newChatId = `${message.sender}_${message.receiver}`;

    // Add the message to data storage
    message.chatId = newChatId;
    dataStorage.addMessage(newChatId, message);
    // Update the last message and time for the sender
    dataStorage.updateLastMessage(message.sender, message.message, message.timestamp);
    // Get the updated message queue for the chatId
    const messageArray = dataStorage.getMessagesForUser(chatId);

    // Update the messageQueue state with the new messageArray
    setMessageQueue([...messageArray]);

    // If the user is not in the selected chat room, show the notification


    if (newChatId !== chatId) {
      // console.log('newChatId: ', newChatId, 'chatId: ', chatId);
      setShowNotification(true);
      setLastMessageChatId(newChatId);
      setLastSender(message.sender);
    }
  };

  const handleMessageSent = (message) => {
    message.chatId = chatId;
    dataStorage.addMessage(chatId, message);
    dataStorage.updateLastMessage(selectedUser, message.message, message.timestamp);
    const messageArray = dataStorage.getMessagesForUser(chatId);
    setMessageQueue([...messageArray]);

  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    setReloadMainPanel(true);
    setLogout(false);
    setRegistrationFailed(false);
  };

  const handleUserClick = (name) => {
    setSelectedUser(name);
    setReloadMainPanel(false);
    const newChatId = `${name}_${username}`; // selectedUser_sender
    setChatId(newChatId); // Update the chatId when a user clicks on a different user

    // Reset the notification state when the user switches chat rooms
    setShowNotification(false);
    setLastMessageChatId(null);
    setLastSender(null);

    // console.log('selectedUser: ', selectedUser, newChatId);
  };

  const handleLogoutClient = (data) => {
    const ind = data.indexOf('is');
    const closedClient = data.substring(0, ind - 1);
    dataStorage.clearMessagesByUser(closedClient); // Delete all messages related to closedClient
    dataStorage.clearLastMessageByUser(closedClient);

    setLogoutUser(closedClient);
    setLastLogoutUser(closedClient);
    setShowLogoutNotification(true);
  }

  const handleBackPress = () => {

    // console.log('not working query msg: ', queryMsg);
    setSelectedUser(null);
    setReloadMainPanel(true);
    // console.log('isSearchMessage: ', isSearchMessage, selectedUser);
  };

  const handleBackPress2 = () => {
    // console.log(' working query msg: ', queryMsg);
    setReloadMainPanel(false);
    setQueryMsg(null);
    setIsSearchingMessage(false);
  }

  const handleRegister = (username) => {
    setUsername(username);
  };

  const handleSenderName = (name) => {
    return;
  };

  const handleLogout = () => {
    dataStorage.clearMessages();
    dataStorage.clearLastMessage();
    setUsername(null);
    setConnectedClients([]);
    setIsRegistered(false);
    setRegistrationFailed(false);
    setSelectedUser(null);
    setLogout(true);
    setReloadMainPanel(false);
    setShowLogoutNotification(false);
    setLastMessageChatId(null);
    setLastSender(null);
    setLogoutUser(null);
    setLastLogoutUser(null);
  };

  const onSearch = (username) => {

    let found = false;
    setIsSearching(true);

    for (const client of connectedClients) {
      if (client.name === username) {
        // console.log('yes', connectedClients);
        setSearchUser([
          {
            id: username,
            name: username
          }
        ]);
        found = true;
        break;
      }
    }
    if (!found) {
      // console.log('no', connectedClients);

      setSearchUser([
        {
          id: 'No username found.',
          name: 'No username found.'
        }
      ]);
    }
  };

  const handleBackPressMain = () => {

    const data = dataStorage.getClients();

    // console.log('data: ', data);

    const updatedClients = data.map((client, index) => ({
      id: client,
      name: client,
    }));

    setConnectedClients(updatedClients);
    setReloadMainPanel(true);
    setSearchUser([]);
    setIsSearching(false);
  }

  const handleSearchMessage = (message) => {
    const chatId = selectedUser;
    // console.log(message, 'from header chatting', 'selected user : ', chatId);

    let hasMessage = dataStorage.hasMessage(chatId, message);
    setIsSearchingMessage(true);

    if (hasMessage) {
      setQueryMsg(message);
    } else {
      setQueryMsg('No message found.');
    }
    // console.log(hasMessage);
  }


  const handleClosedNotify = () => {
    setShowLogoutNotification(false);
    setLogoutUser(null);
  }

  if (selectedUser || isSearchMessage) {
    return (
      <View style={styles.container}>
        <ChattingComponent
          selectedUser={selectedUser}
          onBackPress={handleBackPress}
          onBackPress2={handleBackPress2}
          socketCommunicator={socket}
          dataStorage={dataStorage}
          senderName={username} // Sender name should be the logged-in user
          onHandleMessageSent={handleMessageSent}
          chatId={chatId}
          onSearch={handleSearchMessage}
          queryMsg={queryMsg}
          isSearchMessage={isSearchMessage}
        />
        {showNotification && <NotificationComponent
          visible={showNotification}
          senderName={lastSender}
          onClose={() => setShowNotification(false)}
          chatId={chatId}
        />}

        {showLogoutNotification && (
          selectedUser == null || selectedUser !== logOutUser ? (

            handleClosedNotify(),
            null // Ensure there's no extra rendering output
          ) : (
            <LogoutNotification
              visible={showLogoutNotification}
              onClose={() => setShowLogoutNotification(false)}
              username={logOutUser}
              onConfirm={() => {
                setSelectedUser(null);
                setShowLogoutNotification(false);
                setLogoutUser(null);
              }}
            />
          )
        )}
      </View>
    );
  }


  if (isSearch) {
    return (
      <MainPanelComponent
        socketCommunicator={socket}
        connectedClients={searchUser}
        username={username}
        onUserClick={handleUserClick}
        onLogout={handleLogout}
        dataStorage={dataStorage}
        onSearch={onSearch}
        onBackPress={handleBackPressMain}
      />
    )
  }




  if (isLogout) {
    return (
      <RegisterComponent
        socketCommunicator={socket}
        registrationFailed={registrationFailed}
        logOut={isLogout}
        onRegister={handleRegister}
        onSenderName={handleSenderName}
      />
    );
  }

  if (isRegistered || reloadMainPanel) {
    return (
      <View style={styles.container}>
        <MainPanelComponent
          socketCommunicator={socket}
          connectedClients={connectedClients}
          username={username}
          onUserClick={handleUserClick}
          onLogout={handleLogout}
          dataStorage={dataStorage}
          onSearch={onSearch}
          onBackPress={handleBackPressMain}
        />
        {showNotification && <NotificationComponent
          visible={showNotification}
          senderName={lastSender}
          onClose={() => setShowNotification(false)}
          chatId={chatId}
        />}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <RegisterComponent
        socketCommunicator={socket}
        registrationFailed={registrationFailed}
        logOut={isLogout}
        onRegister={handleRegister}
        onSenderName={handleSenderName}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;



