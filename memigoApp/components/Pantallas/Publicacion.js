import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import pantallasContext from '../Contextos/PantallasContext';
import PostItem from '../Componentes/PostItem';

function Publicaciones({ navigation }) {
  const { user, setUser, imageUri, setImageUri, id, memeImg, setMemeImg,
    memeLikes, setMemeLikes, idMeme, setMemeId } = useContext(pantallasContext);

  const handleMenu = () => {
    navigation.navigate('Ver Memes');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcome}>
          <IconButton
            icon={'arrow-left-bold-box-outline'}
            size={24}
            color={'white'}
            onPress={handleMenu}
          />
        </View>
      </View>
      <PostItem
        id={idMeme}
        image={memeImg}
        likes={memeLikes}
        navigation={navigation}
        name={user}
        pfp={imageUri}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  welcome: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  header: {
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
 
});

export default Publicaciones;
