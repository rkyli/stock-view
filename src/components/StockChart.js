import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';
import {Chip} from 'react-native-elements';
const StockChart = props => {
  //[] means to run only once , if included the parameter, will re-render when that parameter changes

  const [duration, setDuration] = useState('');
  const [timeSeries, setTimeSeries] = useState([]);
  const [visualizedData, setVisualizedData] = useState([]);

  useEffect(() => {
    getTimeSeriesDaily();
  }, []);

  const mapData = data => {
    //let data = timeSeries;
    let mappedData = [];
    for (let key in data) {
      let item = {
        open: parseFloat(data[key]['1. open']),
        close: parseFloat(data[key]['4. close']),
        high: parseFloat(data[key]['2. high']),
        low: parseFloat(data[key]['3. low']),
        x: key,
      };
      mappedData.push(item);
    }
    return mappedData;
  };
  const getStock = async dur => {
    console.log('duration:' + dur);
    await fetch(
      `${Config.ALPHA_VANTAGE_QUERY_URL}?function=TIME_SERIES_INTRADAY&symbol=${props.stockSymbol}&interval=${dur}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(priceData => {
        const mockData = require('../mockData/intraday.json');
        //priceData = mockData;
        //setTimeSeries(priceData);
        // console.log(
        //   'priceData:' + JSON.stringify(priceData[`Time Series (${dur})`]),
        // );
        setDuration(dur);
        setTimeSeries(priceData[`Time Series (${dur})`]);
        return priceData[`Time Series (${dur})`];
      })
      .then(res => {
        const mappedData = mapData(res).reverse();
        // console.log('map:' + JSON.stringify(mappedData));
        setVisualizedData(mappedData);
        // console.log('visualizedData:' + visualizedData);
      });
  };

  const getTimeSeriesDaily = async () => {
    await fetch(
      `${Config.ALPHA_VANTAGE_QUERY_URL}?function=TIME_SERIES_DAILY&symbol=${props.stockSymbol}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(priceData => {
        const mockData = require('../mockData/intraday.json');
        //priceData = mockData;
        //setTimeSeries(priceData);
        // console.log(
        //   'daily data:' + JSON.stringify(priceData['Time Series (Daily)']),
        // );
        setDuration('1D');
        setTimeSeries(priceData['Time Series (Daily)']);
        return priceData['Time Series (Daily)'];
      })
      .then(res => {
        const mappedData = mapData(res).reverse();
        // console.log('map:' + JSON.stringify(mappedData));
        setVisualizedData(mappedData);
        // console.log('visualizedData:' + visualizedData);
      });
  };

  const getRange = t => {
    if (t !== undefined) {
      //   console.log('t:' + t);
      //   console.log('duration:' + duration);
      if (duration === '1D') {
        return t;
      } else {
        //return `${t}`.split(' ')[1];
        return t;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => getStock('1min')}>
          <Text style={styles.durationText}>1m</Text>
          {/* <Chip title="1m" /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getStock('5min')}>
          <Text style={styles.durationText}>5m</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getTimeSeriesDaily()}>
          <Text style={styles.durationText}>1D</Text>
        </TouchableOpacity>
      </View>
      <VictoryChart
        style={styles.chart}
        width={400}
        scale={{x: 'time'}}
        theme={VictoryTheme.material}>
        <VictoryAxis
          scale="time"
          tickFormat={t => getRange(t)}
          fixLabelOverlap
          style={{tickLabels: {padding: 15, fontSize: 8}}}
        />
        <VictoryAxis
          dependentAxis
          axisLabelsComponent={<VictoryLabel dx={20} />}
        />
        <VictoryCandlestick
          candleColors={{positive: '#31aa52', negative: '#eb4132'}}
          candleWidth={0.8}
          data={visualizedData}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    percentage: '20%',
    backgroundColor: '#000',
  },
  row: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000',
    paddingLeft: '5%',
  },
  durationText: {
    fontSize: 13,
    paddingTop: 20,
    paddingLeft: 30,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  chart: {
    background: {fill: '#fff'},
  },
});

export default StockChart;
