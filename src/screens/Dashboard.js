import React from 'react';
import {
  Alert,
  Platform,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import {Input} from 'react-native-elements';
import {getAuth, signOut} from 'firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
import Config from 'react-native-config';
import SearchBar from '../components/SearchBar';
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null, errorMessage: null};
  }
  onPressButton = () => {
    console.log('Press Signout');
    const auth = getAuth();
    signOut(auth)
      .then(() => this.props.navigation('Login'))
      .catch(err => this.setState({errorMessage: err.message}));
  };

  searchAllStocks = async text => {
    console.log('searching keyword: ' + text);
    console.log('ALPHA URL: ' + Config.ALPHA_VANTAGE_QUERY_URL);

    // turn search all stocks to functional components and return here?
    try {
      const res = fetch(
        `${Config.ALPHA_VANTAGE_QUERY_URL}?function=SYMBOL_SEARCH&keywords=${text}&apikey=${Config.ALPHA_VANTAGE_API_KEY}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {currentUser} = this.state;
    return (
      <>
        <SafeAreaView style={[styles.container, {flexDirection: 'column'}]}>
          <SearchBar />
          <View style={styles.rest} />
        </SafeAreaView>
      </>
    );
  }

  componentDidMount() {
    const {currentUser} = getAuth();
    this.setState({currentUser});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rest: {
    flex: 10,
    backgroundColor: '##fff',
  },
});
