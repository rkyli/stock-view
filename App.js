import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import StockDetails from './src/screens/StockDetails';
const AppNavigation = createSwitchNavigator(
  {
    Loading: Loading,
    SignUp: SignUp,
    Login: Login,
    Dashboard: Dashboard,
    StockDetails: StockDetails,
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
  },
);

// const TabNavigator = createBottomTabNavigator({
//   Dashboard: Dashboard,
//   StockDetails: StockDetails,
// });

export default function App() {
  const Main = createAppContainer(AppNavigation);
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
