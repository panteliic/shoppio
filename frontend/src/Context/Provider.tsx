import api from "@/api";
import { createContext, useContext, useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";

interface AppContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  accessTokenCookie: string | undefined;
  setAccessTokenCookie: (
    name: "accessToken",
    value: string,
    options?: any
  ) => void;
  removeAccessTokenCookie: (name: "accessToken", options?: any) => void;
  refreshTokenCookie: string | undefined;
  setRefreshTokenCookie: (
    name: "refreshToken",
    value: string,
    options?: any
  ) => void;
  removeRefreshTokenCookie: (name: "refreshToken", options?: any) => void;
}

interface User {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  address:string;
}

const Context = createContext<AppContextType | null>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const accessTokenCookie = cookies.accessToken;
  const refreshTokenCookie = cookies.refreshToken;
  useEffect(() => {
    async function authUser() {
      try {
        const response = await api.get('/user');
        const user :User= response.data
        setUser(user)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    authUser();
    
  }, [accessTokenCookie]);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        accessTokenCookie,
        setAccessTokenCookie: (name, value, options) =>
          setCookie(name, value, options),
        removeAccessTokenCookie: (name, options) => removeCookie(name, options),
        refreshTokenCookie,
        setRefreshTokenCookie: (name, value, options) =>
          setCookie(name, value, options),
        removeRefreshTokenCookie: (name, options) =>
          removeCookie(name, options),
      }}
    >
      <CookiesProvider>{children}</CookiesProvider>
    </Context.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useProvider must be used within a Provider");
  }
  return context;
};

export default Provider;
