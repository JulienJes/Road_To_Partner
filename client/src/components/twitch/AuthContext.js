import { createContext, useState } from "react";

const AuthContext = createContext({
  userData: null,
  setUserData: () => {},
  jwt: null,
  setJwt: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState(null);

  return (
    <AuthContext.Provider value={{ userData, setUserData, jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;