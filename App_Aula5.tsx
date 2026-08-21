import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./scr/Presentation/views/home/Home";
import { RegisterScreen } from "./scr/Presentation/views/register/Regiser";
import { RecuperarSenhaScreen } from "./scr/Presentation/views/PassagemEmail/PassagemEmail";
import { AlterarSenhaScreen } from "./scr/Presentation/views/AlterarSenha/AlterarSenha";

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  PassagemEmail: undefined;
  AlterarSenha: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name='HomeScreen'
          component={HomeScreen}
        />
        <Stack.Screen
          name='RegisterScreen'
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: 'Novo usuário',
          }}
        />
        <Stack.Screen
          name='PassagemEmail'
          component={RecuperarSenhaScreen}
          options={{
            headerShown: true,
            title: 'Recuperar senha',
          }}
        />
        <Stack.Screen
          name='AlterarSenha'
          component={AlterarSenhaScreen}
          options={{
            headerShown: true,
            title: 'Alterar senha',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
 
export default App