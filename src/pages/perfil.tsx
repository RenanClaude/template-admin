import Layout from "@/components/template/Layout";
import useAppData from "@/data/hook/useAppData";

export default function Profile() {
  const { switchTheme } = useAppData();

  return (
    <Layout title="Perfil" subtitle="Administre suas informações de usuário!">
      <h1>Seu Perfil</h1>
    </Layout>
  );
}
