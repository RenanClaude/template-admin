import User from "@/model/User";
import Cookies from "js-cookie";
import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";

interface AuthContextProps {
  user?: User,
  loginGoogle?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({});

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
  const token = await firebaseUser.getIdToken;
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
    Cookies.set("admin-template-auth", loggedIn, { expires: 7 })
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  async function configureSession(firebaseUser) {
    if (firebaseUser.email) {
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
    const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    configureSession(resp.user);
    route.push("/");
  }

  useEffect(() => {
    const cancel = firebase.auth().onIdTokenChanged(configureSession);
    return () => cancel();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;