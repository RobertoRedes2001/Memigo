import React, { useContext } from 'react';
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

const data = [
  { id: '1', image: require('../../assets/pera.jpg') },
  { id: '2', image: require('../../assets/mandarina.jpg') },
  { id: '3', image: require('../../assets/manzanas.jpg') },
  { id: '4', image: require('../../assets/kiwi.jpg') },
];

export default function VerMemes({ navigation }) {
  const { user, setUser, imageUri, setImageUri, idioma, setIdioma } =
    useContext(PantallasContext);

  const renderItem = ({ item, index }) => {
    if (item.id === 'dummy-id') {
      return <View style={styles.emptyItem} />;
    }
    return (
      <TouchableOpacity style={styles.photoContainer} onPress={handlePost}>
        <Image style={styles.photo} source={item.image} />
      </TouchableOpacity>
    );
  };

  const handleProfile = () => {
    navigation.navigate('User');
  };
  
  const handlePost = () => {
    navigation.navigate('Publicacion');
  };

  const onSubmit = () => {
    navigation.navigate('Home');
  };

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
        data={data}
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
