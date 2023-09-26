import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import SearchBarComponent from './SearchBarComponent';
import UserComponent from './UserComponent';

const ContactListComponent = ({ connectedClients, username, onUserClick, dataStorage, onSearch }) => {

    return (
        <View style={styles.container}>
            <SearchBarComponent onSearch={onSearch} />
            <UserComponent connectedClients={connectedClients}
                username={username} onUserClick={onUserClick}
                dataStorage={dataStorage} />

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0
    },

});

export default ContactListComponent;
