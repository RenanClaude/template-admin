import useAuth from "@/data/hook/useAuth";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import loadingAnimation from "../../../public/images/loadingAnimation.gif";

export default function ForceAuthentication(props: any) {
  const { user, loading } = useAuth();

  function renderContent() {
    return (
      <>
        <Head>

        </Head>
        {props.children}
      </>
    )
  }

  function renderLoading() {
    return (
      <div className={`flex justify-center items-center h-screen`}>
        <Image src={loadingAnimation} alt="carregando" />
      </div>
    )
  }

  if (!loading && user?.email) {
    return renderContent();
  } else if (loading) {
    return renderLoading();
  } else {
    Router.push("/autenticacao");
    return null;
  }
}