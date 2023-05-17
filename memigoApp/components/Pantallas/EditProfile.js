import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Avatar, TextInput, Button } from 'react-native-paper';
import PantallasContext from '../Contextos/PantallasContext';
import * as ImagePicker from 'expo-image-picker';
import background from '../../assets/background.png';

const EditProfileScreen = ({ navigation }) => {
  const { user, setUser, imageUri, setImageUri, idioma, setIdioma, id, setId } =
    useContext(PantallasContext);
  const [newName, setNewName] = useState(user);

  const alertaCambioTitulo =
    idioma == 'es' ? 'Perfil Actualizado' : 'Profile Updated';
  const alertaCambioCuerpo =
    idioma == 'es'
      ? 'Su perfil se ha actualizado con exito'
      : 'Your profile was updated with exit.';
  const alertaUsernameTitulo =
    idioma == 'es' ? 'Error de nombre de usuario' : 'Username error';
  const alertaUsernameCuerpo =
    idioma == 'es'
      ? 'El campo de nombre de usuario esta vacio. Por favor no olvide llenarlo.'
      : "The username field is empty. Please don't forget to fill it out.";
  const handleNameChange = (text) => {
    setNewName(text);
    setUser(text);
  };

  //Peticion PATCH para actualizar el usuario
  const updateUser = async (id, name,photo) => {
    try {
      const url = `http://192.168.1.55:7038/api/usuarios/UpdateUsuario`;
      const data = {
        id: id,
        nombre: name,
        pfp : photo
      };
  
      const response = await fetch(url, {
        method: 'PATCH',
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
  
  
  //Carga la imagen de perfil nueva
  const handleImageChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = result.assets[0].base64;
      setImageUri(base64);
      setisSelected(true);
    }
  };

  //Actualiza el perfil del usuario
  const handleEditProfile = () => {
    if (newName === '') {
      Alert.alert(alertaUsernameTitulo, alertaUsernameCuerpo, [{ text: 'OK' }]);
    } else {
      updateUser(id,newName,imageUri)
      Alert.alert(alertaCambioTitulo, alertaCambioCuerpo, [{ text: 'OK' }]);
      navigation.navigate('User');
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleImageChange}>
            <Avatar.Image
              size={150}
              source={{ uri: `data:image/png;base64,${imageUri}` }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            label={idioma == 'es' ? 'Editar nombre' : 'Edit username'}
            value={newName}
            theme={{ colors: { primary: 'red' } }}
            onChangeText={handleNameChange}
            style={styles.input}
          />
          <Button
            mode="contained"
            color="white"
            style={styles.button}
            onPress={handleEditProfile}>
            {idioma == 'es' ? 'Guardar cambios' : 'Save changes'}
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default EditProfileScreen;
