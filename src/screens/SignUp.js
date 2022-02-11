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
import auth from '../environment/config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {Card} from 'react-native-elements';
export default class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  handleSignUp = () => {
    // TODO: Firebase stuff...
    console.log('handleSignUp');
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Dashboard'))
      .catch(err => this.setState({errorMessage: err.message}));
  };

  render() {
    return (
      //    <ImageBackground source={require('./bgImg.png')}
      //       style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.headingSection}>
          {/* <Image source={require('./userImg.png')}
           style={{   width: 100, height: 100 }} />  */}
        </View>
        <Text style={styles.heading}>Sign Up</Text>

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
            {this.state.errorMessage && (
              <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
            )}
          </Card>
        </View>
        <TouchableOpacity onPress={this.handleSignUp}>
          <View style={styles.signupBtn}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
        <Button
          color="#000"
          title="Already have an account? Login "
          onPress={() => this.props.navigation.navigate('Login')}
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
  navigationOptions: {
    title: 'A',
  },
});
