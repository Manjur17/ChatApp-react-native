import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const SearchBar = ({onSearch}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() === '') {
      return;
    }
    
    onSearch(searchText);
  };


  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearch}>
          <Image source={require('./search.png')} style={styles.searchIcon} />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search or start new chat"
          onChangeText={(text) => setSearchText(text)}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SearchBar;
