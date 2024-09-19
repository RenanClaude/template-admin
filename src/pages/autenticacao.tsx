import AuthInput from "@/components/auth/AuthInput";
import { useState } from "react";

export default function Authentication() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");

  function toSubmit() {
    if (mode === "login") {
      console.log("login");
    } else {
      console.log("cadastro")
    }
  }

  return (
    <div className={`flex flex-col h-screen items-center justify-center`}>

      <div className={`w-1/2`}>

        <h1 className={`text-xl font-bold mb-5`}>
          {mode === "login" ? "Entre com a sua conta" : "Cadastre-se na plataforma"}
        </h1>

        <AuthInput label="Email" value={value} type="email" changeValue={setValue} mandatory />
        <AuthInput label="Senha" value={password} type="password" changeValue={setPassword} mandatory />

        <button onClick={toSubmit} className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6`}>
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className={`my-6 border-gray-300 w-full`} />

        <button onClick={toSubmit} className={`w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 `}>
          Entrar com o Google
        </button>

      </div>

    </div>
  )
}