import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';
import {getAuth} from 'firebase/auth';
export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  componentDidMount() {
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Dashboard' : 'SignUp');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
