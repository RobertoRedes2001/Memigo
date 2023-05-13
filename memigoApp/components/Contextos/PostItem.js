import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export default function PostItem({ image, likes }) {
  
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image}/>
      <View style={styles.actions}>
        <IconButton
          icon={liked ? 'heart' : 'heart-outline'}
          color={liked ? 'red' : 'black'}
          size={30}
          onPress={() => setLiked(!liked)}
        />
        <Text style={styles.likes}>{likes} likes</Text>
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
    height: 300,
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
