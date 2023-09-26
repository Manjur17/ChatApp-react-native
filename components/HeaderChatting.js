import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Header = ({ selectedUser, onSearch }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      setSearchText('');
    }

  };

  const handleSearch = () => {
    if (searchText.trim() === '') {
      return;
    }

    onSearch(searchText)
  }

  return (
    <View style={styles.header}>
      <View style={styles.chatTitle}>
        <View style={styles.avatar}>
          <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
        </View>
        <View style={styles.messageHeaderContent}>
          <Text style={styles.chatTitleText}>{selectedUser}</Text>
          <Text style={styles.chatStatus}>online</Text>
        </View>
      </View>
      
      <View style={styles.chatHeaderRight}>
        <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
          <Animatable.View
            style={[styles.searchContainer, isSearchOpen ? styles.searchOpen : styles.searchClosed]}
            animation={isSearchOpen ? 'slideInRight' : 'slideOutRight'} // Use slideInRight and slideOutRight animations
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Search message"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />

            <TouchableOpacity  style={styles.searchMsgButton} onPress={handleSearch}>
              <Text>Search</Text>
            </TouchableOpacity>

          </Animatable.View>
          <Image source={require('./search.png')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#075e54',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  chatTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  messageHeaderContent: {
    marginLeft: 15,
  },
  chatTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  chatStatus: {
    fontSize: 12,
    color: 'white',
  },
  chatHeaderRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginHorizontal: 5,
    opacity: 0.4,
  },
  searchButton: {
    position: 'relative',
  },
  searchMsgButton :{
    padding:8,
    marginHorizontal : 30,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    right: -250, // Initial position, adjust as needed
    width: 250, // Width of the search box
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchOpen: {
    right: 0, // Final position when open
    borderRadius: 8
  },
  searchInput: {
    flex: 1,
    padding: 5,
  },
  searchClosed: {
    right: -260, // Position when closed
  },
});

export default Header;







// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const Header = ({selectedUser}) => {
//   return (
//     <View style={styles.header}>
//       <View style={styles.chatTitle}>
//         <View style={styles.avatar}>
//           <Image source={require('./avatar1.jpg')} style={styles.avatarImage} />
//         </View>
//         <View style={styles.messageHeaderContent}>
//           <Text style={styles.chatTitleText}>{selectedUser}</Text>
//           <Text style={styles.chatStatus}>online</Text>
//         </View>
//       </View>
//       <View style={styles.chatHeaderRight}>

//         <Image source={require('./search.png')} style={styles.headerIcon} />

//         {/* <Image source={require('./more.svg')} style={styles.headerIcon} /> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#075e54',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0, 0, 0, 0.1)',
//   },
//   chatTitle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   avatarImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   messageHeaderContent: {
//     marginLeft: 15,
//   },
//   chatTitleText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   chatStatus: {
//     fontSize: 12,
//     color: 'white',
//   },
//   chatHeaderRight: {
//     flexDirection: 'row',
//   },
//   headerIcon: {
//     width: 20,
//     height: 20,
//     marginHorizontal: 5,
//     opacity: 0.4,
//     // backgroundColor: '#075e54',
//   },
// });

// export default Header;
