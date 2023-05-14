import { useState, useContext } from 'react';
import { View, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import background from '../../assets/background.png';
import PantallasContext from '../Contextos/PantallasContext';
import Email from '../Componentes/TextInputEmail';
import Password from '../Componentes/TextInputPassword';

export default function LoginScreen({ navigation }) {

  const {
    email,
    setEmail,
    password,
    setPassword,
    idioma,
    setIdioma,
    user,
    setUser
  } = useContext(PantallasContext);

  const [showPassword, setShowPassword] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);

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
      console.log(email);
      Alert.alert(alertaEmailTitulo, alertaEmailCuerpo, [{ text: 'OK' }]);
    }
  };

  const onLogIn = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    navigation.navigate('Home');
  };

  const onRegister = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setUser('');
    navigation.navigate('Log Up');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {idioma == 'es' ? '¡Bienvenido!' : 'Welcome!'}
        </Text>
        <Email
          idioma={idioma}
          mail={email}
          onInputChange={(isValid, emailValue) => {
            setCheckValidEmail(isValid);
            setEmail(emailValue);
          }}
          navigateTo={navigation.isFocused()}
          typeB={true}
        />
        <Password
          idioma={idioma}
          pass={password}
          show={showPassword}
          onInputChange={(showP, text) => {
            setShowPassword(showP);
            setPassword(text);
          }}
          navigateTo={navigation.isFocused()}
          typeA={true}
          typeB={true}
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
