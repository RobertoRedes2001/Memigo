import { createContext, useState } from 'react';
const PantallasContext = createContext();

export const PantallasProvider = ({ children }) => {

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [memeUri, setMemeUri] = useState(null);
  const [ idioma, setIdioma ] = useState('es');
  const [ id, setId ] = useState(null);
  const [ idMeme, setIdMeme ] = useState(null);

  return (
    <PantallasContext.Provider value={{ user, setUser, email, setEmail, password, setPassword, 
    imageUri, setImageUri, idioma, setIdioma, memeUri, setMemeUri, id, setId }}>
      {children}
    </PantallasContext.Provider>
    )
}

export default PantallasContext;