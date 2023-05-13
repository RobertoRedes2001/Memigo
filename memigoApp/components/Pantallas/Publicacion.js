import React, { useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import pantallasContext from '../Contextos/PantallasContext';
import PostItem from '../Contextos/PostItem';

function Publicaciones({ navigation }) {
  const { user, setUser, imageUri, setImageUri } = useContext(pantallasContext);

  const handleMenu = () => {
    navigation.navigate('Ver Memes');
  };

  const handleProfile = () => {
    navigation.navigate('User');
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
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={() => handleProfile()}>
          <Image
            source={{ uri: `data:image/png;base64,${imageUri}` }}
            resizeMode="cover"
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}>{user}</Text>
      </View>
      <PostItem
        image="https://rerollcdn.com/STARRAIL/Characters/Full/1001.png"
        likes={5}
        navigation={navigation}
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
  postHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
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

export default Publicaciones;
