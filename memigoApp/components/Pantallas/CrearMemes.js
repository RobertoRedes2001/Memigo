import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import background from '../../assets/background.png';
import PantallasContext from '../Contextos/PantallasContext';
import CS from '../../assets/comingsoon.png';

export default function Home({ navigation }) {
  const { imageUri, setImageUri, idioma, setIdioma } =
    useContext(PantallasContext);

  const handleProfile = () => {
    navigation.navigate('User');
  };

  const onSubmit = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.header}>
        <IconButton
          icon={'arrow-left-bold-box-outline'}
          size={24}
          color={'white'}
          onPress={onSubmit}
        />
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
      <Image
        source={CS}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Text style={styles.title}>
          {idioma == 'es'
            ? '¡Esta funcionalidad estara disponible proximamente!'
            : 'Coming soon...!'}
        </Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  image: {
    flex: 1,
    width: '100%',
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
