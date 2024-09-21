import User from "@/model/User";
import route from "next/router";
import { createContext, useState } from "react";
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

export function AuthProvider(props: any) {
  const [user, setUser] = useState<User>();

  async function loginGoogle() {
    const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (resp.user?.email) {
      const newUser = await normalizedUser(resp.user);
      setUser(newUser);
      route.push("/");
    }
  }

  return (
    <AuthContext.Provider value={{ user, loginGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;