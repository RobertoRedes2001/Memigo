import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export default function PostItem({ id, image, likes }) {
  
  const [liked, setLiked] = useState(false);
  const [meGustas, setMeGustas] = useState(likes);

  //Hace una peticion a la API para actualizar los Me Gustas de un meme
  const updateLike = async (id) => {
    try {
      const url = `http://192.168.1.55:7038/api/memes/LikeMeme`;
      const data = {
        id: id,
      };
  
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log('Meme Likeado');
        // Realiza acciones adicionales después de la actualización exitosa
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al actualizar el meme:', error);
    }
  };
  //Hace una peticion a la API para actualizar los Me Gustas de un meme
  const updateDislike = async (id) => {
    try {
      const url = `http://192.168.1.55:7038/api/memes/DislikeMeme`;
      const data = {
        id: id,
      };
  
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log('Meme Dislikeado');
        // Realiza acciones adicionales después de la actualización exitosa
      } else {
        console.log('Error en la respuesta:', response.status);
      }
    } catch (error) {
      console.log('Error al actualizar el meme:', error);
    }
  };

  //Actualiza el me gusta al pulsar en el icono y actualiza el numero de likes
  const darFav = async () => {
    if(liked){
      setLiked(false)
      setMeGustas(meGustas-1);
      await Promise.all([updateDislike(id)]);
    }else{
      setLiked(true)
      setMeGustas(meGustas+1);
      await Promise.all([updateLike(id)]);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `data:image/png;base64,${image}`}} style={styles.image}/>
      <View style={styles.actions}>
        <IconButton
          icon={liked ? 'heart' : 'heart-outline'}
          color={liked ? 'red' : 'black'}
          size={30}
          onPress={darFav}
        />
        <Text style={styles.likes}>{meGustas} likes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  likes: {
    marginLeft: 10,
    fontSize: 16,
  },
});
