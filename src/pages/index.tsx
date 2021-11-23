import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import type { Props } from "~/components/pages/Home";
import { Home as Component } from "~/components/pages/Home";
import { fetchSizeList } from "~/libs/server/fetchers/size";

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Breakpoint</title>
        <meta property="description" content="Design Tool for Breakpoint" />
        <meta property="og:title" content="Breakpoint" />
        <meta property="og:description" content="Design Tool for Breakpoint" />
        <meta property="og:url" content="https://breakpoint.yuki0.dev" />
        <meta property="og:image" content="https://breakpoint.yuki0.dev/ogp.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:site" content="@yuki0410_" />
        <meta name="twitter:creator" content="@yuki0410_" />
        <meta name="twitter:card" content="summary_large_image" />
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
