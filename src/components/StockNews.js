import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Config from 'react-native-config';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Icon, ListItem} from 'react-native-elements';
const StockNews = props => {
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    //const newsData = require('../mockData/stockNews.json');
    const newsData = async () => {
      await fetch(
        `${Config.MARKETAUX_QUERY_NEWS_URL}?symbols=${props.stockSymbol}&filter_entities=true&language=en&api_token=${Config.MARKETAUX_API_KEY}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => res.json())
        .then(res => {
          console.log('res:' + JSON.stringify(res));
          setNewsList(res.data);
        });
    };
    //setNewsList(newsData.data);
    newsData();
    console.log(
      'erraaa:' +
        `${Config.MARKETAUX_QUERY_NEWS_URL}?symbols=${props.stockSymbol}&filter_entities=true&language=en&api_token=${Config.MARKETAUX_API_KEY}`,
    );
    console.log('news list:' + newsList);
  }, []);

  const redirectToBrowser = url => {
    console.log('url clilcked:' + url);
    Linking.openURL(url);
  };

  const list = [
    {
      title: 'Appointments',
      icon: 'av-timer',
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff',
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>News</Text>

      <ScrollView>
        {newsList.length > 0 ? (
          newsList.map((item, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => redirectToBrowser(item.url)}>
              <Icon name={item.icon} />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))
        ) : (
          <Text style={styles.heading}>No news available yet...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    padding: '1%',
    color: '#fff',
  },
  container: {
    padding: '5%',
    height: '50%',
    percentage: '100%',
    backgroundColor: '#000',
  },
});

export default StockNews;
