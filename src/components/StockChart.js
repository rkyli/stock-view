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

  const mapData = () => {
    let data = timeSeries;
    let mappedData = [];
    for (let key in data) {
      let item = {
        open: parseFloat(data[key]['1. open']),
        close: parseFloat(data[key]['4. close']),
        high: parseFloat(data[key]['2. high']),
        low: parseFloat(data[key]['3. low']),
        x: new Date(key),
      };
      mappedData.push(item);
    }
    return mappedData;
  };
  const getStock = async duration => {
    console.log('duration:' + duration);
    await fetch(
      `${Config.ALPHA_VANTAGE_QUERY_URL}?function=TIME_SERIES_INTRADAY&symbol=${props.stockSymbol}&interval=${duration}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,
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
        priceData = mockData;
        setTimeSeries(priceData);
        //setTimeSeries(priceData[`Time Series (${duration})`]);
        // }
      })
      .then(res => {
        setVisualizedData(mapData);
        console.log('visualizedData:' + JSON.stringify(visualizedData));
      });
  };
  useEffect(() => {
    //let isCancelled = false;
    // let mounted = true;
    const getStockPriceByDuration = async () => {
      await fetch(
        `${Config.ALPHA_VANTAGE_QUERY_URL}?function=TIME_SERIES_INTRADAY&symbol=${props.stockSymbol}&interval=${duration}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,
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
          //   console.log(
          //     'priceData:' +
          //       JSON.stringify(priceData[`Time Series (${duration})`]),
          //   );

          //   let tmp = [];
          //   Object.keys(timeSeries).forEach(key => {
          //     tmp.x = new Date(key);
          //     tmp.open = timeSeries[key]['1. open'];
          //     tmp.close = timeSeries[key]['4. close'];
          //     tmp.high = timeSeries[key]['2. high'];
          //     tmp.low = timeSeries[key]['3. low'];
          //   });
          // if (mounted) {
          const mockData = require('../mockData/intraday.json');
          priceData = mockData;
          setTimeSeries(priceData);
          //setTimeSeries(priceData[`Time Series (${duration})`]);
          // }
        })
        .then(res => {
          //if (mounted) {
          setVisualizedData(mapData);
          //}
          console.log('visualizedData:' + JSON.stringify(visualizedData));
        });
    };

    //getStockPriceByDuration();
  }, [duration]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setDuration('1min')}>
          <Text style={styles.durationText}>1m</Text>
          {/* <Chip title="1m" /> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getStock('5min')}>
          <Text style={styles.durationText}>5m</Text>
        </TouchableOpacity>
      </View>
      <VictoryChart
        style={styles.chart}
        width={400}
        domainPadding={{x: 25}}
        scale={{x: 'time'}}
        theme={VictoryTheme.material}>
        <VictoryAxis
          scale="time"
          tickFormat={t => `${t}`}
          fixLabelOverlap
          style={{tickLabels: {padding: 16, fontSize: 8}}}
        />
        <VictoryAxis
          dependentAxis
          axisLabelsComponent={<VictoryLabel dx={20} />}
        />
        <VictoryCandlestick
          candleColors={{positive: '#31aa52', negative: '#eb4132'}}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#000',
  },
  durationText: {
    fontSize: 13,
    paddingTop: 20,
    paddingLeft: 30,
    color: '#fff',
  },
  chart: {
    background: {fill: '#fff'},
  },
});

export default StockChart;
