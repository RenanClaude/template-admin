import { bellIcon, homeIcon, settingsIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function SideMenu() {
  return (
    <aside>
      <div className={`h-20 w-20
        bg-gradient-to-r from-indigo-500 to-purple-800
        flex flex-col items-center justify-center`}
      >
        <Logo />
      </div>
      <ul>
        <MenuItem url="/" text="Início" icon={homeIcon} />
        <MenuItem url="/ajustes" text="Ajustes" icon={settingsIcon} />
        <MenuItem url="/notificacoes" text="Notificações" icon={bellIcon} />
      </ul>
    </aside>
  )
}