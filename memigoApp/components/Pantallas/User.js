import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import PantallasContext from '../Contextos/PantallasContext';

export default function Perfil({ navigation }) {
  const { user, setUser, imageUri, setImageUri, idioma, setIdioma, id, setId, 
    idMeme, setIdMeme, memeImg, setMemeImg, memeLikes, setMemeLikes } =
    useContext(PantallasContext);

  const [ datos, setDatos ] = useState(null);
  const [ publicaciones, setPublicaciones ] = useState(0);
  const [ likes, setLikes ] = useState(0);

  //Get de los Memes del usuario de perfil
  const getDataMemes = async (user) => {
    try {
      const response = await fetch('http://192.168.1.55:7038/api/memes/GetMemeUser/'+user);
      if (response.ok) {
        const data = await response.json();
        setDatos(data);
        calcularPerfil(data);
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al obtener los memes:', error);
    }
  };

  //Get del meme sobre el que se a presionado
  const getDataMeme = async (meme) => {
    try {
      const response = await fetch('http://192.168.1.55:7038/api/memes/GetMeme/' + meme);
      if (response.ok) {
        const data = await response.json();
        setMemeImg(data[0].memeImg);
        setMemeLikes(data[0].likes);
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al obtener los memes:', error);
    }
  };

  //Funcion para hacer recuento de publicaciones y likes de un usuario
  function calcularPerfil(data){
    let corazones=0
    for(let i=0;i<data.length;i++){
        corazones+=data[i].likes;
    }
    setPublicaciones(data.length);
    setLikes(corazones);
  }

  //Foto que se renderiza en el FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.photoContainer} onPress={() => handlePost(item.idMeme)}>
      <Image style={styles.photo} source={{ uri: `data:image/png;base64,${item.memeImg}` }} />
    </TouchableOpacity>
  );

  const handleEditProfile = () => {
    navigation.navigate('Edit Profile');
  };

  const handlePost = async (id) => {
    setIdMeme(id);
    await Promise.all([getDataMeme(id)]);
    navigation.navigate('Publicacion');
  };

  const onSubmit = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataMemes(id);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={'arrow-left-bold-box-outline'}
          size={24}
          color={'white'}
          onPress={onSubmit}
        />
        <Text style={styles.headerText}>
          {idioma == 'es' ? 'Perfil' : 'Profile'}
        </Text>
      </View>
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: `data:image/png;base64,${imageUri}` }}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.name}>{user}</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{publicaciones}</Text>
              <Text style={styles.statLabel}>
                {idioma == 'es' ? 'Publicaciones' : 'Posts'}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{likes}</Text>
              <Text style={styles.statLabel}>
                {idioma == 'es' ? 'Me gustas' : 'Likes'}
              </Text>
            </View>
          </View>
          <Button
            mode="outlined"
            style={styles.editProfileButton}
            color="red"
            onPress={handleEditProfile}>
            {idioma == 'es' ? 'Editar Perfil' : 'Edit Profile'}
          </Button>
        </View>
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileDetails: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  stat: {
    marginRight: 30,
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    color: '#777',
    fontSize: 12,
  },
  editProfileButton: {
    borderColor: 'red',
    marginTop: 10,
    alignSelf: 'flex-start',
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
    marginTop: 10,
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
});
