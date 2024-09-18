import Layout from "@/components/template/Layout";
import useAppData from "@/data/hook/useAppData";

export default function Notifications() {
  const { switchTheme } = useAppData();

  return (
    <Layout title="Notificações" subtitle="Gerencie suas notificações!">
      <h3>Conteúdo!</h3>
      <button onClick={switchTheme}>Alterar tema</button>
    </Layout>
  );
}
