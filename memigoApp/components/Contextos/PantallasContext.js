import { createContext, useState } from 'react';
const PantallasContext = createContext();

export const PantallasProvider = ({ children }) => {

  //Usuario (Logeado)
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [id, setId] = useState(null);

  //Usuario (Otros Usuarios)
  const [otherUser, setOtherUser] = useState('');
  const [otherImageUri, setOtherImageUri] = useState(null);
  const [otherId, setOtherId] = useState(null);

  //Meme
  const [idMeme, setIdMeme] = useState(null);
  const [memeImg, setMemeImg] = useState(null);
  const [memeLikes, setMemeLikes] = useState(null);
  const [memeUri, setMemeUri] = useState(null);

  //Configuracion
  const [idioma, setIdioma] = useState('es');
  const [userType, setUserType] = useState(true);

  return (
    <PantallasContext.Provider value={{
      user, setUser, email, setEmail, password, setPassword,
      imageUri, setImageUri, idioma, setIdioma, memeUri, setMemeUri, id, setId, idMeme, setIdMeme,
      memeImg, setMemeImg, memeLikes, setMemeLikes, userType, setUserType, otherId, setOtherId,
      otherUser, setOtherUser, otherImageUri, setOtherImageUri
    }}>
      {children}
    </PantallasContext.Provider>
  )
}

export default PantallasContext;