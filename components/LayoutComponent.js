import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
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
    color: '#fbf5f5'
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
  sidebar: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  sidebarChats: {
    paddingTop: 15,
    margin : 0,
    backgroundColor: 'white',
  },
  sidebarChat: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chatName: {
    fontWeight: 'bold',
  },
  chatMessage: {
    fontSize: 13,
    color: 'gray',
  },
  time: {
    fontSize: 13,
    color: 'gray',
  },
  searchBarContainer: {
    backgroundColor: '#f6f6f6',
    padding: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginRight: 15,
    opacity: 0.8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});

const ChatListComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Image source={require('./search.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search or start new chat"
          />
        </View>
      </View>
      <ScrollView style={styles.sidebarChats}>
        {/* Chat items */}
        {/* Replace with actual chat items */}
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        <View style={styles.sidebarChat}>
          <View style={styles.chatAvatar}>
            <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
          </View>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>Mike</Text>
            <Text style={styles.chatMessage}>Hey meet me tomorrow</Text>
          </View>
          <Text style={styles.time}>2:44 pm</Text>
        </View>
        {/* ... repeat for other chat items */}
      </ScrollView>
    </View>
  );
};

export default ChatListComponent;
