import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';

const TextInputEmail = ({ idioma, mail, onInputChange, navigateTo, typeB }) => {

  const [email, setEmail] = useState(mail);
  const [icono, setIcono] = useState('');

  useEffect(() => {
    setEmail(mail);
    setIcono('');
  }, [navigateTo]);

  //Checa si el email del usuario esta bien escrito
  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      onInputChange(true, text);
      setIcono('check');
    } else {
      onInputChange(false, text);
      setIcono('');
    }
  };

  return (
    <TextInput
      label={idioma == 'es' ? 'Correo Electrónico' : 'Email'}
      keyboardType="email-address"
      value={email}
      onChangeText={(text) => handleCheckEmail(text)}
      right={<TextInput.Icon icon={icono} />}
      underlineColor="red"
      theme={{ colors: { primary: 'red' } }}
      style={{ width: ( typeB ? '100%' : '85%' ), marginBottom: 20, paddingHorizontal: 10 }}
    />
  );
};

export default TextInputEmail;
