import { createContext, useState } from 'react';
const PantallasContext = createContext();

export const PantallasProvider = ({ children }) => {

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('Carlos Santana');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [memeUri, setMemeUri] = useState(null);
  const [ idioma, setIdioma ] = useState('es');

  return (
    <PantallasContext.Provider value={{ user, setUser, email, setEmail, password, setPassword, 
    imageUri, setImageUri, idioma, setIdioma, memeUri, setMemeUri }}>
      {children}
    </PantallasContext.Provider>
    )
}

export default PantallasContext;