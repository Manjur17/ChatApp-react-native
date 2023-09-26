import HeaderMainPanel from "./HeaderMainPanel";
import ContactListComponent from "./ContactListComponent";
import { View, StyleSheet, BackHandler } from "react-native";
import { useEffect } from "react";


const MainPanelComponent = ({ socketCommunicator, connectedClients, username, onUserClick, onLogout,
    dataStorage, onSearch, onBackPress }) => {
    // console.log(socketCommunicator, 'inside main panel component');
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, []);


    const handleBackPress = () => {
        // console.log('connected clients: ', connectedClients);
        onBackPress();
        return true;
    };

    return (
        <View style={styles.container}>
            <HeaderMainPanel socketCommunicator={socketCommunicator}
                onLogout={onLogout} />

            <ContactListComponent
                connectedClients={connectedClients}
                username={username}
                onUserClick={onUserClick}
                dataStorage={dataStorage}
                onSearch={onSearch} />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    // container: {
    //     flex: 1,
    //     margin: 0
    //     //   backgroundColor: 'white',
    // },

    // contactListContainer: {
    //     flex: 5,
    //     margin: 0, // Adjust the spacing between SearchBar and UserComponents
    // },
});

export default MainPanelComponent;
