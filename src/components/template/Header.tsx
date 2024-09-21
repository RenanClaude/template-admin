import useAppData from "@/data/hook/useAppData";
import ThemeSwitchButton from "./ThemeSwitchButton";
import Title from "./Title";
import UserAvatar from "./UserAvatar";

interface HeaderProps {
  title: string,
  subtitle: string,
}

export default function Header(props: HeaderProps) {
  const { theme, switchTheme } = useAppData();

  return (
    <div className={`flex`}>

      <Title title={props.title} subtitle={props.subtitle} />

      <div className={`flex flex-grow justify-end items-center`}>
        <ThemeSwitchButton theme={theme} switchTheme={switchTheme} />
        <UserAvatar className="ml-5" />
      </div>

    </div>
  )
}