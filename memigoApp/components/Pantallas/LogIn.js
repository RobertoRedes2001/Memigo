import { useState, useContext } from 'react';
import { View, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import background from '../../assets/background.png';
import PantallasContext from '../Contextos/PantallasContext';

export default function LoginScreen({ navigation }) {
  const [icono, setIcono] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
    idioma,
    setIdioma,
  } = useContext(PantallasContext);

  const [showPassword, setShowPassword] = useState(false);

  const alertaEmailTitulo = idioma == 'es' ? 'Error de correo' : 'Email error';
  const alertaEmailCuerpo =
    idioma == 'es'
      ? 'Escriba su correo para entrar o compruebe que este bien escrito.'
      : 'Enter your email to log in or check that it is spelled correctly.';
  const alertaPasswordTitulo =
    idioma == 'es' ? 'Error de contraseña' : 'Password error';
  const alertaPasswordCuerpo =
    idioma == 'es'
      ? 'Escriba su contraseña para entrar o compruebe que este bien escrita.'
      : 'Enter your password to log in or check that it is spelled correctly.';

  const handleLogin = () => {
    if (checkValidEmail) {
      if (password == '') {
        Alert.alert(alertaPasswordTitulo, alertaPasswordCuerpo, [
          { text: 'OK' },
        ]);
      } else {
        onLogIn();
      }
    } else {
      Alert.alert(alertaEmailTitulo, alertaEmailCuerpo, [{ text: 'OK' }]);
    }
  };

  const onLogIn = () => {
    setEmail('');
    setPassword('');
    setIcono('');
    navigation.navigate('Home');
  };

  const onRegister = () => {
    setUser('');
    setEmail('');
    setPassword('');
    setIcono('');
    navigation.navigate('Log Up');
  };

  const handleCheckEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(true);
      setIcono('check');
    } else {
      setCheckValidEmail(false);
      setIcono('');
    }
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {idioma == 'es' ? '¡Bienvenido!' : 'Welcome!'}
        </Text>
        <TextInput
          label={idioma == 'es' ? 'Correo Electronico' : 'Email'}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => handleCheckEmail(text)}
          right={<TextInput.Icon icon={icono} />}
          underlineColor="red"
          theme={{ colors: { primary: 'red' } }}
          style={{ width: '100%', marginBottom: 20, paddingHorizontal: 10 }}
        />
        <TextInput
          label={idioma == 'es' ? 'Contraseña' : 'Password'}
          value={password}
          onChangeText={setPassword}
          style={{ width: '100%', marginBottom: 20, paddingHorizontal: 10 }}
          underlineColor="red"
          theme={{ colors: { primary: 'red' } }}
          right={
            <TextInput.Icon
              name={showPassword ? 'eye' : 'eye-off'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          secureTextEntry={!showPassword}
        />
        <Text
          onPress={onRegister}
          style={{
            paddingBottom: 10,
            fontSize: 15,
            textAlign: 'center',
            color: 'blue',
          }}>
          {idioma == 'es'
            ? '¿No tienes cuenta? \n ¡Registrate!'
            : "You don't have an account? \n Sign in!"}
        </Text>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={{ width: '60%', fontWeight: 'bold' }}
          color="white">
          {idioma == 'es' ? 'Iniciar Sesion' : 'Log In'}
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // añade padding horizontal
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    backgroundColor: 'white',
    paddingHorizontal: 20, // añade padding horizontal
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
