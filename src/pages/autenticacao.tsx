import AuthInput from "@/components/auth/AuthInput";
import { warningIcon } from "@/components/icons";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react";

export default function Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);

  const { registerUser, loginWithEmailAndPassword, loginGoogle } = useAuth();

  function showError(msg: string, time = 10) {
    setError(msg);
    setTimeout(() => setError(null), time * 1000);
  }

  async function toSubmit() {
    try {
      if (mode === "login") {
        await loginWithEmailAndPassword(email, password);
      } else {
        await registerUser(email, password);
      }
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      showError(message)
    }
  }

  return (
    <div className={`flex h-screen items-center justify-center`}>

      <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
        <img src="https://picsum.photos/1000" alt="Imagem da página de autenticação"
          className={`h-screen w-full object-cover`} />
      </div>

      <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>

        <h1 className={`text-3xl font-bold mb-5`}>
          {mode === "login" ? "Entre com a sua conta" : "Cadastre-se na Plataforma"}
        </h1>

        {error ? (
          <div className={`flex items-center bg-red-400 text-white px-5 py-3 my-2 border border-red-700 rounded-lg`}>
            {warningIcon()}
            <span className="ml-3">{error}</span>
          </div>
        ) : false}

        <AuthInput label="Email" value={email} type="email" changeValue={setEmail} mandatory />
        <AuthInput label="Senha" value={password} type="password" changeValue={setPassword} mandatory />

        <button onClick={toSubmit} className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6`}>
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className={`my-6 border-gray-300 w-full`} />

        <button onClick={loginGoogle} className={`w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 `}>
          Entrar com o Google
        </button>

        {mode === "login" ? (
          <p className="mt-8">
            Não tem uma conta?
            <a onClick={() => setMode("register")} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}> Cadastre-se</a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a onClick={() => setMode("login")} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}> Entre aqui</a>
          </p>
        )}

      </div>

    </div>
  )
}