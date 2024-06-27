import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import Languages from "./app/screens/Languages";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "./app/screens/Welcome";
import BottomTabNav from "./BottomTabNav";
import "react-native-gesture-handler";

export default function App() {

  const Stack = createNativeStackNavigator();


  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Languages" component={Languages} navigationOptions={{headerShown:false}}/>
        <Stack.Screen name="Home" component={BottomTabNav} navigationOptions={{headerShown:false,  headerBackTitle: "none",
        headerBackTitleVisible: false,
        headerMode: "screen",}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


