import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  Text,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import background from '../../assets/background.png';
import PantallasContext from '../Contextos/PantallasContext';
import flagSpain from '../../assets/sp.png';
import flagUK from '../../assets/uk.png';

export default function Options({ navigation }) {
  const { imageUri, setImageUri, idioma, setIdioma, user, setUser } =
    useContext(PantallasContext);

  const borrarTitulo = idioma == 'es' ? '¿Estas seguro?' : 'Are you sure?';
  const borrarCuerpo =
    idioma == 'es'
      ? '¿Realmente quieres borrar tu cuenta? Esta acción no se puede deshacer.'
      : 'Do you truly want to delete your account? :(';
  const borrarOpcion1 = idioma == 'es' ? 'Cancelar' : 'Cancel';
  const borrarOpcion2 = idioma == 'es' ? 'Borrar Cuenta' : 'Delete Account';

  const toggleLanguage = () => {
    setIdioma(idioma === 'es' ? 'uk' : 'es');
  };

  const handleCloseSesion = () => {
    navigation.navigate('Log In');
  };

  const handleProfile = () => {
    navigation.navigate('User');
  };

  const onSubmit = () => {
    navigation.navigate('Home');
  };

  const borrarCuenta = () => {
    setImageUri('');
    setUser('');
    navigation.navigate('Log In');
  }

  const handleDeleteAccount = () => {
    Alert.alert(borrarTitulo, borrarCuerpo, [
      {
        text: borrarOpcion1,
        style: 'cancel',
      },
      {
        text: borrarOpcion2,
        style: 'destructive',
        onPress: () => borrarCuenta(),
      },
    ]);
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.header}>
        <View style={styles.welcome}>
          <IconButton
            icon={'arrow-left-bold-box-outline'}
            size={24}
            color={'white'}
            onPress={onSubmit}
          />
        </View>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={() => handleProfile()}>
          <Image
            source={{ uri: `data:image/png;base64,${imageUri}` }}
            resizeMode="cover"
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Button
          mode="contained"
          style={styles.button}
          color="white"
          onPress={handleCloseSesion}>
          {idioma == 'es' ? 'Cerrar Sesion' : 'Log Out'}
        </Button>
        <View>
          <Switch
            style={styles.switch}
            trackColor={{ false: '#d3d3d3', true: '#d3d3d3' }}
            thumbColor={idioma === 'es' ? 'red' : 'blue'}
            onValueChange={toggleLanguage}
            value={idioma === 'es'}
          />
          {idioma === 'es' ? (
            <Image source={flagSpain} style={styles.flag} />
          ) : (
            <Image source={flagUK} style={styles.flag} />
          )}
        </View>
        <Button
          mode="contained"
          style={styles.button}
          color="black"
          onPress={handleDeleteAccount}>
          {idioma == 'es' ? 'Borrar Cuenta' : 'Delete Account'}
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '75%',
    marginTop: 50,
    marginBottom: 50,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  switch: {
    marginRight: 10,
    alignItems: 'center',
  },
  flag: {
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  welcome: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  avatarWrapper: {
    width: 30,
    height: 30,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  avatar: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor:'red'
  },
});
