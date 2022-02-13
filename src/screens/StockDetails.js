import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StockChart from '../components/StockChart';
import StockQuote from '../components/StockQuote';
const StockDetails = ({route, navigation}) => {
  const {stockSymbol, stockName} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.stockHeading}>
        <View style={styles.row}>
          <Text style={styles.stockName}>{stockName}</Text>
        </View>
        <Text style={styles.stockSymbol}>{stockSymbol}</Text>
      </View>
      <View style={styles.stockQuote}>
        <StockQuote stockSymbol={stockSymbol} />
      </View>
      <View style={styles.stockChart}>
        <StockChart stockSymbol={stockSymbol} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    percentage: '100%',
  },
  stockHeading: {
    percentage: '20%',
    padding: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
  },
  stockQuote: {
    percentage: '20%',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  stockSymbol: {
    fontSize: 12,
    color: '#d8d8d8',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  stockName: {
    fontSize: 15,
    color: '#fff',
  },
  stockChart: {
    percentage: '40%',
  },
});
export default StockDetails;
