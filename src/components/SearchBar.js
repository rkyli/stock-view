import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
//import {useNavigation} from 'react-navigation';
const SearchBar = props => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  //const navigation = useNavigation();

  useEffect(() => {
    console.log('here:' + searchText);
    //clearTimeOut(this.timeOutId);
    if (searchText) {
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
        .then(stockData => {
          if (stockData !== undefined) {
            console.log(
              stockData.bestMatches.filter(
                x =>
                  x['3. type'] === 'Equity' &&
                  x['4. region'] === 'United States',
              ),
            );
            let filteredStockSearch = stockData.bestMatches.filter(
              x =>
                x['3. type'] === 'Equity' && x['4. region'] === 'United States',
            );
            setSearchResult(filteredStockSearch);
          } else {
            setSearchResult([]);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [searchText]);

  return (
    <>
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
          onChangeText={text => {
            setSearchText(text);
          }}
        />
      </View>
      <View style={styles.searchResultList}>
        <ScrollView>
          {searchText !== '' &&
            searchResult.length !== 0 &&
            searchResult.map(stock => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('StockDetails', {
                    stockSymbol: stock['1. symbol'],
                  });
                }}
                key={stock['1. symbol']}>
                <View style={styles.searchItem} key={stock['1. symbol']}>
                  <Text style={styles.stockSymbol}>{stock['1. symbol']}</Text>
                  <Text style={styles.stockName}>{stock['2. name']}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: '10%',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  searchInput: {
    color: '#fff',
    // borderRadius: 15,
    // borderColor: '#4d4c4c',
    // borderWidth: 3,
    fontSize: 16,
    padding: 10,
  },
  searchItem: {
    borderTopWidth: 1,
    borderTopColor: '#4d4c4c',
    borderBottomWidth: 1,
    borderBottomColor: '#4d4c4c',
  },
  stockSymbol: {
    color: '#fff',
    fontSize: 20,
  },
  stockName: {
    color: '#fff',
  },
  searchResultList: {
    height: '80%',
    backgroundColor: '#000',
    padding: 10,
  },
});
export default SearchBar;
