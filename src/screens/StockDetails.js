import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StockChart from '../components/StockChart';
import StockQuote from '../components/StockQuote';
import {Icon} from 'react-native-elements';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
const StockDetails = ({route, navigation}) => {
  const {stockSymbol, stockName} = route.params;
  const [starState, setStarState] = useState(false);
  const auth = getAuth();

  //firestore
  const db = getFirestore();
  const watchListRef = doc(db, 'watchlist', auth.currentUser.uid);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const docSnap = await getDoc(watchListRef);
      if (docSnap.exists()) {
        console.log('watchlist data:' + JSON.stringify(docSnap.data()));
        if (docSnap.data().stock.includes(stockSymbol)) {
          setStarState(true);
        }
      }
    };
    fetchWatchlist();
  }, [stockSymbol, watchListRef]);

  const updateWatchList = async () => {
    console.log('auth:' + JSON.stringify(auth.currentUser));
    const docSnap = await getDoc(watchListRef);

    //check for watchlist existence
    if (docSnap.exists()) {
      console.log('watchlist data:' + docSnap.data());

      //check for current stock symbol existence
      //if true, remove it (clicking the star icon again)
      if (docSnap.data().stock.includes(stockSymbol)) {
        const tmp = docSnap.data().stock.filter(x => x !== stockSymbol);
        console.log('tmp:' + tmp);
        await setDoc(watchListRef, {
          stock: tmp,
        }).then(() => setStarState(false));
      } else {
        //doc.data() will be undefined
        //create new watchlist for the user
        await setDoc(
          watchListRef,
          {
            stock: arrayUnion(stockSymbol),
          },
          {merge: true},
        ).then(res => {
          setStarState(!starState);
        });
      }
    } else {
      //doc.data() will be undefined
      //create new watchlist for the user
      await setDoc(
        watchListRef,
        {
          stock: [stockSymbol],
        },
        {merge: true},
      ).then(res => {
        setStarState(!starState);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stockHeading}>
        <View style={styles.row}>
          <Text style={styles.stockName}>{stockName}</Text>
          <TouchableOpacity onPress={() => updateWatchList()}>
            <Icon
              name={starState ? 'star' : 'star-outline'}
              type="ionicon"
              color="#fbbd01"
            />
          </TouchableOpacity>
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
