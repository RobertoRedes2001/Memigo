import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import PantallasContext from '../Contextos/PantallasContext';

export default function VerMemes({ navigation }) {
  const { imageUri, setImageUri, memeUri, setMemeUri, idMeme, setIdMeme } =
    useContext(PantallasContext);

  const [datos, setDatos] = useState(null);

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

  const renderItem = ({ item, index }) => {
    if (!item) {
      return <View style={styles.emptyItem} />;
    }
    return (
      <TouchableOpacity style={styles.photoContainer} onPress={() => handlePost(item)}>
        <Image style={styles.photo} source={{ uri: item.meme_img }} />
      </TouchableOpacity>
    );
  };
  

  const handleProfile = () => {
    navigation.navigate('User');
  };

  const handlePost = (item) => {
    navigation.navigate('Publicacion', { item });
  };
  

  const onSubmit = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    getDataMemes();
  }, []);

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
        style={{ marginTop: 20 }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={styles.columnWrapper}
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
