import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const StockDetails = props => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.stockHeading}>
        <Text style={styles.stockSymbol}>
          {navigation.getParam('stockSymbol', 'none')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    percentage: '100%',
    justifyContent: 'center',
  },
  stockHeading: {
    height: '20%',
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  stockSymbol: {
    fontSize: 16,
    color: '#fff',
  },
});
export default StockDetails;
