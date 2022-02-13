import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

const StockChart = props => {
  //[] means to run only once , if included the parameter, will re-render when that parameter changes
  useEffect(() => {
    console.log('symbol in chart:' + props.stockSymbol);
  }, [props.stockSymbol]);

  return (
    <View style={styles.container}>
      <VictoryChart
        style={styles.chart}
        width={400}
        theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
};

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
];

const styles = StyleSheet.create({
  container: {
    percentage: '20%',
    backgroundColor: '#000',
  },
  chart: {
    background: {fill: '#fff'},
  },
});

export default StockChart;
