import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Card} from 'react-native-elements';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    isPhoneAuth: false,
    phoneNumber: '',
    confirmResult: null,
    codeInput: '',
  };
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Dashboard'))
      .catch(err => this.setState({errorMessage: err.message}));
  };

  handlePhoneLogin = () => {
    const auth = getAuth();
    auth.useDeviceLanguage();
    // auth
    //   .signInWithPhoneNumber(this.state.phoneNumber)
    //   .then(confirmResult => this.setState({confirmResult}))
    //   .catch(err => this.setState({errorMessage: err.message}));
  };

  confirmCode = () => {
    const {codeInput, confirmResult} = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          console.log('code confirmed');
        })
        .catch(err => this.setState({errorMessage: err.message}));
    }
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
        <View style={styles.card}>
          <Card borderRadius={20}>
            {/* login using phone number */}
            {this.state.isPhoneAuth && (
              <TextInput
                placeholder="Phone Number"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={phoneNumber => this.setState({phoneNumber})}
                numeric
                value={this.state.phoneNumber}
                keyboardType={'number-pad'}
              />
            )}

            {/* login using email and password */}
            {!this.state.isPhoneAuth && (
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
            )}
            {!this.state.isPhoneAuth && (
              <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
            )}

            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
          </Card>
        </View>
        {/* login using phone number */}
        {this.state.isPhoneAuth && (
          <TouchableOpacity onPress={this.handlePhoneLogin}>
            <View style={styles.signupBtn}>
              <Text style={styles.buttonText}>Log In with OTP</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* login using email and password */}

        {!this.state.isPhoneAuth && (
          <TouchableOpacity onPress={this.handleLogin}>
            <View style={styles.signupBtn}>
              <Text style={styles.buttonText}>Log In</Text>
            </View>
          </TouchableOpacity>
        )}
        {!this.state.isPhoneAuth && (
          <TouchableOpacity onPress={() => this.setState({isPhoneAuth: true})}>
            <View style={styles.phoneButtonView}>
              <Text style={styles.phoneButtonText}>
                Log In using phone number
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {!this.state.isPhoneAuth && (
          <Button
            title="Don't have an account? Sign Up"
            color="#000"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        )}
      </View>
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
    width: 120,
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
  phoneButtonView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
    width: 200,
    height: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  phoneButtonText: {
    color: '#000',
    textAlign: 'center',
  },
});
