import { useState, useContext } from 'react';
import { View, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Checkbox, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import background from '../../assets/background.png';
import PantallasContext from '../Contextos/PantallasContext';

export default function LogUpScreen({ navigation }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    user,
    setUser,
    imageUri,
    setImageUri,
    idioma,
    setIdioma,
  } = useContext(PantallasContext);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [icono, setIcono] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSelected, setisSelected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const alertaEmailTitulo = idioma == 'es' ? 'Error de correo' : 'Email error';
  const alertaEmailCuerpo =
    idioma == 'es'
      ? 'Escriba su correo para registrarse o compruebe que este bien escrito.'
      : 'Enter your email to sign in or check that it is spelled correctly.';
  const alertaPasswordTitulo =
    idioma == 'es' ? 'Error de contraseña' : 'Password error';
  const alertaPasswordCuerpo =
    idioma == 'es'
      ? 'Escriba su contraseña para registrarse o compruebe que este bien escrita.'
      : 'Enter your password to sign in or check that it is spelled correctly.';
  const alertaConfirmPasswordCuerpo =
    idioma == 'es'
      ? 'Ambas contraseñas no coinciden, compruebe que ambas estan bien escritas.'
      : 'Both passwords do not match, check that both are correctly written.';
  const alertaUsernameTitulo =
    idioma == 'es' ? 'Error de nombre de usuario' : 'Username error';
  const alertaUsernameCuerpo =
    idioma == 'es'
      ? 'El campo de nombre de usuario esta vacio. Por favor no olvide llenarlo.'
      : "The username field is empty. Please don't forget to fill it out.";
  const registroTitulo =
    idioma == 'es' ? 'Registro Completado' : 'Registration Completed';
  const registroCuerpo =
    idioma == 'es'
      ? 'El registro se ha completado, bienvenido a MEMIGO.'
      : 'Registration is complete, welcome to MEMIGO.';

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = result.assets[0].base64;
      setImageUri(base64);
      setisSelected(true);
    }
  };

  const handleLogUp = () => {
    if (user === '') {
      Alert.alert(alertaUsernameTitulo, alertaUsernameCuerpo, [{ text: 'OK' }]);
    } else {
      if (password === '' && confirmPassword === '') {
        Alert.alert(alertaPasswordTitulo, alertaPasswordCuerpo, [
          { text: 'OK' },
        ]);
      } else {
        if (checkValidEmail) {
          if (password === confirmPassword) {
            onRegister();
          } else {
            Alert.alert(alertaPasswordTitulo, alertaConfirmPasswordCuerpo, [
              { text: 'OK' },
            ]);
          }
        } else {
          Alert.alert(alertaEmailTitulo, alertaEmailCuerpo, [{ text: 'OK' }]);
        }
      }
    }
  };

  const onRegister = () => {
    Alert.alert(registroTitulo, registroCuerpo, [{ text: 'OK' }]);
    setEmail('');
    setPassword('');
    navigation.navigate('Log In');
  };

  const onSubmit = () => {
    navigation.navigate('Log In');
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
      <View style={styles.header}>
        <View style={styles.welcome}>
          <IconButton
            icon={'arrow-left-bold-box-outline'}
            size={24}
            color={'white'}
            onPress={onSubmit}
          />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>
          {idioma == 'es' ? 'Nuevo usuario' : 'New user'}
        </Text>
        <TextInput
          label={idioma == 'es' ? 'Nombre de usuario' : 'Username'}
          value={user}
          onChangeText={(text) => setUser(text)}
          underlineColor="red"
          theme={{ colors: { primary: 'red' } }}
          style={{ width: '75%', marginBottom: 20 }}
        />
        <TextInput
          keyboardType="email-address"
          label={idioma == 'es' ? 'Correo electronico' : 'Email'}
          value={email}
          onChangeText={(text) => handleCheckEmail(text)}
          right={<TextInput.Icon icon={icono} />}
          underlineColor="red"
          theme={{ colors: { primary: 'red' } }}
          style={{ width: '75%', marginBottom: 20 }}
        />
        <TextInput
          label={idioma == 'es' ? 'Contraseña' : 'Password'}
          value={password}
          onChangeText={setPassword}
          style={{ width: '75%', marginBottom: 20, paddingHorizontal: 10 }}
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
        <TextInput
          label={idioma == 'es' ? 'Confirmar Contraseña' : 'Confirm Password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ width: '75%', marginBottom: 20, paddingHorizontal: 10 }}
          underlineColor="red"
          theme={{ colors: { primary: 'red' } }}
          right={
            <TextInput.Icon
              name={showConfirmPassword ? 'eye' : 'eye-off'}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
          secureTextEntry={!showConfirmPassword}
        />
        <Button
          mode="contained"
          onPress={pickImage}
          style={{ width: '75%' }}
          color={isSelected ? 'blue' : 'black'}>
          {idioma == 'es' ? 'Seleccionar imagen' : 'Pick an image'}
        </Button>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
          />
          <Text style={styles.checkboxText}>
            {idioma == 'es'
              ? 'He leido los terminos y condiciones'
              : 'I have read the terms and conditions'}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={handleLogUp}
          style={{ width: '50%' }}
          color="white"
          disabled={!isChecked}>
          {idioma == 'es' ? 'Registrarse' : 'Sign In'}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'blue',
  },
  welcome: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  header: {
    height: 80,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
