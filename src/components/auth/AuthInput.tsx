interface AuthInputProps {
  label: string,
  value: any,
  mandatory?: boolean,
  doNotRender?: boolean,
  type?: "text" | "email" | "password"
  changeValue: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps) {
  return props.doNotRender ? null : (
    <div className={`flex flex-col`}>
      <label>{props.label}</label>
      <input type={props.type ?? "text"} value={props.value} onChange={e => props.changeValue(e.target.value)} required={props.mandatory} />
    </div>
  )
}