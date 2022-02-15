import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import StockDetails from './src/screens/StockDetails';
// const AppNavigation = createSwitchNavigator(
//   {
//     Loading: Loading,
//     SignUp: SignUp,
//     Login: Login,
//     Dashboard: Dashboard,
//     StockDetails: StockDetails,
//   },
//   {
//     initialRouteName: 'Loading',
//     headerMode: 'none',
//   },
// );

// const TabNavigator = createBottomTabNavigator({
//   Dashboard: Dashboard,
//   StockDetails: StockDetails,
// });

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();

export default function App() {
  //const Main = createAppContainer(AppNavigation);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={({navigation}) => ({
              title: 'StockView',
            })}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={({navigation}) => ({
              title: 'StockView',
              headerLeft: () => null,
            })}
          />
          <Stack.Screen name="StockDetails" component={StockDetails} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Main /> */}
    </SafeAreaProvider>
  );
}
