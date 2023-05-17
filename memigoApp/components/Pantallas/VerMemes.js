import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text
} from 'react-native';
import { IconButton } from 'react-native-paper';
import PantallasContext from '../Contextos/PantallasContext';

export default function VerMemes({ navigation }) {
  const { id, setId, imageUri, setImageUri, userType, setUserType,
    memeUri, setMemeUri, memeImg, setMemeImg, memeLikes, setMemeLikes, idMeme, setIdMeme,
    otherId, setOtherId, otherUser, setOtherUser, otherImageUri, setOtherImageUri
  } = useContext(PantallasContext);

  const [datos, setDatos] = useState(null);

  //Carga la informacion de todos los memes en la base de datos mediante una llamada a la API
  const getDataMemes = async () => {
    try {
      const response = await fetch('http://192.168.1.55:7038/api/memes');
      if (response.ok) {
        const data = await response.json();
        setDatos(data);
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al obtener los memes:', error);
    }
  };

  //Carga la informacion de un meme en base a su ID mediante una llamada a la API
  const getDataMeme = async (meme) => {
    try {
      const response = await fetch('http://192.168.1.55:7038/api/memes/GetMeme/' + meme);
      if (response.ok) {
        const data = await response.json();
        setMemeImg(data[0].memeImg);
        setMemeLikes(data[0].likes);
        setOtherId(data[0].idUser);
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al obtener los memes:', error);
    }
  };
  //Carga la informacion de un usuario en base a su ID mediante una llamada a la API
  const getDataUser = async (id) => {
    try {
      const response = await fetch('http://192.168.1.55:7038/api/usuarios/GetUsuario/' + id);
      if (response.ok) {
        const data = await response.json();
        setOtherImageUri(data[0].userImg);
        setOtherUser(data[0].username);
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al obtener los memes:', error);
    }
  };

  //Renderiza un meme en la FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.photoContainer} onPress={() => handlePost(item.idMeme)}>
      <Image style={styles.photo} source={{ uri: `data:image/png;base64,${item.memeImg}` }} />
    </TouchableOpacity>
  );


  const handleProfile = () => {
    navigation.navigate('User');
  };

//Navega a una publicacion  en base al id del elemento renderizado en la flatlist
  const handlePost = async(x)=>{
    setIdMeme(x);
    await Promise.all([getDataMeme(x)]);
    navigation.navigate('Publicacion');
    
  }


  const onSubmit = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataMemes();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
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
      <FlatList
        data={datos}
        keyExtractor={(item) => item.idMeme}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  emptyItem: {
    width: '49%',
    aspectRatio: 1,
  },
  photoContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: 200,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
    width: 200,
    height: 200,
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
    backgroundColor: 'red',
  },
});
