import useAppData from "@/data/hook/useAppData";
import Content from "./Content";
import Header from "./Header";
import SideMenu from "./SideMenu";

interface LayoutProps {
  title: string,
  subtitle: string,
  children?: any
}

export default function Layout(props: LayoutProps) {
  const { theme, switchTheme } = useAppData();


  return (
    <div className={`${theme} flex h-screen w-screen`}>
      <SideMenu />
      <div className={`flex flex-col bg-gray-300 dark:bg-gray-800 w-full p-7`}>
        <Header title={props.title} subtitle={props.subtitle} />
        <Content>
          {props.children}
        </Content>
      </div>
    </div>
  )
}