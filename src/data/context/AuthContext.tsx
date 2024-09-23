import User from "@/model/User";
import Cookies from "js-cookie";
import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";

interface AuthContextProps {
  user?: User | null,
  loginGoogle?: () => Promise<void>,
  logout?: () => Promise<void>,

}

const AuthContext = createContext<AuthContextProps>({});

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
  const token = firebaseUser.getIdToken;
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    token,
    provider: firebaseUser.providerData[0]?.providerId,
    imageUrl: firebaseUser.photoURL
  }
}

function manageCookie(loggedIn: boolean) {
  if (loggedIn) {
    Cookies.set("admin-template-auth", loggedIn, { expires: 7 /*Em dias*/ })
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  async function configureSession(firebaseUser: any) {
    if (firebaseUser?.email) {
      const newUser = await normalizedUser(firebaseUser);
      setUser(newUser);
      manageCookie(true);
      setLoading(false);
      return newUser.email;
    } else {
      setUser(null)
      manageCookie(false);
      setLoading(false);
      return false
    }
  }

  async function loginGoogle() {
    try {
      const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      configureSession(resp.user);
      route.push("/");
      setLoading(true);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configureSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("admin-template-auth")) {
      const cancel = firebase.auth().onIdTokenChanged(configureSession);
      return () => cancel();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginGoogle, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;