import User from "@/model/User";
import Cookies from "js-cookie";
import route from "next/router";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";

interface AuthContextProps {
  user?: User | null,
  loading?: boolean,
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
    /*Cookies.set(): Este método da biblioteca js-cookie é usado para criar (ou atualizar) um cookie no navegador.
Parâmetros:
"admin-template-auth": Nome do cookie. Esse nome é usado para identificar o cookie que será armazenado no navegador.
loggedIn: O valor a ser armazenado no cookie. Neste caso, o valor será true, já que loggedIn é verdadeiro quando o usuário está logado.
{ expires: 7 }: Define a duração do cookie, que neste caso expira em 7 dias. Isso significa que, se o usuário fechar o navegador ou desligar o computador, o cookie continuará válido por 7 dias, permitindo que o estado de autenticação seja mantido.*/
  } else {
    Cookies.remove("admin-template-auth");
    /*Cookies.remove(): Esse método da biblioteca js-cookie é usado para remover um cookie do navegador.
Parâmetro:
"admin-template-auth": O nome do cookie que será removido. Ao chamar essa função, o cookie de autenticação "admin-template-auth" é apagado do navegador, indicando que o usuário não está mais logado.*/
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
    if (Cookies.get("admin-template-auth")) { /*Verifica se o cookie "admin-template-auth" existe.Esse cookie é utilizado para identificar se o usuário já está autenticado. Se o cookie estiver presente, significa que o usuário provavelmente já fez login anteriormente, então o app pode tentar revalidar a sessão.
      Cookies.get("admin-template-auth"): Usando a biblioteca js-cookie, ele tenta obter o valor do cookie. Se o cookie existir, o código dentro desse bloco if será executado; caso contrário, será ignorado.*/
      const cancel = firebase.auth().onIdTokenChanged(configureSession);
      /*firebase.auth().onIdTokenChanged(): Este método do Firebase é usado para observar mudanças no token de autenticação do usuário (como quando um token expira e é renovado ou quando o usuário faz login/deslog).
      configureSession: É uma função definida anteriormente no código, que configura ou limpa a sessão com base no estado de autenticação do usuário. Se o usuário estiver autenticado, ela define o estado do usuário e gerencia os cookies.
      Retorno de onIdTokenChanged: O método retorna uma função (armazenada em cancel), que pode ser chamada para parar de observar as mudanças no token. Isso é importante para limpar o efeito colateral quando o componente for desmontado.*/
      return () => cancel();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginGoogle, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;