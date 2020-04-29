import React from 'react'
import { NavigationContainer, DrawerActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'

import Login from './components/Login'
import Home from './components/Home'
import Logout from './components/Logout'
import Dashboard from './components/Dashboard'
import Country from './components/Country'
import HealthAdvice from './components/HealthAdvice'

const Drawer = createDrawerNavigator()

DrawerT = ({ navigation }) => {
  navigation.setOptions({
    title: 'COVID-19 PANDEMIC',
    headerLeft: () => (
      <FontAwesome style={{ marginLeft: 14 }} name='bars' size={40} color={'black'} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
    ),
  })

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: () => <Ionicons name='md-home' size={30} color={"#007bff"} /> }} />
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{ drawerIcon: () => <FontAwesome name='dashboard' size={25} color={"#007bff"} /> }} />
      <Drawer.Screen name="Country" component={Country} options={{ drawerIcon: () => <AntDesign name='earth' size={25} color={"#007bff"} /> }} />
      <Drawer.Screen name="HealthAdvice" component={HealthAdvice} options={{ title: "Health Care", drawerIcon: () => <Ionicons name='md-information-circle' size={30} color={"#007bff"} /> }} />
      <Drawer.Screen name="Logout" component={Logout} options={{ drawerIcon: () => <Ionicons name='md-exit' size={30} color={"red"} /> }} />
    </Drawer.Navigator>
  )
}

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="DrawerT"
          component={DrawerT}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

