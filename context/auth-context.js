import { createContext,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token = '') => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const authenticate = (token) => {
    setAuthToken(token)
    AsyncStorage.setItem('token', token);
    return token;
  };

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  };

  return <AuthContext.Provider value={{
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  }} >{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
