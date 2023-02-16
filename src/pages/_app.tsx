import "../styles/global.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  User,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

type AuthContextValue = {
  user: User | null;
  error: string;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

const getAuthContextValue = (): AuthContextValue => {
  // eslint-disable-next-line
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const signup = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(response.user);
    } catch (e) {}
  };

  const signin = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
    } catch (e) {}
  };

  const signout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {}
  };

  return {
    user,
    error,
    signup,
    signin,
    signout,
  };
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext.Provider value={getAuthContextValue()}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
