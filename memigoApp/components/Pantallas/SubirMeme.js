import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import background from '../../assets/background.png';
import PantallasContext from '../Contextos/PantallasContext';

export default function LogUpScreen({ navigation }) {
  const { imageUri, setImageUri, idioma, setIdioma, memeUri, setMemeUri, id, setId } =
    useContext(PantallasContext);

  const [isSelected, setisSelected] = useState(false);
  const seHaSubidoTitulo = idioma == 'es' ? 'Meme Subido' : 'Meme Uploaded';
  const seHaSubidoCuerpo =
    idioma == 'es' ? 'Su MEME ha sido subido con exito.' : 'MEME! Approved';
  const noHaSubidoTitulo = idioma == 'es' ? 'No ha subido nada.' : 'Nothing was Uploaded!';
  const noHaSubidoCuerpo =
    idioma == 'es' ? 'No ha subido nada... todavia.' : 'why are you like this?';

  const postMeme = async (idUsu, meme) => {
    try {
      const url = `http://192.168.1.55:7038/api/memes/PostMeme`;
      const data = {
        idUser: idUsu,
        memeImg: meme,
        likes: 0
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Usuario actualizado correctamente');
        // Realiza acciones adicionales después de la actualización exitosa
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al actualizar el usuario:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = result.assets[0].base64;
      setMemeUri(base64);
      setisSelected(true);
    }
  };

  const onSubmitMeme = () => {
    if (!isSelected) {
      Alert.alert(noHaSubidoTitulo, noHaSubidoCuerpo, [{ text: 'OK' }]);
    } else {
      postMeme(id,memeUri);
      Alert.alert(seHaSubidoTitulo, seHaSubidoCuerpo, [{ text: 'OK' }]);
      setMemeUri('');
      setisSelected(false);
    }

  };

  const handleProfile = () => {
    setMemeUri('');
    navigation.navigate('User');
  };

  const onSubmit = () => {
    setMemeUri('');
    navigation.navigate('Home');
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
        <Text style={styles.title}>
          {idioma == 'es' ? 'SUBIR MEME' : 'UPLOAD MEME!'}
        </Text>
        {memeUri && (
          <Image
            source={{ uri: `data:image/png;base64,${memeUri}` }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Button
          mode="contained"
          onPress={pickImage}
          style={{ width: '75%', marginBottom: 20, marginTop: 20 }}
          color={isSelected ? 'blue' : 'black'}>
          {idioma == 'es' ? 'Seleccionar imagen' : 'Pick an image'}
        </Button>
        <Button
          mode="contained"
          style={{ width: '50%', marginBottom: 20 }}
          color="white"
          onPress={onSubmitMeme}>
          {idioma == 'es' ? 'Subir' : 'Upload'}
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
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
    backgroundColor: 'red'
  },
  header: {
    height: 80,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
