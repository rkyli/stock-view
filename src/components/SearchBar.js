import React, {useState, useEffect} from 'react';
import {
  Alert,
  Platform,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import Config from 'react-native-config';
import {Input} from 'react-native-elements';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch(
      `${Config.ALPHA_VANTAGE_QUERY_URL}?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(stockData => console.log(stockData))
      .catch(err => console.error(err));
  }, [searchText]);

  return (
    <View style={styles.searchBar}>
      <Input
        style={styles.searchInput}
        placeholder="search stock symbol here.."
        placeholderTextColor="#fff"
        leftIcon={{
          type: 'font-awesome-5',
          name: 'search',
          color: 'white',
          size: 15,
        }}
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  searchInput: {
    color: 'white',
    // borderRadius: 15,
    // borderColor: '#4d4c4c',
    // borderWidth: 3,
    fontSize: 16,
    padding: 10,
  },
  rest: {
    flex: 10,
    backgroundColor: '##fff',
  },
});
export default SearchBar;
