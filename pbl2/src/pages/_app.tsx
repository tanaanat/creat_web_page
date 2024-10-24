import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import {SessionProvider} from "@/provider/SessionProvider"
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}