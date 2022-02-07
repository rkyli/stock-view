import React from 'react';
import {
  Alert,
  Platform,
  Image,
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {getAuth, signOut} from 'firebase/auth';
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
  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <View>
          <Button onPress={this.onPressButton} title="Sign Out" />
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
