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
      <ScrollView style={styles.watctList}>
        {list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={() => {}}>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
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
