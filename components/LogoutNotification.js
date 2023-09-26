import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LogoutNotification = ({ isVisible, onClose, username, onConfirm }) => {

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => onClose()}
        >
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.message}>{`${username} has logged out`}</Text>
                    <TouchableOpacity onPress={() => onConfirm()} style={styles.button}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    innerContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LogoutNotification;

//console.log('selecteduser: ', selectedUser, "logOutUser: ", logOutUser, "lastLogOutUser: ", lastLogOutUser, showLogoutNotification)