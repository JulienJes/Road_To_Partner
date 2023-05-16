import axios from "axios";
import { createContext, useState } from "react";

const AuthContext = createContext({
  userData: null,
  setUserData: () => {},
  jwt: null,
  setJwt: () => {},
  refreshAccessToken: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState(null);
  const baseUrl = process.env.REACT_APP_API_URL;

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/user/auth/refresh_token`, {}, { withCredentials: true });
      const newAccessToken = response.data.accessToken;
      setJwt(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token d'accès", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, jwt, setJwt, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
