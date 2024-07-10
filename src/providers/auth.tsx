import { createContext, useCallback, useEffect, useState } from "react";

export interface AuthContextProps {
  isAuthenticated: boolean;
  authenticate: (username: string) => Promise<void>;
  clear: () => Promise<void>;
}
const key = "tudu.auth.user";

function getStoredUser() {
  return localStorage.getItem(key);
}

function toggleStoredUser(user: string | null) {
  if (user) localStorage.setItem(key, user);
  else localStorage.removeItem(key);
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(getStoredUser());
  const isAuthenticated = !!user;

  const clear = useCallback(async () => {
    toggleStoredUser(null);
    setUser(null);
  }, []);

  const authenticate = useCallback(async (username: string) => {
    toggleStoredUser(username);
    setUser(username);
  }, []);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        clear,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
