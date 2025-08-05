import { createContext, useEffect, useState, type ReactNode } from "react";
import { signIn, signOut, useSession } from "../auth";

export type TypeUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

interface TypeContext {
  user: TypeUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<TypeContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  const [user, setUser] = useState<TypeUser | null>(() => {
    const storedUser = localStorage.getItem("auth-user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("auth-user");
  });

  // Update localStorage once session is available
  useEffect(() => {
    if (session.isPending) return;

    if (session.data?.user) {
      const newUser = session.data.user;

      const currentStored = localStorage.getItem("auth-user");
      const parsed = currentStored ? JSON.parse(currentStored) : null;

      // Only update if different
      if (JSON.stringify(parsed) !== JSON.stringify(newUser)) {
        localStorage.setItem("auth-user", JSON.stringify(newUser));
        setUser(newUser);
        setIsLoggedIn(true);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("auth-user");
    }
  }, [session]);

  const handleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5173/",
      newUserCallbackURL: "http://localhost:5173/welcome",
    });
  };

  const handleLogout = () => {
    signOut();
    localStorage.removeItem("auth-user");
  };

  const value: TypeContext = {
    user,
    isLoggedIn,
    isLoading: session.isPending,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
