import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import type { Props } from "~/components/pages/Home";
import { Home as Component } from "~/components/pages/Home";
import { fetchSizeList } from "~/libs/server/fetchers/size";

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Breakpoint Simulator</title>
      </Head>
      <Component {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sizeList = await fetchSizeList();
  return {
    props: {
      sizeList,
    },
  };
};

export default Home;
