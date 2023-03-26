import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Footer from "@divops/component-footer";
import Head from "next/head";
import "styles/index.css";
import { Container, Spacing } from "components/ui";
import { MainNav } from "components/MainNav";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Getting Things Done</title>
      </Head>
      <Container width={1200}>
        <Spacing size={10} />
        <MainNav />
        <Component {...pageProps} />
        <Footer />
      </Container>
    </QueryClientProvider>
  );
}
