import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import Config from 'react-native-config';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Icon, ListItem} from 'react-native-elements';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
const WatchList = () => {
  const auth = getAuth();
  const db = getFirestore();
  const watchListRef = doc(db, 'watchlist', auth.currentUser.uid);
  const navigation = useNavigation();

  const [watchList, setWatchList] = useState([]);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  useEffect(() => {
    const fetchWatchlist = async () => {
      const docSnap = await getDoc(watchListRef);
      if (docSnap.exists()) {
        setWatchList(docSnap.data().stock);
      }
    };
    fetchWatchlist();
  }, [watchListRef]);

  const getStock = async stockSymbol => {
    await fetch(
      `${Config.ALPHA_VANTAGE_QUERY_URL}?function=SYMBOL_SEARCH&keywords=${stockSymbol}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,

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
                x['3. type'] === 'Equity' && x['4. region'] === 'United States',
            ),
          );
          const data = stockData.bestMatches.filter(
            x =>
              x['3. type'] === 'Equity' && x['4. region'] === 'United States',
          );
          setStockSymbol(data['1. symbol']);
          setStockName(data['2. name']);
        }
      })
      .then(() => {
        navigation.navigate('StockDetails', {
          stockSymbol: stockSymbol,
          stockName: stockName,
        });
      });
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
      <Text style={{color: 'white'}}>Watchlist:</Text>
      <ScrollView style={styles.watchList}>
        {watchList?.length > 0 &&
          watchList.map((item, i) => (
            <ListItem key={i} bottomDivider onPress={() => getStock(item)}>
              {/* <Icon name={item.icon} /> */}
              <ListItem.Content>
                <ListItem.Title>{item}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    percentage: '100%',
    backgroundColor: '#000',
  },
  watchList: {
    percentage: '100%',
  },
});
export default WatchList;
