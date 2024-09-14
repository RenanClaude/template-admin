import Content from "./Content"
import Header from "./Header"
import SideMenu from "./SideMenu"

interface LayoutProps {
  title: string,
  subtitle: string,
  children?: any
}

export default function Layout(props: LayoutProps) {
  return (
    <div className={`flex h-screen w-screen`}>
      <SideMenu />
      <div className={`flex flex-col bg-gray-300 dark:bg-gray-800 w-full`}>
        <Header title={props.title} subtitle={props.subtitle} />
        <Content>
          {props.children}
        </Content>
      </div>
    </div>
  )
}