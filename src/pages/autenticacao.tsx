import AuthInput from "@/components/auth/AuthInput";
import { useState } from "react";

export default function Authentication() {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");



  return (
    <div>
      <h1>Autenticação</h1>
      <AuthInput label="Email" value={value} type="email" changeValue={setValue} mandatory />
      <AuthInput label="Senha" value={password} type="password" changeValue={setPassword} mandatory />

    </div>
  )
}