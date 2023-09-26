import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NotificationComponent = ({ visible, senderName, onClose, chatId }) => {
    const [isVisible, setIsVisible] = useState(visible);

    // console.log('chatId inside notification component:', chatId, 'sender name: ', senderName);

    useEffect(() => {
        setIsVisible(visible);
        

        // Automatically hide the notification after 2 seconds
        if (visible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, 1000); // Adjust the time as needed

            return () => {
                clearTimeout(timer);
            };
        }
    }, [visible]);

    if (!isVisible) {
        return null; // Don't render if not visible
    }

    return (
        <View style={styles.container}>
            <Text>{senderName} sent a message</Text>
            <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: 'lightblue', // Customize the background color
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 65,
        left: 0,
        right: 0,
        zIndex: 999,
        borderRadius: 10,
        borderColor: 'black'
    },

    closeButton: {
        backgroundColor: 'red', // Customize the close button background color
        padding: 5,
        borderRadius: 8,
    },
});

export default NotificationComponent;
