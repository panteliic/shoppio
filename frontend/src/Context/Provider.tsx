import { createContext, useContext, useState } from "react";

interface AppContextType {
    user: string,
    setUser: any,

}

const Context = createContext<AppContextType | null>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string>("idegas")
  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
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
