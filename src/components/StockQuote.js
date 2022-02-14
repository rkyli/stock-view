import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
const StockQuote = props => {
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    const getQuote = async () => {
      await fetch(
        `${Config.ALPHA_VANTAGE_QUERY_URL}?function=GLOBAL_QUOTE&symbol=${props.stockSymbol}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => res.json())
        .then(quoteData => {
          if (quoteData !== undefined) {
            const mockData = require('../mockData/stockQuote.json');
            //quoteData = mockData;
            console.log('quo:' + JSON.stringify(quoteData['Global Quote']));
            setQuote(quoteData['Global Quote']);
          }
        });
    };
    if (!isCancelled) {
      console.log('calling getQuote..');
    }

    getQuote();
    return () => {
      isCancelled = true;
    };
  }, [props.stockSymbol]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.quoteText}>
          Latest trading day: {quote['07. latest trading day']}
        </Text>
        <Text style={styles.quoteText}>Vol: {quote['06. volume']}</Text>
        <View style={[styles.priceRow, {alignItems: 'flex-end'}]}>
          <Text
            style={[
              styles.price,
              quote['09. change'] > 0 ? styles.positive : styles.negative,
            ]}>
            {Number.parseFloat(quote['05. price']).toFixed(3)}
          </Text>
          {quote['09. change'] > 0 ? (
            <Icon name="angle-up" type="font-awesome-5" color="#31aa52" />
          ) : (
            <Icon name="angle-down" type="font-awesome-5" color="#eb4132" />
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.quoteText}>
          High:
          {Number.parseFloat(quote['03. high']).toFixed(3)}
        </Text>
        <Text style={styles.quoteText}>
          Open: {Number.parseFloat(quote['02. open']).toFixed(3)}
        </Text>
        <View style={[styles.changeRow, {alignItems: 'flex-end'}]}>
          <Text
            style={[
              styles.change,
              quote['09. change'] > 0 ? styles.positive : styles.negative,
            ]}>
            {Number.parseFloat(quote['09. change']).toFixed(3)}
          </Text>
          <Text
            style={[
              styles.changePercent,
              quote['09. change'] > 0 ? styles.positive : styles.negative,
            ]}>
            {quote['10. change percent']}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.quoteText}>
          Low: {Number.parseFloat(quote['04. low']).toFixed(3)}
        </Text>
        <Text style={styles.quoteText}>
          Prev. Close:
          {Number.parseFloat(quote['08. previous close']).toFixed(3)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    percentage: '20%',
    backgroundColor: '#000',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000',
    paddingTop: 10,
  },
  quoteText: {
    fontSize: 11,
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  price: {
    fontSize: 20,
    color: '#fff',
  },
  change: {
    fontSize: 11,
  },
  priceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000',
    paddingLeft: '1%',
  },
  changeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000',
    paddingLeft: '20%',
  },
  changePercent: {
    fontSize: 11,
    paddingLeft: '2%',
  },
  positive: {
    color: '#31aa52',
  },
  negative: {
    color: '#eb4132',
  },
});

export default StockQuote;
