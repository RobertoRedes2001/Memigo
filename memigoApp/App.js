import * as React from 'react';
import { PantallasProvider } from './components/Contextos/PantallasContext';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import LogIn from './components/Pantallas/LogIn';
import LogUp from './components/Pantallas/LogUp';
import Home from './components/Pantallas/home';
import Usu from './components/Pantallas/User';
import Opciones from './components/Pantallas/Options';
import SubirMeme from './components/Pantallas/SubirMeme';
import EditarPerfil from './components/Pantallas/EditProfile';
import VerMemes from './components/Pantallas/VerMemes';
import CrearMemes from './components/Pantallas/CrearMemes';
import Post from './components/Pantallas/Publicacion';

const Stack = createStackNavigator();

const App = () => (
  <PantallasProvider>
    <NavigationContainer>
      <Stack.Navigator options="false">
        <Stack.Screen
          name="Log In"
          component={LogIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Log Up"
          component={LogUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Proximamente"
          component={CrearMemes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Ver Memes"
          component={VerMemes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Options"
          component={Opciones}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Subir Meme"
          component={SubirMeme}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="User"
          component={Usu}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditarPerfil}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Publicacion"
          component={Post}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </PantallasProvider>
);

const styles = StyleSheet.create({});

export default App;
