import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "~/components/blocks/GoogleAnalytics";
import { usePageView } from "~/hooks/gtag";

/**
 * App Component
 */
const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  usePageView();

  return (
    <>
      <GoogleAnalytics />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
