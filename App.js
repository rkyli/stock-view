import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
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

export default function App() {
  const Main = createAppContainer(SwitchNavigator);

  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
