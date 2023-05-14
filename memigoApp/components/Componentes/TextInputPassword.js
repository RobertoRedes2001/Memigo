import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';

const TextInputPassword = ({ idioma, pass, show, onInputChange, navigateTo, typeA, typeB }) => {

  useEffect(() => {
    if (!navigateTo) {
      onInputChange(false, pass);
    }
  }, [navigateTo]);

  return (
    <TextInput
      label={idioma == 'es' ? (typeA ? 'Contraseña' : 'Confirmar contraseña') : (typeA ? 'Password' : 'Confirm password')}
      value={pass}
      onChangeText={(text) => onInputChange(show, text)}
      style={{ width: (typeB ? '100%' : '85%' ), marginBottom: 20, paddingHorizontal: 10 }}
      underlineColor="red"
      theme={{ colors: { primary: 'red' } }}
      right={
        <TextInput.Icon
          name={show ? 'eye' : 'eye-off'}
          onPress={() => onInputChange(!show, pass)}
        />
      }
      secureTextEntry={!show}
    />
  );
};

export default TextInputPassword;
