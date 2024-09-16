import { bellIcon, homeIcon, logoutIcon, settingsIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function SideMenu() {
  return (
    <aside className={`flex flex-col dark:bg-gray-900`}>
      <div className={`h-20 w-20
        bg-gradient-to-r from-indigo-500 to-purple-800
        flex flex-col items-center justify-center`}
      >
        <Logo />
      </div>
      <ul className={`flex-grow`}>
        <MenuItem url="/" text="Início" icon={homeIcon} />
        <MenuItem url="/ajustes" text="Ajustes" icon={settingsIcon} />
        <MenuItem url="/notificacoes" text="Notificações" icon={bellIcon} />
      </ul>
      <ul>
        <MenuItem 
        url="/notificacoes" 
        text="Logout" 
        icon={logoutIcon} 
        onClick={() => console.log("Logout clicado")}
        className="text-red-600 dark:text-red-400 hover:bg-red-400 dark:hover:text-gray-900 hover:text-white transition ease-in-out duration-500" />
      </ul>
    </aside>
  )
}