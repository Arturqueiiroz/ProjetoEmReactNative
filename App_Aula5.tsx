{/* 
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./src/presentation/views/home/Home";
import { RegisterScreen } from "./src/presentation/views/Register/Register";

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
}

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: 'Novo usuário',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
 
export default App
 */}