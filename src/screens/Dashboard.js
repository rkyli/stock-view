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
    this.state = {currentUser: null, errorMessage: null, searchResult: []};
  }
  onPressButton = () => {
    console.log('Press Signout');
    const auth = getAuth();
    signOut(auth)
      .then(() => this.props.navigation('Login'))
      .catch(err => this.setState({errorMessage: err.message}));
  };

  // getSearchResult = result => {
  //   console.log('search result in dashboard:' + result);
  //   this.setState({searchResult: result});
  // };

  render() {
    const {currentUser} = this.state;
    if (this.state.searchResult.length !== 0) {
    }
    return (
      <>
        <SafeAreaView style={[styles.container, {flexDirection: 'column'}]}>
          <SearchBar navigation={this.props.navigation} />
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
    height: '100%',
  },
  rest: {
    height: '50%',
    backgroundColor: '##fff',
  },
});
