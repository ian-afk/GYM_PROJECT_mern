import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('Cities Context was used outside the CitiesProvider');
  return context;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(token, isLoggedIn);
  return (
    <AuthContext.Provider
      value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
