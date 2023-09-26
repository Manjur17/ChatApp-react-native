
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const UserComponent = ({ connectedClients, username, onUserClick, dataStorage }) => {
    // console.log(connectedClients, 'inside user component');

    if (connectedClients.length == 1 && connectedClients[0].name === 'No username found.' ) {
        return (<Text style={styles.noUsersText}>No username found</Text>);
    }

    const newConnectedClients = connectedClients.filter(item => item.name !== username);

    // console.log(username, newConnectedClients, 'inside user component');

    if (newConnectedClients.length === 0) {
        return (<Text style={styles.noUsersText}>No one is online</Text>);
    } else {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.sidebarChats}>

                    {newConnectedClients.map((client) => (
                        <TouchableOpacity key={client.id} onPress={() => onUserClick(client.name)}>
                            <View style={styles.sidebarChat}>
                                <View style={styles.chatAvatar}>
                                    <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
                                </View>
                                <View style={styles.chatInfo}>
                                    <Text style={styles.chatName}>{client.name}</Text>
                                    <Text style={styles.chatMessage}>{dataStorage.getLastMessage(client.name).lastMessage}</Text>
                                </View>
                                <Text style={styles.time}>{dataStorage.getLastMessage(client.name).lastMessageTime}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    sidebarChats: {
        paddingTop: 15,
        margin: 0,
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

    noUsersText: {
        textAlign: 'center',
        marginVertical: 20,
        color: 'gray'
    },
});

export default UserComponent;