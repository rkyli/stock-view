import React, {Fragment} from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';

const SwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    Dashboard: Dashboard,
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
  },
);

const App = createAppContainer(SwitchNavigator);
export default App;
