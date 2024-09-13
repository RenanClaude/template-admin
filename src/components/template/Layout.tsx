import Content from "./Content"
import SideMenu from "./SideMenu"
import Title from "./Title"

interface LayoutProps {
  title: string,
  subtitle: string,
  children?: any
}

export default function Layout(props: LayoutProps) {
  return (
    <div>
      <SideMenu />
      <Title title={props.title} subtitle={props.subtitle} />
      <Content>
        {props.children}
      </Content>
    </div>
  )
}