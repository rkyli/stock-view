import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Card} from 'react-native-elements';
export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Dashboard'))
      .catch(err => this.setState({errorMessage: err.message}));
  };
  render() {
    return (
      //  <ImageBackground source={require('./bgImg.png')}
      // style={{ width: '100%', height: '100%' }}>

      <View style={styles.container}>
        <View style={styles.headingSection}>
          {/* <Image source={require('./userImg.png')}
      style={{ width: 100, height: 100 }} /> */}
        </View>
        <Text style={styles.heading}>StockView</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <View style={styles.card}>
          <Card borderRadius={20}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </Card>
        </View>
        <TouchableOpacity onPress={this.handleLogin}>
          <View style={styles.signupBtn}>
            <Text style={styles.buttonText}>Log In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlePhoneLogin}>
          <View style={styles.signupBtn}>
            <Text style={styles.buttonText}>Log In using phone number</Text>
          </View>
        </TouchableOpacity>
        <Button
          title="Don't have an account? Sign Up"
          color="#000"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
      // </ImageBackground>
    );
  }
}
const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    height: heightConst - 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  headingSection: {
    borderColor: 1,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  heading: {
    color: '#000',
    fontSize: 26,
    marginBottom: 10,
  },
  card: {
    width: '90%',
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 8,
    color: '#000',
  },
  signupBtn: {
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    width: 100,
    height: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
  },
});
