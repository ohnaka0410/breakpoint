import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

/**
 * App Component
 */
const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
