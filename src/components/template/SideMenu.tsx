import { bellIcon, homeIcon, settingsIcon } from "../icons";
import MenuItem from "./MenuItem";

export default function SideMenu() {
  return (
    <aside>
      <ul>
        <MenuItem url="/" text="Início" icon={homeIcon} />
        <MenuItem url="/configuracoes" text="Ajustes" icon={settingsIcon} />
        <MenuItem url="/notificacoes" text="Notificações" icon={bellIcon} />

      </ul>
    </aside>
  )
}