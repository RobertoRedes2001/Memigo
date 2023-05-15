import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import background from '../../assets/background.png';
import PantallasContext from '../Contextos/PantallasContext';

export default function Home({ navigation }) {
  const { user, setUser, imageUri, setImageUri, idioma, setIdioma } =
    useContext(PantallasContext);

  const handleOptions = () => {
    navigation.navigate('Options');
  };

  const handUploadMeme = () => {
    navigation.navigate('Subir Meme');
  };

  const handleProfile = () => {
    navigation.navigate('User');
  };

  const handleVerMeme = () => {
    navigation.navigate('Ver Memes');
  };

  const handleProximamente = () => {
    navigation.navigate('Proximamente');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.header}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            {idioma == 'es' ? 'Bienvenido, ' + user : 'Welcome, ' + user}{' '}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={() => handleProfile()}>
          <Image
            source={{ uri: `data:image/jpg;base64,${imageUri}` }}
            resizeMode="cover"
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          {idioma == 'es' ? '¡Echate un Memigo!' : 'You want it, you got it!'}
        </Text>
        <Button
          mode="contained"
          style={styles.button}
          color="black"
          onPress={handleVerMeme}>
          {idioma == 'es' ? 'Ver Meme' : 'Watch Meme'}
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          color="white"
          onPress={handUploadMeme}>
          {idioma == 'es' ? 'Subir Meme' : 'Upload Meme'}
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          color="black"
          onPress={handleProximamente}>
          {idioma == 'es' ? 'Crear Meme' : 'Create Meme'}
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          color="white"
          onPress={handleOptions}>
          {idioma == 'es' ? 'Opciones' : 'Options'}
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
  welcome: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    backgroundColor: 'white',
  },
  button: {
    width: '75%',
    marginBottom: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
